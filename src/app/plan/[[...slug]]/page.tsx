import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import plans from "@/data/plans.json";

const plansData = plans as Record<string, {
  title: string;
  description: string;
  heroImage: string;
  body?: string;
  links?: { title: string; href: string; description: string }[];
}>;

export function generateStaticParams() {
  const paths: { slug?: string[] }[] = [];
  for (const key of Object.keys(plansData)) {
    if (key === "plan") {
      paths.push({ slug: undefined });
    } else {
      const rest = key.replace("plan/", "");
      paths.push({ slug: rest.split("/") });
    }
  }
  return paths;
}

export default async function PlanPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = slug ? `plan/${slug.join("/")}` : "plan";
  const page = plansData[path];

  if (!page) return notFound();

  const breadcrumbs = [{ label: "Plan", href: "/plan/" }];
  if (slug) {
    let acc = "/plan";
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
      {/* Hero */}
      <section className="relative h-[50vh] w-full">
        <Image
          src={page.heroImage}
          alt={page.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 lg:px-24 pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest-custom uppercase max-w-3xl">
            {page.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream px-8 md:px-20 lg:px-24 py-4">
        <nav className="container-wide flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-teal">Home</Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span>/</span>
              <Link href={crumb.href} className="hover:text-teal">{crumb.label}</Link>
            </span>
          ))}
        </nav>
      </div>

      {/* Content */}
      <section className="bg-white px-8 md:px-20 lg:px-24 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {page.description}
          </p>

          {/* Links grid (for plan index) */}
          {page.links && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {page.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group p-6 bg-cream rounded-xl hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-bold text-teal group-hover:text-teal-light transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{link.description}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Body content */}
          {page.body && (
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-teal prose-headings:tracking-widest-custom prose-headings:uppercase prose-headings:text-xl prose-p:text-gray-600 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          )}
        </div>
      </section>
    </PageLayout>
  );
}
