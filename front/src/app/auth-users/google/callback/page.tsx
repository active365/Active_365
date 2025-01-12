import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const GoogleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Obtén la respuesta del backend (suponiendo que la devuelve como JSON)
        const APIURL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${APIURL}/auth-users/google/callback`, {
          method: "GET",
          credentials: "include", // Si el backend usa cookies
        });

        if (response.ok) {
          const data = await response.json();
          // Guarda el token en cookies
          Cookies.set("loginData", JSON.stringify(data), { expires: 7 });
          // Redirige al home
          router.push("/");
        } else {
          console.error("Google login failed:", await response.text());
          // Opcional: Manejar error (redirigir o mostrar mensaje)
          router.push("/login");
        }
      } catch (error) {
        console.error("Error handling Google callback:", error);
        router.push("/login");
      }
    };

    handleGoogleCallback();
  }, [router]);

  return <div>Processing login...</div>;
};

export default GoogleCallback;