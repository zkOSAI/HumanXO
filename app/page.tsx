"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";

import { claim } from "./api/claim";

import styles from "./page.module.css";
import { useUsers } from "./queries/useUsers";

import { RedWalletOptions } from './component/RedWalletOptions';
import { WhiteWalletOptions } from './component/WhiteWalletOptions';
import { MobileWalletOptions } from "./component/MobileWalletOptions";

import {
  Cross,
  Dots,
  Face,
  Home,
  Home2,
  Moon,
  Star,
  Stats,
  Sun,
} from "@/shared/icons";
import ImportPrivateKey from "./component/importButton";
import { useMobileMenu } from "./context/mobileContext";
import { useTheme } from "./context/themeContext";
import Sidebar from "./component/Sidebar";
//import ConnectWallet from "./component/redWallet";


export default function HomePage() {
  const { theme, setTheme } = useTheme();
  // const [connectedWallet, setConnectedWallet] = React.useState(false);
  const { mobileMenu, setMobileMenu } = useMobileMenu();
  const { publicKey, disconnect, connected, connecting } = useWallet();


  const pathname = usePathname();
  const data = useUsers();
  const navigateToExtensionPage = () => {
    window.open(`https://github.com/zkOSAI/HumanXO-Extension`, "_blank");
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

          <MobileWalletOptions />
        </div>
      </div>
      <Sidebar />
      <div className={styles.contentArea}>
        <div className={styles.contentAreaWrapper}>
          <div className={styles.contentAreaTop}>

            <RedWalletOptions />
          </div>

          {connected ? (
            <div className={styles.dashboard}>
              <div className={styles.dashboardInfo}>
                <div className={styles.dashboardInfoCircle}></div>

                <p className={styles.dashboardInfoBread}>
                  <Home2 />
                  Dashboard
                </p>

                <p className={styles.dashboardInfoBalance}>
                  {data?.reward} points
                </p>

                <button
                  className={cn(styles.button, styles.dashboardInfoClaim)}
                  onClick={() => claim(publicKey)}
                >
                  Claim Rewards
                </button>

                <p className={styles.dashboardInfoEarned}>
                  Total Rewards Earned All Time
                </p>

                <p className={styles.dashboardInfoValue}>
                  {data?.score} Points
                </p>
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

                  <ImportPrivateKey />
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
                  <WhiteWalletOptions />
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

      <div className={styles.mobileMenu}>
        <Link href="/" className={styles.mobileMenuLogo}>
          <Image src="/img/logo.png" alt="logo" fill />
        </Link>

        <Link href="/" className={styles.mobileMenuLink}>
          <Home />
          Dashboard
        </Link>

        <Link href="/" className={styles.mobileMenuLink}>
          <Star />
          Reputation
        </Link>

        <button
          className={cn(styles.button, styles.mobileMenuButton)}
          onClick={() => setMobileMenu(true)}
        >
          <Dots />
          More
        </button>
      </div>
    </div>
  );
}
