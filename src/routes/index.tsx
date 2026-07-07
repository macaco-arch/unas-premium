import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Team } from "@/components/site/Team";
import { Reviews } from "@/components/site/Reviews";
import { Promotions } from "@/components/site/Promotions";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <Team />
        <Promotions />
        <Reviews />
      </main>
      <SiteFooter />
    </div>
  );
}
