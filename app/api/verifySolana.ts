//import axios from "axios";
import { PublicKey } from "@solana/web3.js";

export const verifySolana = async (publicKey: PublicKey | null) => {
  try {
    if (!publicKey) {
      throw new Error("publickey is required");
    }
    //const message = publicKey.toString();


    const data = {
      publicKey,
    };
    console.log("🚀 ~ verify ~ data.publicKey:", data.publicKey)
    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_BACKEND_API!}/api/users/verifySolana`,
    //   data,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       // Add any authentication headers if needed
    //       // 'Authorization': 'Bearer your-token'
    //     },
    //   }
    // );
  } catch (err) {

    console.error("Error:", err);
  }

};