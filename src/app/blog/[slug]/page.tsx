import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BLOG_POSTS } from "@/data/blog";
import {
  BlogArticleHero,
  BlogArticleBody,
  RelatedPosts,
  BlogCTA,
} from "@/components/sections/blog";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug || p.id === resolvedParams.slug);

  if (!post) {
    return {
      title: "Article Not Found — Wedora Journal",
    };
  }

  return {
    title: `${post.title} | Wedora Journal`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug || p.id === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-[#161514] pt-28 pb-0">
      <Container size="lg">
        <BlogArticleHero post={post} />
        <BlogArticleBody post={post} />
        <RelatedPosts currentPostId={post.id} allPosts={BLOG_POSTS} />
      </Container>
      <div className="mt-20">
        <BlogCTA />
      </div>
    </article>
  );
}
