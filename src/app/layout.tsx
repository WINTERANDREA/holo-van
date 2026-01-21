import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOLO VAN - Travellers Only",
  description: "Premium camper van rental for real travelers. Noleggio camper per veri viaggiatori.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
