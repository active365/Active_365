import { IRegisterData } from "../../interfaces/IRegister";
import { toast } from "react-hot-toast";

export async function fetchRegister(registerData: IRegisterData) {
  try {
    const res = await fetch(`http://localhost:3000/auth-users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to complete registration.");
    }

    const data = await res.json();
    toast.success("User registered successfully!"); // Notificación de éxito
    return data;
  } catch (error) {
    // Manejo seguro del tipo del error
    if (error instanceof Error) {
      toast.error(error.message); // Mostrar el mensaje del error
      console.error(error.message);
    } else {
      toast.error("An unexpected error occurred."); // Mensaje genérico para errores desconocidos
      console.error("Unknown error:", error);
    }
  }
}

export default fetchRegister;
