import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h2 className="text-3xl">This dish does not exist</h2>
      <Link href="/menu">Back to menu</Link>
    </div>
  );
};

export default NotFound;
