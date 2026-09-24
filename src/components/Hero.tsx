import HeroBanner from "./HeroBanner";
import HeroIntro from "./HeroIntro";
import VisitorLocation from "./VisitorLocation";

export default function Hero() {
  return (
    <section id="hero" className="pb-10">
      <HeroBanner />

      <div className="mx-auto w-full max-w-3xl px-6">
        <HeroIntro />
        <VisitorLocation />
      </div>
    </section>
  );
}
