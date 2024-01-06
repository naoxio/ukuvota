import { t } from 'astro-i18n';
import { styleTag, durationDisplay, initialSliderValue } from './DatetimeSliderNoJS.astro';

<Fragment>
<form id={id} action="/api/date-change" method="POST">
{ }
<div>{t('setup.duration')}:&nbsp;
<span class="duration-display" class="text-success">{durationDisplay}</span>
</div>
<br />
<div class="flex justify-between items-center ">
<input type="range" min="1" max="165" class="range" name={id} value={initialSliderValue} />
<button class="btn btn-secondary ml-4" type="submit">{t('setup.setDuration')}</button>
</div>

</form>
</Fragment>;
