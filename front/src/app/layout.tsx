
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
          <Navbar/>
          <main>{children}</main>
          <Footer/>
      </body>
    </html>
  );
}