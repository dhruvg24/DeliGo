import React from "react";
import { Link } from "react-router-dom";
import { addCartItem} from "../redux/productSlice";
import { useDispatch } from "react-redux";
const CardFeature = ({ image, name, price, category, loading , id}) => {
   //the id comes from Home props
    const dispatch = useDispatch()
    const handleAddCartProduct = (e)=>{
      // for clicking add cart button
      // e.stopPropagation()
      // this was needed coz whenever add to cart button the product appeared on top 
      // this was bubble 
      // need to stop 
      dispatch(addCartItem({
        _id:id,
        name:name,
        price:price,
        category: category,
        image:image
      }))
      // alert("hi")
    }
    return (
    <div className="w-ful min-w-[200px] max-w-[200px] bg-white hover:drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col justify-center ">
      {image ? (
        <>
        {/* add the link */}
        <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:0, scroll:"smooth"})}>
            {/* whichever image clicked gets linked */}
          <div className=" h-28 flex flex-col items-center">
            <img src={image} className="h-full" />
          </div>
          <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
            {/* whitespace-nowrap will allow to restrict the text */}
            {name}
          </h3>
          <p className=" text-slate-500 font-md">{category}</p>
          <p className="font-bold">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>
          </Link>
          {/* add to cart button */}
          <button className="bg-yellow-500 hover:bg-yellow-600 py-1 mt-2 rounded w-full" onClick={handleAddCartProduct}>
            Add to Cart
          </button>
          
        </>
      ) : (
       <div className="min-h-[150px] flex justify-center items-center">
         <p>{loading}</p>
       </div>
      )}
    </div>
    
  );
};

export default CardFeature;
