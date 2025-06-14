import axios from "axios";
import { toast } from "react-toastify";
type EthAddress = `0x${string}`;

export const joinQuiz = async (address: EthAddress | undefined, id: string | undefined) => {
    let toastId;
    try {
        toastId = toast.loading("Waiting for response");
        const data = {
            address,
            id
        };
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API!}/api/quiz/join`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    // Add any authentication headers if needed
                    // 'Authorization': 'Bearer your-token'
                },
            }
        );
        console.log(res.data)
        toast.dismiss(toastId);
        return res.data.success;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Error")
        return false;

    }
}