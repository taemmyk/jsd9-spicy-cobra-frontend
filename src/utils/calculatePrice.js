export const calculateSalePrice = (product) => {
  return Math.floor(
    parseInt(product.price) *
      ((100 - parseInt(product.discountPercentage)) / 100)
  );
};

export const calculateItemTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

export const calculateOrderTotalPrice = (items) => {
  return items.reduce((total, item) => total + calculateSalePrice(item), 0);
};
