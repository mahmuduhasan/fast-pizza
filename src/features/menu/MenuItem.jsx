import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, deleteItem, getQuantity } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const cartPizzas = useSelector((state) => state.cart.cart);
  const isAlreadyExist = cartPizzas.filter((item) => item.pizzaId === id);
  const isPizzaExist = isAlreadyExist.length > 0;
  const quantity = useSelector(getQuantity(id));
  function handleAddPizza() {
    const addablePizza = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(addablePizza));
  }

  function handleDeletePizza() {
    dispatch(deleteItem(id));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font=medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className=" mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <div className="flex items-center gap-3 sm:gap-8">
              {isPizzaExist && (
                <UpdateItemQuantity pizzaId={id} quantity={quantity} />
              )}
              <Button
                type="small"
                onClick={isPizzaExist ? handleDeletePizza : handleAddPizza}
              >
                {isPizzaExist ? "Delete" : "Add to cart"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
