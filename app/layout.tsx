import type { Metadata } from "next";


import { ToastContainer } from "react-toastify";

import "./globals.css";
import styles from "./page.module.css"
import "react-toastify/dist/ReactToastify.css";

import ReactQueryProvider from "./providers/ReactQueryProvider";
import Web3Provider from "./providers/WagmiProvider";
import MobileMenuProvider from "./providers/MobileProvider";
import ThemeToggleMenuProvider from "./providers/ThemeProvider";
import Sidebar from "./component/Sidebar";

export const metadata: Metadata = {
  title: "XO Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Web3Provider>
            <MobileMenuProvider>
              <ThemeToggleMenuProvider>
                <div className={styles.content}>
                  <Sidebar />
                  {children}
                </div>
                <ToastContainer
                  position="bottom-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </ThemeToggleMenuProvider>
            </MobileMenuProvider>

          </Web3Provider>
        </ReactQueryProvider>
      </body>
    </html >
  );
}
