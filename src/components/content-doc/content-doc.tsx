import { component$, Resource, useResource$ } from '@builder.io/qwik';
import { useContentLoader } from '~/utils/contentLoader';
import { useLocale } from '~/hooks/useLocale';

interface Props {
  fileName: string;
}

export default component$((props: Props) => {
  const { fileName } = props;
  const locale = useLocale();
  const contentLoader = useContentLoader();

  const contentResource = useResource$<string>(async ({ track }) => {
    track(() => fileName);
    track(() => locale);

    try {
      return await contentLoader.loadContent(fileName);
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