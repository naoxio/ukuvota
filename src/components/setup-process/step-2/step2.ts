
import { sliderToDuration, durationToSlider } from '~/utils/logslider';
import { formatDuration, formatDateInTimezone } from '~/utils/dateUtils';
import IProposal from '~/interfaces/IProposal';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { adjustVotingPhaseDates } from '~/utils/dateAdjustments';
import localforage from 'localforage';
import { isProposalEmpty } from '~/utils/proposalUtils';

const storedTimeZone = await localforage.getItem('userTimezone') || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

class Step2 extends HTMLElement {
  phase = this.dataset.phase || '';
  timezone = storedTimeZone as string;
  
  constructor() {
    super();
    this.initialize();
  }

  initialize() {
    this.initializeTimeSelectors();
    this.setupEventListeners();
    this.initializeTimezoneSelector();
    this.updateMessagesAndButton();
  }

  initializeTimezoneSelector() {
    const timezoneSelect = this.querySelector('#timezone-select') as HTMLSelectElement;
    if (timezoneSelect) {
      timezoneSelect.value = this.timezone;
      timezoneSelect.addEventListener('change', async () => {
        this.timezone = timezoneSelect.value;
        await localforage.setItem('userTimezone', this.timezone);
        this.updateTimeSelectors();
      });
    }
  }

  updateTimeSelectors() {
    const timeSelectors = this.querySelectorAll('.time-selector') as NodeListOf<Element>;
    timeSelectors.forEach(selector => {
      const phaseMode = selector.getAttribute('data-phase');
      const startPicker = selector.querySelector(`#start-date-picker-${phaseMode} input[type="datetime-local"]`) as HTMLInputElement;
      const endPicker = selector.querySelector(`#end-date-picker-${phaseMode} input[type="datetime-local"]`) as HTMLInputElement;
      const durationSlider = selector.querySelector(`#datetime-slider-${phaseMode} input[type="range"]`) as HTMLInputElement;
      const durationDisplay = selector.querySelector(`#datetime-slider-${phaseMode} .duration-display`) as HTMLElement;

      if (startPicker && endPicker) {
        const startDate = utcToZonedTime(new Date(startPicker.value), this.timezone);
        const endDate = utcToZonedTime(new Date(endPicker.value), this.timezone);

        startPicker.value = formatDateInTimezone(startDate.getTime(), this.timezone);
        endPicker.value = formatDateInTimezone(endDate.getTime(), this.timezone);

        if (durationSlider && durationDisplay) {
          const duration = (endDate.getTime() - startDate.getTime()) / 1000;
          const sliderValue = durationToSlider(duration / 60);
          if (sliderValue) durationSlider.value = sliderValue.toString();
          durationDisplay.textContent = formatDuration(duration);
        }
      }
    });
  }

