export type NotionNewsItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  publishedAt: string;
  slug: string;
};

export type NotionCaseStudyItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  company: string;
  slug: string;
};
