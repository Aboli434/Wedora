"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SERVICES_PAGE_DATA, DetailedService } from "@/data/servicesData";

export function ServiceDetail() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section padding="none" className="bg-[#FAF8F5] text-[#161514]">
      <Container className="space-y-24 md:space-y-36 py-16 md:py-24">
        {SERVICES_PAGE_DATA.detailedServices.map((service: DetailedService) => {
          const isImageLeft = service.alignment === "image-left";

          return (
            <div
              key={service.id}
              id={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            >
              {/* Image Block */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className={`lg:col-span-6 relative aspect-[4/3] md:aspect-[16/11] overflow-hidden group ${
                  isImageLeft ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    quality={90}
                  />
                  {/* Thin subtle border frame */}
                  <div className="absolute inset-0 border border-[#161514]/10 pointer-events-none" />
                </motion.div>
              </motion.div>

              {/* Content Block */}
              <div
                className={`lg:col-span-6 flex flex-col justify-center ${
                  isImageLeft ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {/* Number & Label */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-4 mb-4"
                >
                  <span className="font-serif text-3xl md:text-4xl text-[#C5A880] font-light">
                    {service.number}
                  </span>
                  <span className="w-8 h-[1px] bg-[#C5A880]" />
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#161514]/70">
                    {service.label}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161514] leading-[1.16] tracking-tight"
                >
                  {service.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-sans text-base md:text-lg text-[#5A5650] font-light leading-relaxed mt-6 max-w-xl"
                >
                  {service.description}
                </motion.p>

                {/* Feature List */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-[#161514]/15"
                >
                  <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#161514]/60 mb-4">
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-sans text-[#161514]/85">
                        <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
