function PopModal({ product }) {
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <img
            src={product.image}
            alt={product.name}
            className="h-[250px] w-full rounded shadow"
          />
          <h3 className="text-lg font-bold">Product Name: {product.name} </h3>
          <h3 className="text-lg font-bold">Brand:{product.brand}</h3>
          <h3 className="text-lg font-bold">Price(BDT):{product.price}</h3>
          <h3 className="text-lg font-bold">
            Description: {product.description}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default PopModal;
