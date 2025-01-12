import { toast } from "react-hot-toast";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchGyms() {
  try {
    const res = await fetch(`${APIURL}/gyms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error fetching gyms");
    }

    const data = await res.json();
    toast.success("Gyms fetched successfully!");
    return data; 
  }  catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage || "Failed to fetch gyms.");
    return null;
  }
}

export default fetchGyms;