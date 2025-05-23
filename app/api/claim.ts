//import axios from "axios";

 
import { toast } from 'react-toastify';
type EthAddress = `0x${string}`;
export const claim = async (address:EthAddress | undefined ) => {
    console.log(address);
    toast.error("Unable to claim");
    // try {
    //   const data = {
    //     publicKey,
    //   };
    //   const response = await axios.post(
    //     `${process.env.NEXT_PUBLIC_BACKEND_API!}/api/users/claim`,
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         // Add any authentication headers if needed
    //         // 'Authorization': 'Bearer your-token'
    //       },
    //     }
    //   );
    //   alert(response.data.message);
    // } catch (err) {
        
    //   console.error("Error:", err);
    //   alert("Can't claim");
    // }

  };