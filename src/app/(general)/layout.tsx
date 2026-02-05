// Archivo: src/app/(general)/layout.tsx

import Footer from "@/src/components/section/Footer";
import Header from "@/src/components/section/Header";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Header />
        {children}
        <Footer />

    </>
  );
}