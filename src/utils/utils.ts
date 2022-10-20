export const getPriceWitchSpaces = (price: number) => {
  if (price) {
    return (
      (price.toString()).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    );
  }
};
