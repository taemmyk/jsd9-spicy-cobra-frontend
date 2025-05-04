const calculateSalePrice = (product) => Math.floor(
    parseInt(product.price) *
      ((100 - parseInt(product.discount_percentage)) / 100)
  );

  export default calculateSalePrice;