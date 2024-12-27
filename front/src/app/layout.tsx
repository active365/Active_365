import "@/app/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ContextProvider } from "@/context/GeneralContext";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
        <UserProvider> 
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <main>{children}</main>
          <Footer />
          </UserProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
