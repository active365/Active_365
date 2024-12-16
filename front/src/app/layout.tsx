// components/RootLayout.tsx
import "@/app/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="flex items-center justify-center px-4 py-4 w-full max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center space-y-4 w-full max-w-screen-xl">
            {/* Aquí ya no se incluye SearchPage */}
            {children}
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}
