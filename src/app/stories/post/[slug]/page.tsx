import { notFound } from "next/navigation";
import PageLayout from "@/components/templates/PageLayout";
import StoryTemplate from "@/components/templates/StoryTemplate";
import stories from "@/data/stories.json";

const storiesData = stories as Record<string, {
  title: string;
  slug: string;
  heroImage: string;
  author: string;
  readTime: string;
  excerpt: string;
  body: string;
  relatedStories: string[];
}>;

export function generateStaticParams() {
  return Object.keys(storiesData).map((slug) => ({ slug }));
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = storiesData[slug];

  if (!story) return notFound();

  return (
    <PageLayout>
      <StoryTemplate story={story} />
    </PageLayout>
  );
}
