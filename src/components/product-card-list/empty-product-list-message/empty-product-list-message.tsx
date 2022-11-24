
function EmptyProductListMessage() {
  return (
    <div className="container empty-product-list-message" data-testid="empty-product-list-message">
      <h1 className="title title--h3">
        По вашему запросу ничего не найдено
      </h1>
    </div>
  );
}

export default EmptyProductListMessage;
