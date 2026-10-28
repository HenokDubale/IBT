import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getCart, cartTotal } from "@/lib/carts";
import { addToCart, decreaseCartItem, removeCartItem } from "@/app/actions";

export const metadata = {
  title: "Your cart",
  description: "Review the dishes in your cart before checkout.",
  robots: { index: false },
};

const Cart = async () => {
  const session = await getSession();
  if (!session) redirect("/signin?next=/cart");

  const cart = getCart(session.id);
  const total = cartTotal(cart);

  return (
    <div className="w-full px-6">
      <h1 className="text-blue-500 text-5xl mb-4">Your cart</h1>

      {cart.length === 0 ? (
        <div>
          <p className="mb-4">Your cart is empty.</p>
          <Link href="/menu" className="underline">
            Browse the menu
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-3 max-w-2xl">
            {cart.map((line) => (
              <li
                key={line.id}
                className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg"
              >
                <Image
                  src={line.image}
                  alt={line.name}
                  width={96}
                  height={72}
                  className="w-24 h-18 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="font-bold">{line.name}</p>
                  <p className="text-sm text-gray-400">
                    {line.price} birr each
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <form action={decreaseCartItem.bind(null, line.id)}>
                    <button
                      type="submit"
                      className="px-2 py-1 bg-gray-700 text-white"
                    >
                      -
                    </button>
                  </form>
                  <span className="w-6 text-center">{line.quantity}</span>
                  <form action={addToCart.bind(null, line.id)}>
                    <button
                      type="submit"
                      className="px-2 py-1 bg-gray-700 text-white"
                    >
                      +
                    </button>
                  </form>
                </div>

                <p className="w-24 text-right font-bold">
                  {line.price * line.quantity} birr
                </p>

                <form action={removeCartItem.bind(null, line.id)}>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-red-600 text-white text-sm"
                  >
                    Remove
                  </button>
                </form>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-2xl font-bold">Total: {total} birr</p>

          <div className="mt-4 flex gap-4">
            <Link
              href="/checkout"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Proceed to checkout
            </Link>
            <Link href="/menu" className="px-4 py-2 underline">
              Keep shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
