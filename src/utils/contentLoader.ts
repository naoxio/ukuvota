// src/utils/contentLoader.ts
import { useLocale } from '~/hooks/useLocale';
import { $ } from '@builder.io/qwik';

// Update this line to point to the public folder
const contentModules = import.meta.glob('/content/**/*.md');

export const useContentLoader = () => {
  const locale = useLocale();

  const loadContent = $(async (fileName: string): Promise<string> => {
    // Update the path to include 'public'
    const path = `/content/${locale}/${fileName}.md`;
    const module = contentModules[path];
    if (module) {
      const content = await module();
      return (content as any).default;
    }
    throw new Error(`Content not found: ${path}`);
  });

  return { loadContent };
};