import { AuthShell, RegisterForm } from "@/components/sections/auth";

export const metadata = {
  title: "Create Your Account | Wedora",
  description:
    "Create your Wedora account and choose the experience that fits your celebration or wedding business.",
};

export default function RegisterPage() {
  return (
    <main>
      <AuthShell
        visualImage="/images/wedding/wedora-service-planning.jpg"
        visualQuote="BEGIN YOUR CELEBRATION."
        visualSubtext="Choose the experience that fits your wedding planning journey or wedding business."
      >
        <RegisterForm />
      </AuthShell>
    </main>
  );
}
