import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href="/menu">Go to menu </Link>
      <Link href="/checkout">Go to CheckOut</Link>
      <h1>Cart</h1>
    </div>
  );
};

export default page;
