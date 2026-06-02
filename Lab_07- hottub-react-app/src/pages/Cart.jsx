import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-lg shadow-xl p-12 max-w-lg mx-auto">
          <ShoppingBag className="mx-auto text-gray-300 w-24 h-24 mb-6" />
          <h2 className="text-3xl font-bold mb-4 uppercase">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 uppercase text-sm">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/category" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded font-bold transition-all uppercase inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 border-b-2 border-red-600 pb-2 uppercase">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold border-b">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {cartItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded bg-gray-50" />
                        <span className="font-bold text-sm uppercase text-gray-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                        >-</button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                        >+</button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-extrabold text-red-600">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-between">
            <Link to="/category" className="text-red-600 font-bold flex items-center gap-2 hover:underline uppercase text-sm">
              &larr; Continue Shopping
            </Link>
            <button 
              onClick={clearCart}
              className="text-gray-500 hover:text-red-600 font-bold uppercase text-xs"
            >
              Clear Shopping Cart
            </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded shadow-lg p-6 sticky top-24 border-t-4 border-red-600">
            <h2 className="text-xl font-bold mb-6 uppercase border-b pb-4">Order Summary</h2>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">Subtotal</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase">Shipping</span>
                <span className="text-green-600 font-bold uppercase">Free</span>
              </div>
              <div className="flex justify-between pt-4 border-t text-lg font-extrabold">
                <span className="uppercase">Grand Total</span>
                <span className="text-red-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded font-bold transition-all uppercase flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
