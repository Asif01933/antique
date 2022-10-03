import Link from 'next/link';
import React, { useState } from 'react';
import PopModal from './PopModal';

export default function ProductItem({ product }) {
  const [toggle, setToggle] = useState(false);
  /*const UpdateHandler = () => {
    return <PopModal product={product} key={product.slug} />;
  };*/
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a className="h-200">
          <img
            src={product.image}
            alt={product.name}
            className="h-[250px] w-full rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p>BDT: {product.price}</p>
        <label
          onClick={() => setToggle(!toggle)}
          htmlFor="my-modal-3"
          className="btn modal-button"
        >
          Quick View
        </label>
        {toggle && <PopModal product={product} key={product.slug} />}
      </div>
    </div>
  );
}
