import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishes, getDish } from "../data";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) return { title: "Dish not found" };

  const title = `${dish.name}, ${dish.price} birr`;
  const description = dish.description;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

const PageDetails = async ({ params }) => {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: `${SITE_URL}${dish.image}`,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <div className="w-full px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Link href="/menu" className="inline-block mb-4">
        Back to menu
      </Link>

      <div className="grid gap-6 md:grid-cols-2">
        <Image
          src={dish.image}
          alt={dish.name}
          width={800}
          height={520}
          sizes="(max-width: 768px) 100vw, 600px"
          className="w-full rounded-lg object-cover"
        />

        <div>
          <h1 className="text-blue-500 text-4xl">{dish.name}</h1>
          <p className="text-gray-400 mb-3">{dish.nameAm}</p>

          <p className="text-2xl mb-3">{dish.price} birr</p>
          <p className="mb-3">{dish.description}</p>

          <p>Category: {dish.category}</p>
          <p>Spice: {dish.spiceLevel}</p>
          <p>{dish.servings}</p>
          <p>
            {dish.isFasting ? "Fasting friendly" : "Contains animal products"}
          </p>
          {dish.isSpecial && (
            <p className="text-yellow-400">Chef&apos;s special</p>
          )}

          <h2 className="mt-4 mb-1 font-bold">Ingredients</h2>
          <ul className="list-disc pl-5">
            {dish.ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageDetails;
