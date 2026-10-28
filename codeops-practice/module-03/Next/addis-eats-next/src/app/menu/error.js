"use client";

const Error = ({ error, reset }) => {
  return (
    <div>
      <h2 className="text-red-500 text-3xl">Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
