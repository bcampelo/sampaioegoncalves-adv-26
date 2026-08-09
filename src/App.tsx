import { useState } from "react";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Sobre } from "@/components/sections/Sobre";
import { Areas } from "@/components/sections/Areas";
import { Advogados } from "@/components/sections/Advogados";
import { Contato } from "@/components/sections/Contato";
import { Marquee } from "@/components/ui/Marquee";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Preloader } from "@/components/ui/Preloader";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function App() {
  const [introReady, setIntroReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIntroReady(true)} />
      <NoiseOverlay />
      <FloatingWhatsApp />

      <SmoothScroll>
        <Navbar />
        <main>
          <Hero introReady={introReady} />
          <Marquee />
          <Advogados />
          <Areas />
          <Sobre />
          <Contato />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
