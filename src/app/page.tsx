import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LeetCodeSection from "@/components/LeetCodeSection";
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
        <LeetCodeSection />
        <GitHubSection />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
