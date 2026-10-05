import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian Food Delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">Addis Eats</Link>
          <nav>
            <Link href="/menu">Menu</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>© Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}
