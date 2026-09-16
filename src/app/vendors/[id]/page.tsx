import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VENDORS_DATA } from "@/data/vendors";
import { ArrowLeft, MapPin, Tag } from "lucide-react";

interface VendorDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return VENDORS_DATA.map((vendor) => ({
    id: vendor.slug,
  }));
}

export async function generateMetadata({ params }: VendorDetailPageProps) {
  const resolvedParams = await params;
  const vendor = VENDORS_DATA.find(
    (v) => v.slug === resolvedParams.id || v.id === resolvedParams.id
  );

  if (!vendor) {
    return {
      title: "Vendor Not Found — Wedora",
    };
  }

  return {
    title: `${vendor.name} — ${vendor.category} in ${vendor.location} | Wedora`,
    description: vendor.description,
  };
}

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
  const resolvedParams = await params;
  const vendor = VENDORS_DATA.find(
    (v) => v.slug === resolvedParams.id || v.id === resolvedParams.id
  );

  if (!vendor) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-[#161514] pt-28 pb-20">
      <Container size="lg">
        {/* Back Navigation Link */}
        <div className="mb-8">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
        </div>

        {/* Vendor Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden bg-[#161514]">
            <Image
              src={vendor.imageSrc}
              alt={vendor.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
              quality={90}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {vendor.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#5A5650]">
                  <MapPin className="w-3.5 h-3.5" />
                  {vendor.location}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#161514] leading-tight">
                {vendor.name}
              </h1>
            </div>

            <p className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed">
              {vendor.description}
            </p>

            <div className="pt-4 border-t border-[#161514]/10 flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full sm:w-auto">
                  Inquire with Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Detail Placeholder Note */}
        <div className="p-8 border border-[#161514]/10 bg-[#F3EFEA] text-center space-y-3">
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            EDITORIAL PROFILE PLACEHOLDER
          </span>
          <p className="font-sans text-sm text-[#5A5650] font-light max-w-xl mx-auto">
            Full vendor portfolios, gallery collections, service packages, and direct booking management will be connected here in the platform release.
          </p>
        </div>
      </Container>
    </article>
  );
}
