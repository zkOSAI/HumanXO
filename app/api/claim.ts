import axios from "axios";

 
import { toast } from 'react-toastify';
type EthAddress = `0x${string}`;
export const claim = async (publicKey:EthAddress | undefined ) => {
  const toastId = toast.loading("Waiting");
    try {
      const data = {
        publicKey,
      };
      console.log("🚀 ~ claim ~ data.publicKey:", data.publicKey)
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API!}/api/users/claim`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // Add any authentication headers if needed
            // 'Authorization': 'Bearer your-token'
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(response.data.message);
    } catch (err) {
        
      console.error("Error:", err);
      toast.error("Can't claim");
    }

  };