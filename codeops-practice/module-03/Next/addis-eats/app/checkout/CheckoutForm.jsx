"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";

const initialState = { ok: null, message: "", fieldErrors: {}, values: {} };

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const values = state.values ?? {};
  const error = (name) => state.fieldErrors?.[name]?.[0];

  return (
    <form action={formAction} className="form" noValidate>
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" defaultValue={values.name ?? ""} />
        {error("name") && <p className="error">{error("name")}</p>}
      </div>

      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          placeholder="0911223344"
          defaultValue={values.phone ?? ""}
        />
        {error("phone") && <p className="error">{error("phone")}</p>}
      </div>

      <div className="field">
        <label htmlFor="address">Delivery address</label>
        <input
          id="address"
          name="address"
          defaultValue={values.address ?? ""}
        />
        {error("address") && <p className="error">{error("address")}</p>}
      </div>

      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Placing order..." : "Place order"}
      </button>

      <p
        className={state.ok ? "notice" : "error"}
        role="status"
        aria-live="polite"
      >
        {state.message}
      </p>
    </form>
  );
}
