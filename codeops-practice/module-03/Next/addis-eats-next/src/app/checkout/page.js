import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getCart, cartTotal } from "@/lib/carts";
import CheckoutForm from "./CheckoutForm";

// Forced dynamic because checkout reads the signed-in user's cart, which is
// found through the session cookie. Cookies only exist at request time,
// so this page cannot be pre-built.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout",
  description: "Enter your delivery details and place your order.",
  robots: { index: false },
};

const Checkout = async () => {
  const session = await getSession();
  if (!session) redirect("/signin?next=/checkout");

  const cart = getCart(session.id);

  if (cart.length === 0) {
    return (
      <div className="w-full px-6">
        <h1 className="text-blue-500 text-5xl mb-4">Checkout</h1>
        <p className="mb-4">
          Your cart is empty, so there is nothing to order.
        </p>
        <Link href="/menu" className="underline">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-6">
      <h1 className="text-blue-500 text-5xl mb-4">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold mb-3">Order summary</h2>
          <ul className="space-y-2">
            {cart.map((line) => (
              <li key={line.id} className="flex items-center gap-3">
                <Image
                  src={line.image}
                  alt={line.name}
                  width={64}
                  height={48}
                  className="w-16 h-12 object-cover rounded"
                />
                <span className="flex-1">
                  {line.quantity} x {line.name}
                </span>
                <span>{line.price * line.quantity} birr</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xl font-bold">
            Total: {cartTotal(cart)} birr
          </p>
          <Link href="/cart" className="inline-block mt-3 underline">
            Edit cart
          </Link>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
};

export default Checkout;
