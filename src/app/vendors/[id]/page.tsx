import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VENDORS_DATA } from "@/data/vendors";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, MapPin, Tag, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

interface VendorDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getVendor(idOrSlug: string) {
  // 1. Query database for registered vendors
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    const dbVendor = await prisma.vendorProfile.findFirst({
      where: isUuid
        ? { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }
        : { slug: idOrSlug },
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
            phoneNumber: true,
          },
        },
        services: true,
      },
    });

    if (dbVendor) {
      return {
        id: dbVendor.id,
        slug: dbVendor.slug,
        name: dbVendor.businessName,
        category: dbVendor.category,
        location: dbVendor.city,
        description:
          dbVendor.description ||
          `${dbVendor.businessName} is a premier ${dbVendor.category.toLowerCase()} studio based in ${dbVendor.city}, delivering bespoke craftsmanship and elevated wedding experiences.`,
        imageSrc: dbVendor.coverImage || "/images/wedding/wedora-service-planning.jpg",
        imageAlt: `${dbVendor.businessName} showcase`,
        verified: dbVendor.verified,
        featured: dbVendor.featured,
        startingPrice: dbVendor.startingPrice
          ? `₹${(Number(dbVendor.startingPrice) / 100).toLocaleString("en-IN")}`
          : undefined,
        ownerName: dbVendor.user?.fullName,
        services: dbVendor.services,
      };
    }
  } catch (err) {
    console.error("Database vendor query failed:", err);
  }

  // 2. Fallback to static mock vendors
  const staticVendor = VENDORS_DATA.find(
    (v) => v.slug === idOrSlug || v.id === idOrSlug
  );

  if (staticVendor) {
    return {
      id: staticVendor.id,
      slug: staticVendor.slug,
      name: staticVendor.name,
      category: staticVendor.category,
      location: staticVendor.location,
      description: staticVendor.description,
      imageSrc: staticVendor.imageSrc,
      imageAlt: staticVendor.imageAlt,
      verified: true,
      featured: staticVendor.featured || false,
      startingPrice: undefined,
      ownerName: undefined,
      services: [],
    };
  }

  return null;
}

export async function generateMetadata({ params }: VendorDetailPageProps) {
  const resolvedParams = await params;
  const vendor = await getVendor(resolvedParams.id);

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
  const vendor = await getVendor(resolvedParams.id);

  if (!vendor) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-[#161514] pt-28 pb-20">
      <Container size="lg">
        {/* Back Navigation Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>

          {vendor.featured && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161514] text-[#C5A880] text-[10px] font-semibold uppercase tracking-[0.2em] rounded-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Featured Partner
            </span>
          )}
        </div>

        {/* Verification Status Banner if Unverified */}
        {!vendor.verified && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-300 rounded-xs flex items-center gap-3 text-amber-900 text-xs">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider text-[11px] block">
                ADMIN PREVIEW • PROFILE UNDER REVIEW
              </span>
              <span>
                This vendor studio has been submitted and is currently awaiting verification approval in the Admin Console.
              </span>
            </div>
          </div>
        )}

        {/* Vendor Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden bg-[#161514] rounded-xs shadow-sm">
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

              {vendor.verified && (
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Wedora Partner
                  </span>
                </div>
              )}
            </div>

            <p className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed">
              {vendor.description}
            </p>

            {vendor.startingPrice && (
              <div className="p-4 bg-white border border-[#161514]/10 rounded-xs">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5A5650] block">
                  Starting Investment
                </span>
                <span className="font-serif text-2xl font-light text-[#161514]">
                  {vendor.startingPrice}
                </span>
              </div>
            )}

            <div className="pt-4 border-t border-[#161514]/10 flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full sm:w-auto">
                  Inquire with Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Editorial Profile Note */}
        <div className="p-8 border border-[#161514]/10 bg-[#F3EFEA] text-center space-y-3 rounded-xs">
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            EDITORIAL PROFILE
          </span>
          <p className="font-sans text-sm text-[#5A5650] font-light max-w-xl mx-auto">
            Full vendor portfolios, gallery collections, service packages, and direct booking inquiries for {vendor.name} can be reserved through Wedora concierge.
          </p>
        </div>
      </Container>
    </article>
  );
}
