import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress } = cart;

  const totalPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
  const router = useRouter();
  useEffect(() => {
    if (!shippingAddress) {
      router.push('/');
    }
  }, [shippingAddress, router]);

  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    setLoading(true);
    const { data } = await axios.post('/api/orders', {
      orderItems: cartItems,
      shippingAddress,
      totalPrice,
    });
    setLoading(false);
    dispatch({ type: 'CART_CLEAR_ITEMS' });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        cartItems: [],
      })
    );
    router.push(`/order/${data._id}`);
  };
  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={1} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                <ol>
                  <li>
                    <spane className="font-bold">FullName: </spane>
                    {shippingAddress.fullName}
                  </li>
                  <li>
                    <spane className="font-bold">Email:</spane>{' '}
                    {shippingAddress.email}
                  </li>
                  <li>
                    <spane className="font-bold">Address:</spane>{' '}
                    {shippingAddress.address}
                  </li>
                  <li>
                    <spane className="font-bold">Phone:</spane>{' '}
                    {shippingAddress.phone}
                  </li>
                </ol>
              </div>
              <div>
                <Link href="/shipping">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Summery</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total:</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="primary-button w-full"
                >
                  {loading ? 'loading...' : 'Place Order'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}
