const calculateSalePrice = (product) =>
  Math.floor(
    parseInt(product.price) *
      ((100 - parseInt(product.discountPercentage)) / 100)
  );

export default calculateSalePrice;
