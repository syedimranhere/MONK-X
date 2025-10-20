
import "./globals.css";
import SessionWrapper from "./sessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      {/* we need to add wrapper */}
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
