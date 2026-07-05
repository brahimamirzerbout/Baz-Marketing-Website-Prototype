import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { PostsList } from "@/components/marketing/PostsList";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { posts, getPost } from "@/content/posts";
import { site } from "@/lib/site";
import { buildMetadata, jsonLd, articleLd, breadcrumbLd } from "@/lib/seo";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post)
    return buildMetadata({
      title: "Post not found",
      path: `/insights/${params.slug}`,
      noindex: true,
    });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

const categoryLabel: Record<
  string,
  { name: string; tone: "accent" | "info" | "success" | "warning" }
> = {
  strategy: { name: "Strategy", tone: "accent" },
  seo: { name: "SEO", tone: "info" },
  paid: { name: "Paid", tone: "warning" },
  analytics: { name: "Analytics", tone: "success" },
  content: { name: "Content", tone: "accent" },
  ai: { name: "AI", tone: "info" },
};

export default function PostDetailPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const paragraphs = post.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const cat = categoryLabel[post.category]!;

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: post.title },
          ]}
        />
        <article className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant={cat.tone}>{cat.name}</Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-sm text-muted-foreground/60">·</span>
            <span className="text-sm text-muted-foreground">{post.readingMin} min read</span>
          </div>
          <h1 className="font-display text-display-xl font-medium tracking-[-0.035em] leading-[1.0]">
            {post.title}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-3 pb-8 border-b border-border">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-primary text-foreground font-display font-bold">
              {post.author
                .split(" ")
                .map((s) => s.charAt(0))
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <p className="font-medium text-foreground">{post.author}</p>
              <p className="text-sm text-muted-foreground">BAZ Marketing Agency</p>
            </div>
          </div>
          <div className="mt-10 prose prose-lg max-w-none">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-[1.75] text-foreground mb-6">
                {p}
              </p>
            ))}
          </div>
        </article>
      </Section>

      <Section tone="white" size="lg">
        <div className="bg-background rounded-2xl border border-border p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <Eyebrow>Like this? Read with us.</Eyebrow>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-snug mt-2">
              One playbook per month, sent by the partners.
            </h2>
          </div>
          <Button
            href={site.bookOrMailto}
            external
            variant="primary"
            size="lg"
            trackAs="post_book_call"
          >
            Book a growth call →
          </Button>
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <Eyebrow>More from the playbook</Eyebrow>
        <div className="mt-10">
          <PostsList />
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          articleLd(post),
          breadcrumbLd([
            { name: "Home", url: "/" },
            { name: "Insights", url: "/insights" },
            { name: post.title, url: `/insights/${post.slug}` },
          ]),
        ])}
      />
    </>
  );
}
