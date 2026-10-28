import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

const DishCard = ({ dish, priority = false }) => {
  const {
    id,
    name,
    nameAm,
    category,
    price,
    image,
    spiceLevel,
    isFasting,
    isSpecial,
    description,
  } = dish;

  return (
    <li className="flex flex-col bg-gray-800 rounded-lg overflow-hidden">
      <Link href={`/menu/${id}`} className="block flex-1">
        <Image
          src={image}
          alt={name}
          width={400}
          height={260}
          sizes="(max-width: 768px) 100vw, 400px"
          priority={priority}
          className="w-full h-40 object-cover"
        />

        <div className="p-3">
          <div className="flex flex-wrap gap-1 mb-2">
            {spiceLevel && (
              <span className="px-2 py-0.5 text-xs rounded bg-red-900 text-red-200">
                {spiceLevel}
              </span>
            )}
            {isFasting && (
              <span className="px-2 py-0.5 text-xs rounded bg-green-900 text-green-200">
                Fasting-friendly
              </span>
            )}
            {isSpecial && (
              <span className="px-2 py-0.5 text-xs rounded bg-yellow-500 text-black">
                Chef&apos;s Special
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold">{name}</h3>
          <h4 className="text-sm text-gray-400">{nameAm}</h4>
          <p className="mt-1 text-xs uppercase tracking-wide text-blue-300">
            {category}
          </p>
          <p className="mt-2 text-sm text-gray-300 line-clamp-3">
            {description}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between p-3 border-t border-gray-700">
        <span className="font-bold">{price} birr</span>
        <AddToCartButton dishId={id} />
      </div>
    </li>
  );
};

export default DishCard;
