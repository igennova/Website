import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import GitHubSection from "@/components/GitHubSection";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <GitHubSection />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
