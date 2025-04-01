import type { Metadata } from "next";
import { sfPro, inter } from "@/fonts";
import "./globals.css";
import cx from "classnames";
import RecoilContextProvider from "./recoilContextProvider";
import { Toaster } from "@/components/shared/toaster";

export const metadata: Metadata = {
  title: "FMA 2024 Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <RecoilContextProvider>
          {children}
          <Toaster />
        </RecoilContextProvider>
      </body>
    </html>
  );
}
