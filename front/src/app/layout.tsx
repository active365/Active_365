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
        <CartProvider>
          <Navbar />
          {/* Contenedor para el buscador y el menú */}
          <div className="flex items-center justify-center px-4 py-4 w-full max-w-screen-xl mx-auto">
            {/* Contenedor de la búsqueda y el menú desplegable, apilados uno encima del otro */}
            <div className="flex flex-col items-center space-y-4 w-full max-w-screen-xl">
              {/* El buscador */}
            

            </div>

          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}
