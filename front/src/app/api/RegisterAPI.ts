import { IRegisterData } from "../../interfaces/IRegister";
import { toast } from "react-hot-toast";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchRegister(registerData: IRegisterData) {
  try {
    const res = await fetch(`${APIURL}/auth-users/signup`, {
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
    toast.success("User registered successfully!"); 
    return data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message); 
      console.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
      console.error("Unknown error:", error);
    }
  }
}

export default fetchRegister;
