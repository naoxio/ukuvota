// src/utils/contentLoader.ts

const contentModules = import.meta.glob('~/content/**/*.md');

export async function loadContent(locale: string, fileName: string): Promise<string> {
  const path = `/content/${locale}/${fileName}.md`;
  const module = contentModules[path];
  
  if (module) {
    const content = await module();
    return (content as any).default;
  }
  
  throw new Error(`Content not found: ${path}`);
}
