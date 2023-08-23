import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";

import emptyCartImage from "../assets/emptyCart.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItems = useSelector((state) => state.product.cartItem);
  // console.log(productCartItems);

  // to get user data for validation
  // see from redux the fields passed
  const user = useSelector((state) => state.user);
  // console.log(user);

  const navigate = useNavigate();

  const totalPrice = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      // in above public key is passed from stripe
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productCartItems),
        }
      );
      // if error code = 500 -> server error
      if (res.statusCode === 500) return;
      const data = await res.json();
      console.log(data);
      // console.log("Payment Button clicked!")
      // if no error -> redirect to payment
      toast("Redirected to payment gateway...");
      stripePromise.redirectToCheckout({ sessionId: data });
      // session id will be obtained directly as sent from backend
    } else {
      toast("User not Logged-In!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {
          // if there is any single element present then only display
          productCartItems[0] ? (
            <div className="my-4 flex gap-3">
              {/* Display cart items */}
              <div className="w-full max-w-3xl">
                {productCartItems.map((el) => {
                  return (
                    <CartProduct
                      key={el._id}
                      id={el._id}
                      name={el.name}
                      image={el.image}
                      category={el.category}
                      price={el.price}
                      qty={el.qty}
                      total={el.total}
                    />
                  );
                })}
              </div>
              {/* Total cart items and summary added */}
              <div className="w-full max-w-md ml-auto">
                <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
                <div className="flex w-full py-2 text-lg border-b">
                  <p>Total Qty:</p>
                  <p className="ml-auto w-32 font-bold">{totalQty}</p>
                </div>
                <div className="flex w-full py-2 text-lg border-b">
                  <p>Total Price:</p>
                  <p className="ml-auto w-32 font-bold">
                    <span className="text-red-500">₹</span>
                    {totalPrice}
                  </p>
                </div>
                {/* payment integration through stripe */}
                <button
                  className="bg-red-500 w-full text-lg font-bold py-2 text-white "
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex w-full justify-center items-center flex-col">
                <img src={emptyCartImage} alt="" className="w-full max-w-sm" />
                <p className="text-slate-500 text-3xl font-bold">
                  Cart is Empty
                </p>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};

export default Cart;
