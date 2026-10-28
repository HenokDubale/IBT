import Link from "next/link";

// Story and address never change between builds, so this page is static.
// This line is optional. It makes the intent explicit and fails the build
// if someone later adds cookies() or headers() here.
export const dynamic = "force-static";

export const metadata = {
  title: "Addis Eats | Home",
  description: "Home-style Ethiopian food in Addis Ababa.",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-8 my-15 ">
      <h1 className="text-4xl font-bold">Addis Eats</h1>
      <p className="mt-2 text-lg text-gray-600">
        Ethiopian home cooking, made fresh every day.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Our story</h2>
        <p className="mt-2 leading-relaxed">
          Addis Eats started in a family kitchen in Addis Ababa, where Sunday
          meals meant injera, slow-cooked wot and coffee poured from a jebena.
          We wanted to share that same table with everyone in the city: honest
          ingredients, recipes passed down by hand, and food served the way it
          is meant to be eaten, together.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Find us</h2>
        <address className="mt-2 not-italic leading-relaxed">
          Addis Eats
          <br />
          Bole Road, near Edna Mall
          <br />
          Addis Ababa, Ethiopia
          <br />
          Open daily, 8:00 AM to 10:00 PM
        </address>
      </section>

      <Link
        href="/menu"
        className="mt-8 inline-block rounded bg-black px-5 py-3 text-white"
      >
        See the menu
      </Link>
    </main>
  );
}
