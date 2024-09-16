import { component$ } from '@builder.io/qwik';
import { useTranslator } from '~/utils/i18n';
import weightingOptions from '~/utils/weightingOptions';
import Modal from '~/components/ui/Modal';
import QRCode from '~/components/ui/QRCode';
import ContentDoc from '~/components/ui/ContentDoc';
import { ProcessTimeLabel } from '~/components/datetime/ProcessTimeLabel';
import type { IProcess } from '~/types';

interface ProcessInfoProps {
  process: IProcess;
  url: string;
}

export default component$((props: ProcessInfoProps) => {
  const translator = useTranslator();
  const { process, url } = props;

  const weightLabel = process.weighting ? weightingOptions[process.weighting] : null;
  const timezone = process.timezone ? process.timezone : 'UTC';
  const proposalsLength = process.proposals ? Object.values(process.proposals).length : 0;

  return (
    <div class="flex flex-col pb-3">
      <h1>{process.title}</h1>
      <div class="topic-description">{process.description}</div>
      <div class="flex justify-end items-center">
        {translator.t('process.weighting')}&nbsp;
        {weightLabel}&nbsp;
        <Modal id="weightingInfo">
          <h3>{translator.t('process.weighting')}</h3>
          <ContentDoc fileName="NegativeScoreWeighting"/>
        </Modal>
      </div>
      <div>
        {process.proposalDates && process.proposalDates[0] > 0 && (
          <ProcessTimeLabel timezone={timezone} phase="proposal" dates={process.proposalDates}/>
        )}
        <br/>
        {process.votingDates && (
          <ProcessTimeLabel timezone={timezone} phase="voting" dates={process.votingDates} proposals_length={proposalsLength}/>
        )}
        <br/>
      </div>
      <div class="w-full pr-2">
        <p>{translator.t('process.shareableUrl')}</p>
        <div class="flex items-center">
          <input 
            id="shareableUrl" 
            type="text" 
            class="input w-full" 
            readOnly 
            value={url}
          />
          &nbsp; &nbsp;
          <Modal id="shareableQrCode" icon="info">
            <h3>{translator.t('process.qrcode')}</h3>
            <div class="flex justify-center">
              <QRCode text={url} />
            </div>
            <br/>
          </Modal>
        </div>
      </div>
    </div>
  );
});