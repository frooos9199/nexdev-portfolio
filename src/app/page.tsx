import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrivacySection from '@/components/PrivacySection';
import Pricing from '@/components/Pricing';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <Pricing />
      <PrivacySection />
      <Contact />
      <Footer />
    </main>
  );
}
