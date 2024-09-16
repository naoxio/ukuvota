import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useTranslator } from '~/i18n/translator';
import { useNavigate } from '@builder.io/qwik-city';
import BaseLayout from '~/components/BaseLayout';

export default component$(() => {
  const { t } = useTranslator();
  const nav = useNavigate();

  const store = useStore({
    allProcesses: [],
    modalOpen: false
  });

  useVisibleTask$(() => {
    const processesCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('processes='));
    if (processesCookie) {
      store.allProcesses = JSON.parse(processesCookie.split('=')[1]);
    }
  });

  return (
    <BaseLayout title={t('buttons.dashboard')} description={t('description')}>
      {store.allProcesses.length > 0 ? (
        <div>
          {store.allProcesses.map((uuid: string) => (
            // <ProcessInfo key={uuid} process={uuid} />
            <div key={uuid}>{uuid}</div> // Placeholder for ProcessInfo component
          ))}
          <form action="/api/export" method="get">
            <button class="btn-floating" id="exportButton" type="submit">
              {t('dashboard.export')}
            </button>
          </form>
        </div>
      ) : (
        <div class="empty-state">
          <div class="alert alert-warning">
            Under construction
          </div>
          <p>{t('dashboard.noProcesses')}</p>
          <p>{t('dashboard.beginProcess')}</p>
          <div class="absolute right-5 bottom-20">
            <button 
              class="btn btn-primary btn-circle fixed right-5 bottom-20"
              onClick$={() => store.modalOpen = true}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7H5"></path>
              </svg>
            </button>

            {store.modalOpen && (
              <div class="modal modal-open">
                <div class="modal-box">
                  <button 
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    onClick$={() => store.modalOpen = false}
                  >
                    ✕
                  </button>
                
                  <p class="font-bold text-lg">{t('dashboard.options')}</p>
                  <br/>
                  
                  <button 
                    class="btn btn-primary mb-4"
                    onClick$={() => nav('/create')}
                  >
                    {t('dashboard.createNewProcess')}
                  </button>

                  <form class="mt-4" action="/api/add-by-uuid" method="post">
                    <input placeholder={t('enterUUID')} type="text" name="uuid" class="input input-bordered" required />
                    <button type="submit" class="btn btn-primary m-2">
                      {t('dashboard.add')}
                    </button>
                  </form>
                  
                  <form class="flex items-center mt-4" action="/api/import-csv" method="post" enctype="multipart/form-data">
                    <input type="file" class="file-input" name="file" accept=".csv" required />
                    <br/>
                    <button type="submit" class="btn m-2 btn-primary">
                      {t('dashboard.import')}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <input type="file" class="hidden" id="fileInput" accept=".csv" />
        </div>
      )}
    </BaseLayout>
  );
});