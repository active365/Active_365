// components/RootLayout.tsx
import "@/app/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchPage from "./search/page";
import DropdownMenu from "@/components/DropdownMenu";
import { categories } from "@/helpers/arrayProducts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* Contenedor para el buscador y el menú */}
        <div className="flex items-center justify-center px-4 py-4 w-full max-w-screen-xl mx-auto">
          {/* Contenedor de la búsqueda y el menú desplegable, apilados uno encima del otro */}
          <div className="flex flex-col items-center space-y-4 w-full max-w-screen-xl">
            {/* El buscador */}
            <SearchPage />

            {/* Componente DropdownMenu (botón de categorías) */}
            <DropdownMenu categories={categories} />
          </div>
        </div>

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
