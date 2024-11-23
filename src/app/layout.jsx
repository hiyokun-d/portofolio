import "./globals.css";

export const metadata = {
  title: "Hiyo Kingdom",
  description: "a kingdom where we make everyone happy and learn something",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
