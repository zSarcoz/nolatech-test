import type { Metadata } from "next";
import "@fontsource/roboto";
import "./globals.css";


export const metadata: Metadata = {
  title: "Nolatech Test",
  description: "Evaluation system for remotes employes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
