"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import styles from "./page.module.css";

import {
  Cross,
  Dots,
  Face,
  Home,
  Home2,
  Menu,
  Moon,
  Star,
  Stats,
  Sun,
} from "@/shared/icons";
import ImportPrivateKey from "./component/importButton";

export default function HomePage() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [connectedWallet, setConnectedWallet] = React.useState(false);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { disconnect, connected, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const navigateToExtensionPage = () => {
    window.open(`https://chrome.google.com/webstore`, "_blank");
  };
  React.useEffect(() => {
    const checkConnection = async () => {
      try {
        // @ts-expect-error: third-party type issue
        const provider = window.phantom?.solana;
        if (provider?.isPhantom) {
          //const connected = provider.isConnected;
          //setConnected(connected);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    };

    checkConnection();
  }, []);

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
              <Image src="/img/logo.png" alt="logo" fill />
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
              className={cn(styles.sidebarNavLink, styles.active)}
              onClick={() => setMobileMenu(false)}
            >
              <Home />
              Dashboard
            </Link>

            <Link
              href="/reputation"
              className={styles.sidebarNavLink}
              onClick={() => setMobileMenu(false)}
            >
              <Star />
              Reputation
            </Link>

            <Link
              href="/statistics"
              className={styles.sidebarNavLink}
              onClick={() => setMobileMenu(false)}
            >
              <Stats />
              Statistics
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
                  <Home2 />
                  Dashboard
                </p>

                <p className={styles.dashboardInfoBalance}>100 Zkos</p>

                <button
                  className={cn(styles.button, styles.dashboardInfoClaim)}
                >
                  Claim Rewards
                </button>

                <p className={styles.dashboardInfoEarned}>
                  Total Rewards Earned All Time
                </p>

                <p className={styles.dashboardInfoValue}>7322 Zkos</p>
              </div>

              <div className={styles.dashboardWrapper}>
                <div className={styles.dashboardInvite}>
                  <Image src="/img/invite-bg.png" alt="bg" fill />

                  <div className={styles.dashboardInviteContent}>
                    <p className={styles.dashboardInviteSoon}>Coming soon</p>

                    <div className={styles.dashboardInviteTextBlock}>
                      <p className={styles.dashboardInviteTitle}>
                        Invite friends, earn rewards!
                      </p>

                      <p className={styles.dashboardInviteText}>
                        Refer your friends and get extra bonuses when they join.
                      </p>

                      <p className={styles.dashboardInviteText}>
                        The more you share, the more you earn!
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.dashboardSync}>
                  <div className={styles.dashboardSyncCircle}></div>

                  <p className={styles.dashboardSyncTitle}>
                    Sync Browser Extension
                  </p>

                  <p className={styles.dashboardSyncText}>
                    To earn and claim your rewards, import and sync your HumanXO
                    private key.
                  </p>

                  {/* <button
                    className={cn(styles.button, styles.dashboardSyncButton)}
                  >
                    Import Private Key
                  </button> */}
                  <ImportPrivateKey/>
                </div>
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
                        onClick={ navigateToExtensionPage}
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
