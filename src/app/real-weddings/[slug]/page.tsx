import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { REAL_WEDDINGS_DATA } from "@/data/realWeddings";
import { ArrowLeft, MapPin, Tag } from "lucide-react";

interface RealWeddingDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return REAL_WEDDINGS_DATA.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: RealWeddingDetailPageProps) {
  const resolvedParams = await params;
  const story = REAL_WEDDINGS_DATA.find(
    (s) => s.slug === resolvedParams.slug || s.id === resolvedParams.slug
  );

  if (!story) {
    return {
      title: "Story Not Found — Wedora",
    };
  }

  return {
    title: `${story.couple} — ${story.location} | Real Weddings | Wedora`,
    description: story.description,
  };
}

export default async function RealWeddingDetailPage({ params }: RealWeddingDetailPageProps) {
  const resolvedParams = await params;
  const story = REAL_WEDDINGS_DATA.find(
    (s) => s.slug === resolvedParams.slug || s.id === resolvedParams.slug
  );

  if (!story) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-[#161514] pt-28 pb-20">
      <Container size="lg">
        {/* Back Navigation Link */}
        <div className="mb-8">
          <Link
            href="/real-weddings"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Real Weddings Archive</span>
          </Link>
        </div>

        {/* Story Header */}
        <header className="max-w-4xl mb-12">
          <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880] mb-4">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              {story.setting}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#5A5650]">
              <MapPin className="w-3.5 h-3.5" />
              {story.location}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#161514] leading-tight mb-4">
            {story.couple}
          </h1>

          <p className="font-serif text-2xl sm:text-3xl font-light text-[#161514]/85 italic mb-6">
            &quot;{story.title}&quot;
          </p>

          <p className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed max-w-2xl">
            {story.description}
          </p>
        </header>

        {/* Main Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#161514] mb-16 shadow-lg">
          <Image
            src={story.imageSrc}
            alt={story.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
        </div>

        {/* Story Narrative Sections */}
        {story.sections && story.sections.length > 0 && (
          <div className="max-w-3xl mx-auto space-y-16 mb-20">
            {story.sections.map((sec, idx) => (
              <section key={idx} className="border-t border-[#161514]/15 pt-10 space-y-4">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
                  {sec.title}
                </span>

                {sec.subtitle && (
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#161514]">
                    {sec.subtitle}
                  </h2>
                )}

                <p className="font-sans text-base sm:text-lg text-[#5A5650] font-light leading-relaxed">
                  {sec.content}
                </p>

                {sec.imageSrc && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden mt-8 shadow-md">
                    <Image
                      src={sec.imageSrc}
                      alt={sec.imageAlt || sec.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      className="object-cover object-center"
                      quality={90}
                    />
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Concluding Action Banner */}
        <Section padding="none" className="bg-[#161514] text-[#FAF8F5] p-10 sm:p-14 text-center mt-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] block">
              YOUR STORY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#FAF8F5]">
              Begin your celebration with Wedora.
            </h3>
            <p className="font-sans text-base text-[#FAF8F5]/80 font-light">
              Bring structure, clarity, and intention to your wedding planning journey.
            </p>
            <div className="pt-2">
              <Link href="/register">
                <Button variant="primary" size="lg">
                  Plan Your Wedding
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </Container>
    </article>
  );
}
