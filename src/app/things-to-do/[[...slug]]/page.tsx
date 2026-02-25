import { notFound } from "next/navigation";
import PageLayout from "@/components/templates/PageLayout";
import CategoryTemplate from "@/components/templates/CategoryTemplate";
import categories from "@/data/categories.json";

const categoriesData = categories as Record<string, {
  title: string;
  description: string;
  heroImage: string;
  subcategories?: string[];
  listings?: string[];
}>;

export function generateStaticParams() {
  const paths: { slug?: string[] }[] = [];
  for (const key of Object.keys(categoriesData)) {
    if (key.startsWith("things-to-do")) {
      const rest = key.replace("things-to-do", "").replace(/^\//, "");
      paths.push({ slug: rest ? rest.split("/") : undefined });
    }
  }
  return paths;
}

export default async function ThingsToDoPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = slug ? `things-to-do/${slug.join("/")}` : "things-to-do";
  const category = categoriesData[path];

  if (!category) return notFound();

  const breadcrumbs = [{ label: "Things To Do", href: "/things-to-do/" }];
  if (slug) {
    let acc = "/things-to-do";
    for (const segment of slug) {
      acc += `/${segment}`;
      breadcrumbs.push({
        label: segment.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        href: `${acc}/`,
      });
    }
  }

  return (
    <PageLayout>
      <CategoryTemplate category={category} breadcrumbs={breadcrumbs} />
    </PageLayout>
  );
}
