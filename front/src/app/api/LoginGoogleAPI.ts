import {toast} from "react-hot-toast"

export async function fetchLoginGoogle(){
    try{
        const res = await fetch (`http://localhost:3000/auth-users/google/login`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.messaje || "Error loggin in with Google");
        }

        const data = await res.json();
        toast.success("Login with Google successful! Redirecting...")
        return data;
    }catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message: "An unknown error occurred";
        toast.error(errorMessage || "Google login failed. Please try again");
        return null;
    }
}
export default fetchLoginGoogle;