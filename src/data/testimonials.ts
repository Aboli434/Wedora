export interface Testimonial {
  id: string;
  names: string;
  wedding: string;
  location: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
  isDominant?: boolean;
}

// Demo testimonial entries for portfolio showcase
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "aditi-arjun",
    names: "Aditi & Arjun",
    wedding: "Heritage Palace Wedding",
    location: "Udaipur, Rajasthan",
    quote:
      "We finally had one place for everything — the people, the plans, the little decisions, and all the moments we didn't want to miss.",
    imageSrc: "/images/wedding/wedora-testimonial-aditi-arjun.jpg",
    imageAlt: "Aditi and Arjun during their intimate Udaipur wedding celebration",
    isDominant: true,
  },
  {
    id: "meera-rohan",
    names: "Meera & Rohan",
    wedding: "Coastal Sunset Wedding",
    location: "Goa, India",
    quote:
      "What felt overwhelming at first became beautifully manageable. We could actually enjoy the journey instead of constantly chasing the next task.",
    imageSrc: "/images/wedding/wedora-testimonial-meera-rohan.jpg",
    imageAlt: "Meera and Rohan at their coastal Goa wedding celebration",
    isDominant: false,
  },
  {
    id: "isha-kunal",
    names: "Isha & Kunal",
    wedding: "Traditional Royal Celebration",
    location: "Jaipur, Rajasthan",
    quote:
      "Wedora gave our wedding structure without taking away the personality that made it ours.",
    imageSrc: "/images/wedding/wedora-testimonial-isha-kunal.jpg",
    imageAlt: "Isha and Kunal during their Jaipur heritage wedding celebration",
    isDominant: false,
  },
];
