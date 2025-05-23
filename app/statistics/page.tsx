"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { join } from "../api/join"

import styles from "../page.module.css";
//import { useUsers } from "../queries/useUsers";

import {
  Cross,
  Dots,
  Face,
  Home,
  Menu,
  Moon,
  Star,
  Stats,
  Sun,
} from "@/shared/icons";
import { useQuizs } from "../queries/useQuizs";
//import { join } from "../api/join";

export default function HomePage() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  // const [connectedWallet, setConnectedWallet] = React.useState(false);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { disconnect, connected, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const pathname = usePathname();
  //const data = useUsers();
  const quizs = useQuizs();
  const { publicKey } = useWallet();
  //console.log("quizs", quizs);
  const navigateToExtensionPage = () => {
    window.open(`https://chrome.google.com/webstore`, "_blank");
  };

  const connectPhantomWallet = async () => {
    console.log("connection wallet");
    setVisible(true);
  };

  const disconnectWallet = async () => {
    disconnect();
  };

  return (
    <>
      <div className={styles.contentArea}>
        <div className={styles.contentAreaWrapper}>
          <div className={styles.contentAreaTop}>
            <button
              className={cn(styles.button, styles.contentAreaMenu)}
              onClick={() => setMobileMenu(true)}
            >
              <Menu />
            </button>

            {connected ? (
              <button
                className={cn(styles.button, styles.connectButton)}
                onClick={disconnectWallet}
              >
                Disonnect Wallet
              </button>
            ) : (
              <button
                className={cn(styles.button, styles.connectButton)}
                onClick={connectPhantomWallet}
                disabled={connecting}
              >
                {connecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>

          {connected ? (
            <div className={styles.dashboard}>
              <div className={styles.dashboardInfo}>
                <div className={styles.dashboardInfoCircle}></div>

                <p className={styles.dashboardInfoBread}>
                  <Star />
                  Reputation
                </p>

                <button
                  className={cn(styles.button, styles.dashboardInfoClaim)}
                >
                  Coming Soon
                </button>
              </div>

              {quizs?.map((quiz: any) => (
                <div key={quiz._id} className={styles.dashboardInfoClaim}>
                  <div className={styles.dashboardInfoBlockTitle}>
                    level: {quiz.level}
                  </div>

                  <p className={styles.dashboardInfoBlockText}>
                    current users: {quiz.currentUser}
                  </p>

                  <p className={styles.dashboardInfoBlockText}>
                    Minimum Hold amount: {quiz.minimumHolding}
                  </p>
                  <p className={styles.dashboardInfoBlockText}>
                    warrant: {quiz.warranty}
                  </p>
                  <p className={styles.dashboardInfoBlockText}>
                    reward: {quiz.warranty * 2}
                  </p>
                  <p className={styles.dashboardInfoBlockText}>
                    Winners: {quiz.winners}
                  </p>
                  <p className={styles.dashboardInfoBlockText}>
                    Losers: {quiz.looser}
                  </p>

                  <button
                    className={cn(
                      styles.button,
                      styles.dashboardInfoBlockButton
                    )}
                    onClick={() => {
                      join(quiz._id, publicKey, quiz.minimumHolding, quiz.warranty, quiz.maxUser, quiz.currentUser, quiz.startTime, quiz.period);
                    }}
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.welcome}>
              <div className={styles.welcomeBlock}>
                <div className={styles.welcomeCircle}></div>

                <div className={styles.welcomeBlockContent}>
                  <div className={styles.welcomeBlockTitleInner}>
                    <p>Welcome to</p>

                    <p>HumanXO by zkOS.</p>
                  </div>

                  <p className={styles.welcomeBlockText}>
                    Connect and start improving your on-chain reputation:
                  </p>

                  <p className={styles.welcomeBlockText}>
                    By engaging with HumanXO, users strengthen their on-chain
                    identity, unlock rewards and contribute to a more
                    Sybil-resistant blockchain.
                  </p>

                  {connected ? (
                    <button
                      className={cn(styles.button, styles.welcomeBlockConnect)}
                      onClick={disconnectWallet}
                    >
                      Disonnect Wallet
                    </button>
                  ) : (
                    <button
                      className={cn(styles.button, styles.welcomeBlockConnect)}
                      onClick={connectPhantomWallet}
                      disabled={connecting}
                    >
                      {connecting ? "Connecting..." : "Connect Wallet"}
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.welcomeWrapper}>
                <div className={styles.welcomeSolana}>
                  <div className={styles.welcomeSolanaImg}>
                    <Image src="/img/solana.png" alt="Solana" fill />
                  </div>

                  <div className={styles.welcomeSolanaText}>
                    <p>Built on Solana,</p>

                    <p>designed to increase</p>

                    <p>on-chain human activity.</p>
                  </div>
                </div>

                <div className={styles.welcomeExtension}>
                  <Face className={styles.welcomeExtensionIcon} />

                  <p className={styles.welcomeExtensionText}>
                    Passively verify you&rsquo;re human, build reputation in the
                    HumanXO ecosystem, and earn rewards.
                  </p>

                  <button
                    className={cn(styles.button, styles.downloadExtension)}
                    onClick={navigateToExtensionPage}
                  >
                    Download Browser Extension
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div></>



  );
}
