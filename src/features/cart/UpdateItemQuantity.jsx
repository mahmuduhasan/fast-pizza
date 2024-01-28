import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();
  function handleIncreaseQuantity() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleDecreaseQuantity() {
    dispatch(decreaseItemQuantity(pizzaId));
  }
  return (
    <div className="flex items-center gap-2">
      <Button type="round" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <p className="text-1xl font-semibold">{quantity}</p>
      <Button type="round" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
