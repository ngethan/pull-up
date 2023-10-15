import "./globals.css";
import { Manrope } from "next/font/google";

export const metadata = {
  title: "Pull Up",
  description: "Events simplified.",
};

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main
          className={`min-h-screen bg-background flex flex-col items-center ${manrope.variable} font-sans`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
