import { ILoginData } from "@/interfaces/ILogin";
import { toast } from "react-hot-toast";

export async function fetchLoginGym(loginData: ILoginData) {
  try {
    const res = await fetch(`http://localhost:3000/auth-gyms/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error logging in");
    }

    const data = await res.json();
    toast.success("Login successful! Redirecting...");
    return data; 
  }  catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage || "Login failed. Please try again.");
    return null;
  }
}

export default fetchLoginGym;