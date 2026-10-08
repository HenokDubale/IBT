import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian Food Delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <header className="site-header">
            <Link href="/" className="brand">
              Addis Eats
            </Link>
            <nav>
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
            </nav>
          </header>

          <main className="site-main">{children}</main>

          <footer className="site-footer">
            <p>© Addis Eats</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
