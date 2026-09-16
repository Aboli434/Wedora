import { AuthShell, LoginForm } from "@/components/sections/auth";

export const metadata = {
  title: "Sign In | Wedora",
  description:
    "Sign in to your Wedora account and continue planning your celebration.",
};

export default function LoginPage() {
  return (
    <main>
      <AuthShell
        visualImage="/images/wedding/wedora-hero-wedding.jpg"
        visualQuote="YOUR STORY, BEAUTIFULLY CONSIDERED."
        visualSubtext="Bring the people, plans, and details behind your celebration into one place."
      >
        <LoginForm />
      </AuthShell>
    </main>
  );
}
