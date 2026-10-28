// One cart per user id, shared across the server.
const globalForCarts = globalThis;

if (!globalForCarts.__carts) {
  globalForCarts.__carts = new Map();
}

const carts = globalForCarts.__carts;

export function getCart(userId) {
  return carts.get(userId) ?? [];
}

export function addLine(userId, dish) {
  const cart = getCart(userId);
  const exists = cart.some((line) => line.id === dish.id);

  const next = exists
    ? cart.map((line) =>
        line.id === dish.id ? { ...line, quantity: line.quantity + 1 } : line
      )
    : [
        ...cart,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          quantity: 1,
        },
      ];

  carts.set(userId, next);
}

export function decreaseLine(userId, dishId) {
  const next = getCart(userId)
    .map((line) =>
      line.id === dishId ? { ...line, quantity: line.quantity - 1 } : line
    )
    .filter((line) => line.quantity > 0);

  carts.set(userId, next);
}

export function removeLine(userId, dishId) {
  carts.set(
    userId,
    getCart(userId).filter((line) => line.id !== dishId)
  );
}

export function clearCart(userId) {
  carts.delete(userId);
}

export function cartTotal(cart) {
  return cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
}