  setupEventListeners() {
    const backButton = this.querySelector('#backButton');
    const continueButton = this.querySelector('#continueButton');

    if (backButton) {
      backButton.addEventListener('click', (event) => this.handleBackButtonClick(event));
    }

    if (continueButton) {
      continueButton.addEventListener('click', (event) => this.handleContinueButtonClick(event));
    }

    const timeSelectors = this.querySelectorAll('.time-selector') as NodeListOf<Element>;
    timeSelectors.forEach(selector => {
      const inputs = selector.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('change', () => this.updateMessagesAndButton());
      });
    });

    const proposalsList = this.querySelector('proposals-list');
    if (proposalsList) {
      proposalsList.addEventListener('proposalsUpdated', () => this.updateMessagesAndButton());
    }
    const proposalsContainer = this.querySelector('#proposals-container');
    if (proposalsContainer) {
      const observer = new MutationObserver(() => this.updateMessagesAndButton());
      observer.observe(proposalsContainer, { childList: true, subtree: true });
  
      // Add listeners for title input changes
      proposalsContainer.addEventListener('input', (event) => {
        if (event.target instanceof HTMLInputElement && event.target.type === 'text') {
          this.updateMessagesAndButton();
        }
      });
    }
  }
  

  handleBackButtonClick(event: Event) {
    const formData = new FormData();
    formData.append('step', '1');
    this.submitFormData('/api/update-step', formData);
  }
  handleContinueButtonClick(event: Event) {
    if ((event.target as HTMLButtonElement).classList.contains('disabled')) {
      return;
    }

    const formData = new FormData();
    formData.append('step', '2');

    if (this.phase === 'full') {
      this.appendInputValueToFormData(formData, 'start-date-picker-proposal');
      this.appendInputValueToFormData(formData, 'end-date-picker-proposal');
      this.appendInputValueToFormData(formData, 'start-date-picker-voting');
      this.appendInputValueToFormData(formData, 'end-date-picker-voting');
      this.appendProposalsToFormData(formData);
    } else if (this.phase === 'voting') {
      this.appendInputValueToFormData(formData, 'start-date-picker-voting');
      this.appendInputValueToFormData(formData, 'end-date-picker-voting');
    }

    formData.append('timezone', this.timezone);
    this.submitFormData('/api/process-store', formData);
  }

  appendInputValueToFormData(formData: FormData, containerId: string) {
    const inputElement = this.querySelector(`#${containerId} input`) as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const date = new Date(inputElement.value);
      const utcTimestamp = zonedTimeToUtc(date, this.timezone).getTime();
      formData.append(containerId, utcTimestamp.toString());
    }
  }

  appendProposalsToFormData(formData: FormData) {
    const proposals: IProposal[] = [];
    const proposalElements = this.querySelectorAll('.proposal .flex');
    
    proposalElements.forEach((proposalElement: Element) => {
      const id = proposalElement.id;
      const titleInput = proposalElement.querySelector('input[type="text"]') as HTMLInputElement;
      const descriptionDiv = proposalElement.querySelector('div[id^="description-"]') as HTMLElement;
      
      if (id && titleInput) {
        proposals.push({
          id,
          title: titleInput.value
        });

        if (descriptionDiv) {
          const descriptionId = `description_${id}`;
          localforage.setItem(descriptionId, descriptionDiv.innerText);
        }
      }
    });

    formData.append('proposals', JSON.stringify(proposals));
  }

  submitFormData(url: string, formData: any) {
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          response.text().then((errorMessage) => {
            const errorElement = this.querySelector('#errorMessage') as HTMLElement;
            errorElement.classList.remove('hidden');
          });
        }
      })
      .catch((error) => {
        console.error('Error sending request', error);
      });
  }
  updateMessagesAndButton() {
    const continueButton = this.querySelector('#continueButton') as HTMLButtonElement;
    const proposalElements = this.querySelectorAll('.proposal');
    const allTimeSelectorsValid = this.checkTimeSelectors();
    const errorElement = this.querySelector('#errorMessage') as HTMLElement;
    const errorMinProposals = this.querySelector('#errorMinProposals') as HTMLElement;
    const errorNotEnoughValidProposals = this.querySelector('#errorNotEnoughValidProposals') as HTMLElement;
    const errorSelectTime = this.querySelector('#errorSelectTime') as HTMLElement;
  
    errorElement.classList.add('hidden');
    errorMinProposals.classList.add('hidden');
    errorNotEnoughValidProposals.classList.add('hidden');
    errorSelectTime.classList.add('hidden');
  
    if (this.phase === 'voting') {
      const totalProposalsCount = proposalElements.length;
      console.log('Total proposals:', totalProposalsCount);
      const validProposals = Array.from(proposalElements).filter(proposalElement => {
        const titleInput = proposalElement.querySelector('input[type="text"]') as HTMLInputElement;
        const descriptionDiv = proposalElement.querySelector('div[id^="description-"]') as HTMLElement;
        const proposal: IProposal = {
          title: titleInput ? titleInput.value : '',
          description: descriptionDiv ? descriptionDiv.innerText : '',
          id: ''
        };
        const isEmpty = isProposalEmpty(proposal);
        console.log('Proposal:', proposal, 'Is Empty:', isEmpty);
        return !isEmpty;
      });
      const validProposalsCount = validProposals.length;
      console.log('Valid proposals:', validProposalsCount);
  
      if (allTimeSelectorsValid && validProposalsCount >= 2) {
        continueButton.classList.remove('disabled');
      } else {
        continueButton.classList.add('disabled');
        errorElement.classList.remove('hidden');
        if (!allTimeSelectorsValid) {
          errorSelectTime.classList.remove('hidden');
        } else if (totalProposalsCount < 2) {
          errorMinProposals.classList.remove('hidden');
          console.log('helolooo')
        } else if (validProposalsCount < 2) {
          errorNotEnoughValidProposals.classList.remove('hidden');
        }
      }
    } else if (this.phase === 'full') {
      if (allTimeSelectorsValid) {
        continueButton.classList.remove('disabled');
      } else {
        continueButton.classList.add('disabled');
        errorElement.classList.remove('hidden');
        errorSelectTime.classList.remove('hidden');
      }
    }
  }

  checkTimeSelectors() {
    const timeSelectors = this.querySelectorAll('.time-selector') as NodeListOf<Element>;
    return Array.from(timeSelectors).every(selector => {
      const phaseMode = selector.getAttribute('data-phase');
      const startPicker = selector.querySelector(`#start-date-picker-${phaseMode} input[type="datetime-local"]`) as HTMLInputElement;
      const endPicker = selector.querySelector(`#end-date-picker-${phaseMode} input[type="datetime-local"]`) as HTMLInputElement;
      return startPicker && endPicker && startPicker.value && endPicker.value;
    });
  }

  initializeTimeSelectors() {
    const timeSelectors = this.querySelectorAll('.time-selector') as NodeListOf<Element>;
    timeSelectors.forEach(selector => {
      const phaseMode = selector.getAttribute('data-phase');
      const startPicker = selector.querySelector(`#start-date-picker-${phaseMode} input[type="datetime-local"]`) as HTMLInputElement;
      const endPicker = selector.querySelector(`#end-date-picker-${phaseMode} input[type="datetime-local"]`) as HTMLInputElement;
      const durationSlider = selector.querySelector(`#datetime-slider-${phaseMode} input[type="range"]`) as HTMLInputElement;
      const durationDisplay = selector.querySelector(`#datetime-slider-${phaseMode} .duration-display`) as HTMLElement;
      const affectVotingStart = (this.phase === 'full' && phaseMode === 'proposal');

      this.initDatetimePickers(durationSlider, startPicker, endPicker, durationDisplay, affectVotingStart);
      this.initDurationSlider(durationSlider, startPicker, endPicker, durationDisplay, affectVotingStart);
    });
  }

  initDatetimePickers(durationSlider: HTMLInputElement, startPicker: HTMLInputElement, endPicker: HTMLInputElement, durationDisplay: HTMLElement, affectVotingStart: boolean) {
    if (startPicker && endPicker) {
      let originalStartDate = utcToZonedTime(new Date(startPicker.value), this.timezone);
      let originalEndDate = utcToZonedTime(new Date(endPicker.value), this.timezone);
      let originalDuration = originalEndDate.getTime() - originalStartDate.getTime();

      startPicker.addEventListener('change', (event: any) => {
        const newStartDate = utcToZonedTime(new Date(event.target.value), this.timezone);
        if (isNaN(newStartDate.getTime())) return;

        let newEndDate = utcToZonedTime(new Date(newStartDate.getTime() + originalDuration), this.timezone);
        if (newEndDate.getTime() - newStartDate.getTime() < 60000) {
          newEndDate = utcToZonedTime(new Date(newStartDate.getTime() + 60000), this.timezone);
        }
        endPicker.value = formatDateInTimezone(newEndDate.getTime(), this.timezone);
        endPicker.min = formatDateInTimezone(utcToZonedTime(new Date(newStartDate.getTime() + 60000), this.timezone).getTime(), this.timezone);
        this.updateMessagesAndButton();
      });

      endPicker.addEventListener('change', (event: any) => {
        let newEndDate = utcToZonedTime(new Date(event.target.value), this.timezone);
        if (isNaN(newEndDate.getTime())) return;
        if (affectVotingStart) adjustVotingPhaseDates(originalEndDate, newEndDate, this, this.timezone);
        originalEndDate = newEndDate;
        originalDuration = originalEndDate.getTime() - originalStartDate.getTime();
        originalStartDate = utcToZonedTime(new Date(startPicker.value), this.timezone);
        this.updateDurationSlider(durationSlider, startPicker, endPicker, durationDisplay);
        this.updateMessagesAndButton();
      });
    }
  }

  initDurationSlider(durationSlider: HTMLInputElement, startPicker: HTMLInputElement, endPicker: HTMLInputElement, durationDisplay: HTMLElement, affectVotingStart: boolean) {
    if (durationSlider) {
      let originalEndDate = utcToZonedTime(new Date(endPicker.value), this.timezone);

      durationSlider.addEventListener('input', (event: Event) => {
        const sliderValue = parseInt((event.target as HTMLInputElement).value, 10);
        const newDuration = sliderToDuration(sliderValue) * 60 * 1000;
        const newEndDate = utcToZonedTime(new Date(utcToZonedTime(new Date(startPicker.value), this.timezone).getTime() + newDuration), this.timezone);
        if (affectVotingStart) adjustVotingPhaseDates(originalEndDate, newEndDate, this, this.timezone);
        originalEndDate = newEndDate;

        endPicker.value = formatDateInTimezone(newEndDate.getTime(), this.timezone);
        durationDisplay.textContent = formatDuration(newDuration / 1000);
      });
      durationDisplay.textContent = formatDuration(sliderToDuration(parseInt(durationSlider.value, 10)) * 60);
    }
  }

  updateDurationSlider(durationSlider: HTMLInputElement, startPicker: HTMLInputElement, endPicker: HTMLInputElement, durationDisplay: HTMLElement) {
    if (durationSlider && startPicker && endPicker) {
      const newDuration = (utcToZonedTime(new Date(endPicker.value), this.timezone).getTime() - utcToZonedTime(new Date(startPicker.value), this.timezone).getTime()) / 1000;
      const sliderValue = durationToSlider(newDuration / 60);
      if (sliderValue) durationSlider.value = sliderValue.toString();
      durationDisplay.textContent = formatDuration(newDuration);
    }
  }
}

customElements.define('step-2', Step2);