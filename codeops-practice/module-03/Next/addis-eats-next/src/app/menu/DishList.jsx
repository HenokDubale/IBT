import DishCard from "./DishCard";

const DishList = ({ dishes }) => {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {dishes.map((dish, index) => (
        <DishCard key={dish.id} dish={dish} priority={index === 0} />
      ))}
    </ul>
  );
};

export default DishList;
