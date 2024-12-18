import "@/app/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ContextProvider } from "@/context/GeneralContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}