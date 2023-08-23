import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {

  // const params = useParams()
  // console.log(params.filterBy)
  const { filterBy } = useParams();
  // // const productData = useSelector()
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData)
  const navigate = useNavigate()
  const productDisplay = productData.filter((el) => el._id === filterBy)[0];
  // console.log(productDisplay);

  const dispatch = useDispatch()
  const handleAddCartProduct = (e)=>{
    
    dispatch(addCartItem(productDisplay))
    // alert("hi")
  }

  const handleBuy = ()=>{
    dispatch(addCartItem(productDisplay))
    // redirect to cart page
    navigate("/cart")
  }
  return (

    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl bg-white  m-auto md:flex">
        <div className="max-w-sm  overflow-hidden w-full p-5">
          <img src={productDisplay.image} className="hover:scale-105 transition-all h-full"/>
        </div>
        <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 font-medium text-2xl">{productDisplay.category}</p>
          <p className=" md:text-2xl font-bold">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3">
          <button className="bg-yellow-500 py-1 mt-2 p-2 max-w-[100px] hover:bg-yellow-600 rounded" onClick={handleBuy}>
            Buy
          </button>
          <button className="bg-yellow-500 py-1 mt-2 max-w-[100px] p-2 hover:bg-yellow-600 rounded" onClick={handleAddCartProduct}>
            Add to Cart
          </button>
          </div>
          
          <div className="text-slate-600 font-medium">
            <p>Description : </p>
            <p>{productDisplay.description}</p>
          </div>
        </div>

      </div>
      
      <AllProduct heading={"Related Products"}/>
    </div>
  );
};

export default Menu;
