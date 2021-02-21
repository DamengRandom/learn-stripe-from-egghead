import { useCart } from "../hooks/use-cart";

export default function Carts() {
  const { cartItems, checkout } = useCart();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Price</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ id, pricePerItem, quantity }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{pricePerItem}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={checkout}>Checkout ~~</button>
    </div>
  );
}