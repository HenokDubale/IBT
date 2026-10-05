import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Addis Eats</h1>
      <Link href="/menu">Go to Menu</Link>
      <Link href="/cart">Go to Cart</Link>
      <Link href="/checkout">Go to CheckOut</Link>
    </div>
  );
}
