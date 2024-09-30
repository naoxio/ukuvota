import { component$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import weightingOptions from '~/utils/weightingOptions';
import Modal from '~/components/modal/modal';
import QRCode from '~/components/ui/QRCode';
import { ProcessTimeLabel } from '~/components/date-time/process-time-label';
import type { IProcess } from '~/types';

interface ProcessInfoProps {
  process: IProcess;
  url: string;
}

export default component$((props: ProcessInfoProps) => {
  const { t } =useTranslator();
  const { process, url } = props;

  const weightLabel = process.weighting ? weightingOptions[process.weighting] : null;
  const timezone = process.timezone ? process.timezone : 'UTC';
  const proposalsLength = Object.values(process.proposals).length;

  return (
    <div class="flex flex-col pb-3">
      <h1>{process.title}</h1>
      <div class="topic-description">{process.description}</div>
      <div class="flex justify-end items-center">
        {t('process.weighting')}&nbsp;
        {weightLabel}&nbsp;
        <Modal id="weightingInfo">
          <h3>{t('process.weighting')}</h3>
          <div>{t('negativeScoreWeighting')}</div>+
        </Modal>
      </div>
      <div>
        {process.proposalDates[0] > 0 && (
          <ProcessTimeLabel timezone={timezone} mode="proposal" dates={process.proposalDates}/>
        )}
        <br/>
        <ProcessTimeLabel timezone={timezone} mode="voting" dates={process.votingDates} proposals_length={proposalsLength}/>
        <br/>
      </div>
      <div class="w-full pr-2">
        <p>{t('process.shareableUrl')}</p>
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
            <h3>{t('process.qrcode')}</h3>
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