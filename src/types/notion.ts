export type NotionNewsItem = {
  id: string;
  title: string;        // Title (rich_text)
  excerpt: string;      // Excerpt (rich_text)
  thumbnail: string | null;
  publishedAt: string;  // Date
  slug: string;
  category: string;     // Category (select)
  author: string;       // Author (rich_text)
  pinned: boolean;      // Pinned (checkbox)
  tags: string[];       // Tags (multi_select)
};

export type NotionCaseStudyItem = {
  id: string;
  title: string;        // Title (rich_text)
  excerpt: string;      // Excerpt (rich_text)
  thumbnail: string | null;
  client: string;       // Client (rich_text)
  slug: string;
  category: string;     // Category (select)
  languages: string;    // Languages (rich_text)
  duration: string;     // Duration (rich_text)
  results: string;      // Results (rich_text)
  pinned: boolean;      // Pinned (checkbox)
  tags: string[];       // Tags (multi_select)
  publishedAt: string;  // Date
};
