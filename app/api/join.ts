//import axios from "axios";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

import { Id, toast } from "react-toastify";
import { checkDeposit } from "./checkDeposit";
const Mint = process.env.NEXT_PUBLIC_MINT_ADDRESS!;
const warrantyWallet = process.env.NEXT_PUBLIC_WARRANTY_WALLET!;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
let toastId: Id;
export const join = async (
  id: string,
  publicKey: PublicKey | null,
  minimum: number,
  warranty: number
) => {
  try {
    const provider = window.solana;
    if (!provider || !provider.isPhantom) {
      throw new Error("Phantom wallet not found");
    }
    const ataOfUser = await getAssociatedTokenAddress(
      new PublicKey(Mint),
      publicKey!
    );
    const ataOfWarranty = await getAssociatedTokenAddress(
      new PublicKey(Mint),
      new PublicKey(warrantyWallet!)
    );
    const balance = await connection.getTokenAccountBalance(ataOfUser);
    const balanceAmount = balance.value.uiAmount || 0;
    if (balanceAmount >= minimum / 100) {
      toastId = toast.loading(`Waiting for transaction...`);
      const transferIx = createTransferInstruction(
        ataOfUser,
        ataOfWarranty,
        publicKey!, // owner
        (warranty * LAMPORTS_PER_SOL) / 10 // amount in base units, i.e., if 6 decimals, 1 token = 1_000_000
      );

      const tx = new Transaction().add(transferIx);
      tx.feePayer = publicKey!;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      // Request Phantom to sign and send
      const signedTx = await provider.signTransaction(tx);
      const sig = await connection.sendRawTransaction(signedTx.serialize());

      console.log("✅ Transaction sent:", sig);
      const res = await checkDeposit(sig, id, publicKey);
      console.log(res);
      toast.info(res.data);
      await connection.confirmTransaction(sig, "confirmed");
      toast.dismiss(toastId);
      toast.success(`Transaction successful!`);
    } else toast.error(`not enough balance`);
  } catch (e) {
    toast.dismiss(toastId);

    // Safely handle different error types
    if (e instanceof Error) {
      toast.error(e.message);
    } else {
      toast.error("An unknown error occurred");
    }
  }
};
