"use client";

import { useActionState } from "react";
import { formFields } from "@/lib/schema";
import { placeOrder } from "../actions";
import { NEIGHBOURHOODS } from "@/lib/neighbourhoods";

const labels = {
  name: "Full name",
  phone: "Phone number",
  address: "Delivery address",
};

const placeholders = {
  name: "Abebe Kebede",
  phone: "0911223344",
  address: "Bole Road, Addis Ababa",
};

const initialState = { success: false, fieldErrors: {}, values: {} };

const CheckoutForm = () => {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);

  return (
    <form
      action={formAction}
      noValidate
      className="w-full max-w-md bg-gray-800 p-6 rounded-lg space-y-4"
    >
      {formFields.map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block mb-1 text-sm text-gray-300">
            {labels[field]}
          </label>
          <input
            id={field}
            name={field}
            type="text"
            defaultValue={state.values?.[field] ?? ""}
            placeholder={placeholders[field]}
            className={`w-full px-3 py-2 rounded bg-gray-900 text-white border outline-none focus:border-blue-500 ${
              state.fieldErrors?.[field] ? "border-red-500" : "border-gray-600"
            }`}
          />
          {state.fieldErrors?.[field]?.[0] && (
            <p className="mt-1 text-sm text-red-400">
              {state.fieldErrors[field][0]}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={pending}
        className="w-full px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {pending ? "Placing order..." : "Place order"}
      </button>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      {state.success && (
        <p className="text-sm text-green-400">{state.message}</p>
      )}
      <div>
        <label
          htmlFor="neighbourhood"
          className="block mb-1 text-sm text-gray-300"
        >
          Neighbourhood
        </label>
        <select
          id="neighbourhood"
          name="neighbourhood"
          defaultValue=""
          className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-600"
        >
          <option value="" disabled>
            Choose...
          </option>
          {NEIGHBOURHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {state.fieldErrors?.neighbourhood?.[0] && (
          <p className="mt-1 text-sm text-red-400">
            {state.fieldErrors.neighbourhood[0]}
          </p>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
