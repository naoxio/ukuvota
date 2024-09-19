import { component$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { LuMail } from '@qwikest/icons/lucide';
import { SiTelegram, SiX } from '@qwikest/icons/simpleicons';
import { Link } from '@builder.io/qwik-city';


import './footer.css';


export default component$(() => {
  const { t } = useTranslator();

  return (
    <footer class="flex flex-col justify-center items-center gap-4">
      <div class="flex">
        <span>
          <a class="link link-primary" href="https://naox.io">
            NaoX
          </a>
          <span> © {new Date().getFullYear()}</span>
        </span>
        <span>&nbsp;-&nbsp;</span>
        <span>
          <Link class="link link-primary" href="/privacy-policy">
            {t('policy')}
          </Link>
        </span>
      </div>
      <div class="flex gap-4">
        <a href="mailto:ukuvota@naox.io" aria-label="Email" title="Email">
          <LuMail class="icon-email" width={24} height={24} />
        </a>
        <a href="https://t.me/ukuvota" aria-label="Telegram" title="Telegram">
          <SiTelegram class="icon-telegram" width={24} height={24} />
        </a>
        <a href="https://x.com/ukuvota" aria-label="X" title="X">
          <SiX class="icon-x" width={24} height={24} />
        </a>
      </div>
    </footer>
  );
});