import "./globals.css";

export const metadata = {
  title: "John — Reality Bending Engineer",
  description: "A portfolio that behaves like a living system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className="
          bg-black
          text-white
          overflow-x-hidden
          antialiased
          selection:bg-white/20
          selection:text-white
        "
      >
        {children}
      </body>
    </html>
  );
}
