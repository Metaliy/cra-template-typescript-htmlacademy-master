export const getPriceWitchSpaces = (price: number) => {
  if(price === 0) {
    return 0;
  }
  if (price) {
    return (
      (price.toString()).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    );
  }
};
