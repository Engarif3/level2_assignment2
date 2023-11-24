{
  interface Product {
    name: string;
    price: number;
    quantity: number;
  }

  const cart: Product[] = [
    { name: 'Item1', price: 10, quantity: 2 },
    { name: 'Item2', price: 15, quantity: 1 },
    { name: 'Item3', price: 5, quantity: 3 },
  ];

  const totalCost = (cart: Product[]): number => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  };

  totalCost(cart);
}
