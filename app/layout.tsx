import type { Metadata } from "next";
import WalletContextProvider from "./providers/WalletContextProvider";

import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";

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
          <WalletContextProvider>{children}</WalletContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
