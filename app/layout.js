import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  variable: "--font-clash-display",
  src: [
    {
      path: "../public/fonts/ClashDisplay/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

// Self-hosted (copied from Next's bundled Geist Mono) so builds never depend on reaching Google Fonts.
const geistMono = localFont({
  variable: "--font-geist-mono",
  src: [{ path: "../public/fonts/GeistMono/GeistMono-Variable.woff2", weight: "100 900", style: "normal" }],
  display: "swap",
  preload: false, // only used for small labels; keep it from competing with first paint
});

export const metadata = {
  title: "Qytrona Technologies",
  description: "Qytrona Technologies",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
