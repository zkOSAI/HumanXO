import axios from "axios";
import { toast } from "react-toastify";
type EthAddress = `0x${string}`;

export const submitAnswer = async (address: EthAddress | undefined, question: string | undefined, answer: string | undefined) => {

    try {

        const data = {
            address,
            question,
            answer
        };
        console.log("🚀 ~ submitAnswer ~ data:", data)
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API!}/api/quiz/submitAnswer`,
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

        return res.data;
    } catch (error) {
        console.log(error)
        return false;

    }
}