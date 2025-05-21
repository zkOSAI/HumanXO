"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { claim } from "../api/claim";

import styles from "../page.module.css";
import { useUsers } from "../queries/useUsers";

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

export default function HomePage() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  // const [connectedWallet, setConnectedWallet] = React.useState(false);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { publicKey, disconnect, connected, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const pathname = usePathname();
  const data = useUsers();
  console.log(data);
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
    <div className={styles.content}>
      <div
        className={cn(styles.sidebar, {
          [styles.active]: mobileMenu,
        })}
      >
        <div className={styles.sidebarTop}>
          <div className={styles.sidebarLogoInner}>
            <Link
              href="/"
              className={styles.sidebarLogo}
              onClick={() => setMobileMenu(false)}
            >
              <div className="imageDiv">
                <Image
                  className="imageDiv1"
                  src="/img/logo.png"
                  alt="logo"
                  fill
                />
              </div>
            </Link>

            <button
              className={cn(styles.button, styles.sidebarClose)}
              onClick={() => setMobileMenu(false)}
            >
              <Cross />
            </button>
          </div>

          <nav className={styles.sidebarNav}>
            <Link
              href="/"
              className={cn(
                styles.sidebarNavLink,
                pathname === "/" && styles.active
              )}
              onClick={() => setMobileMenu(false)}
            >
              <Home />
              Dashboard
            </Link>

            <Link
              href="/reputation"
              className={cn(
                styles.sidebarNavLink,
                pathname === "/reputation" && styles.active
              )}
              onClick={() => setMobileMenu(false)}
            >
              <Star />
              Reputation (SOON)
            </Link>

            <Link
              href="/statistics"
              className={cn(
                styles.sidebarNavLink,
                pathname === "/statistics" && styles.active
              )}
              onClick={() => setMobileMenu(false)}
            >
              <Stats />
              Statistics (SOON)
            </Link>
          </nav>
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarBottomTheme}>
            <button
              className={cn(styles.button, styles.sidebarThemeItem, {
                [styles.active]: theme === "dark",
              })}
              onClick={() => setTheme("dark")}
            >
              <Moon />
            </button>

            <button
              className={cn(styles.button, styles.sidebarThemeItem, {
                [styles.active]: theme === "light",
              })}
              onClick={() => setTheme("light")}
            >
              <Sun />
            </button>
          </div>

          <button className={cn(styles.button, styles.sidebarBottomMore)}>
            <Dots />
          </button>
        </div>
      </div>

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
                  <Stats />
                  Statistic
                </p>

               

                <button
                  className={cn(styles.button, styles.dashboardInfoClaim)}
                  
                >
                 Coming Soon
                </button>

               
              </div>

              
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
      </div>
    </div>
  );
}
