import { component$, Resource, useResource$ } from '@builder.io/qwik';
import { loadContent } from '~/utils/contentLoader';
import { useLocale } from '~/i18n/useLocale';

interface Props {
  fileName: string;
}

export default component$((props: Props) => {
  const { fileName } = props;
  const locale = useLocale();

  const contentResource = useResource$<string>(async ({ track }) => {
    track(() => fileName);
    track(() => locale);

    try {
      return await loadContent(locale, fileName);
    } catch (error) {
      console.error('Error loading content:', error);
      return 'Content not found';
    }
  });

  return (
    <Resource
      value={contentResource}
      onPending={() => <div>Loading...</div>}
      onRejected={(error) => <div>Error: {error.message}</div>}
      onResolved={(content) => (
        <div dangerouslySetInnerHTML={content} />
      )}
    />
  );
});