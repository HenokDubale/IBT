import Link from "next/link";
import AuthLinks from "./AuthLinks";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-20 px-8 bg-slate-600 text-white">
      <Link href="/" className="text-xl font-bold">
        Header Logo
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
        <AuthLinks />
      </nav>
    </header>
  );
};

export default Header;
