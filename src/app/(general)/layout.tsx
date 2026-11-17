import Footer from "@/src/components/section/Footer";
import Header from "@/src/components/section/Header";
import { SmoothScroll } from "@/src/components/motion/SmoothScroll";
import { ScrollProgress } from "@/src/components/motion/ScrollProgress";
import { AnimatedBackground } from "@/src/components/motion/AnimatedBackground";
import { ClickSpark } from "@/src/components/motion/ClickSpark";
import { BugGame } from "@/src/components/motion/BugGame";
import { FloatingContact } from "@/src/components/section/FloatingContact";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <ScrollProgress />
      <Header />
      <main className="relative">{children}</main>
      <Footer />
      <FloatingContact />
      <ClickSpark />
      <BugGame />
    </SmoothScroll>
  );
}
