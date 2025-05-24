import { Section, Sections } from '~/components/SectionsRenderer/SectionsRenderer';
import { HeadingBlockNode } from '~/components/ArticleAnchorsListRenderer/ArticleAnchor';
import { RichTextSectionProps } from '~/components/SectionsRenderer/section/RichTextSection';


const getHeadings = (richTextSection?: RichTextSectionProps): HeadingBlockNode[] => {
  if (!richTextSection?.section.content) {
    return [];
  }
  const { content } = richTextSection?.section;

  return content.filter((c: any) => {
    if (c.type === 'heading' && c.level === 2) {
      return c;
    }
  }) as HeadingBlockNode[]
}

export const getHeadingsFromSections = (sections?: Sections) => {
  if (!sections) {
    return [];
  }
  return Array.from(sections).reduce((acc: HeadingBlockNode[], section: Section, index) => {
    if (section.__component === 'sections.rich-text') {
      const headings = getHeadings({ section });
      headings.forEach((heading) => {
        acc.push(heading);
      })
    }

    return acc;
  }, []);
}