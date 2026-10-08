"use client";

import { useActionState } from "react";
import { cancelOrder } from "../actions";

export default function CancelOrderForm({ orderId }) {
  const [state, formAction, pending] = useActionState(cancelOrder, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="orderId" value={orderId} />
      <button type="submit" className="btn btn-outline" disabled={pending}>
        {pending ? "Cancelling..." : "Cancel order"}
      </button>
      {state && !state.ok && <p className="error">{state.message}</p>}
    </form>
  );
}
