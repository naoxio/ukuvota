import { component$, Resource, useResource$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

interface Props {
  fileName: string;
}

export default component$((props: Props) => {
  const { fileName } = props;
  const location = useLocation();

  const contentResource = useResource$<string>(async ({ track }) => {
    track(() => fileName);
    track(() => location.locale);

    const content = await import(`../../content/${location.locale}/${fileName}.md`);
    return content.default;
  });

  return (
    <Resource
      value={contentResource}
      onResolved={(content) => <div dangerouslySetInnerHTML={content} />}
    />
  );
});