import type { Metadata } from "next";
import WalletContextProvider from "./providers/WalletContextProvider";

import "./globals.css";

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
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}
