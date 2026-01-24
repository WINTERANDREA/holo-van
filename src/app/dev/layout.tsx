import "../globals.css";

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-archivo antialiased bg-holo-offwhite text-holo-charcoal">
        {children}
      </body>
    </html>
  );
}
