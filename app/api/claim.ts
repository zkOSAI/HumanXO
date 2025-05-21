import axios from "axios";
 import { PublicKey } from "@solana/web3.js"; 

export const claim = async (publicKey: PublicKey | null) => {
    console.log(publicKey);
    try {
      const data = {
        publicKey,
      };
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
      alert(response.data.message);
    } catch (err) {
        
      console.error("Error:", err);
      alert("Can't claim");
    }
  };