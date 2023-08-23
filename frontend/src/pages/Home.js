import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";

import {GrPrevious,GrNext} from "react-icons/gr"
import FilterProduct from "../components/FilterProduct";
import AllProduct from "../components/AllProduct";
// import {CiForkAndKnife} from "react-icons/ci"

const Home = () => {
  // get the data
  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);
  const homeProductCartList = productData.slice(1, 5);
  // here we display only 4 products

  // for filtering out product with some category
  const homeProductCartListVegetables = productData.filter ((el)=>el.category==="vegetable", [])
  // console.log(homeProductCartListVegetables)

  // for temporaray loading
  const loadingArray=new Array(4).fill(null)

  const loadingArrayCardFeature = new Array(10).fill(null)

  // for slider in home page
  const slideProductRef = useRef()
  // since sliding will move forward or backward
  // need to target the container
  const nextProduct = ()=>{
    slideProductRef.current.scrollLeft += 200
  }
  const prevProduct = ()=>{
    slideProductRef.current.scrollLeft -= 200
  }

  const categoryList = [...new Set(productData.map(el=>
    el.category
  ))]
  // console.log(categoryList)


  // filter data display
// done in AllProduct.js
  
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          {/* w-1/2 will set the width to 50% of the whole page */}
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-9">Bike Delivery</p>
            {/* may change this GIF */}
            <img
              src="https://media4.giphy.com/media/FtPTWPMgMiXwyMlSJd/200.webp?cid=ecf05e47efnewy3yzqs575x9vunfj8e6zv2tpin3jb0v6ivs&ep=v1_gifs_search&rid=200.webp&ct=g"
              alt=""
              className="h-6"
            />
          </div>
          <h2 className="text-4xl font-bold md:text-7xl py-3">
            The Fastest Delivery at{" "}
            <span className="text-red-600 text-">Your Home</span>
          </h2>
          <p className="py-3 text-base">
          Welcome to DeliGo, your one-stop destination for convenient food delivery! With DeliGo, ordering your favorite meals from local restaurants has never been easier. Browse through a diverse selection of delectable dishes, from scrumptious burgers to exotic cuisines, all available at your fingertips.
<br />
Experience seamless and fast food delivery right to your doorstep. Our user-friendly interface ensures a hassle-free ordering process, allowing you to track your delivery in real-time and stay updated on every step of the way.
<br />
Say goodbye to long queues and busy kitchens - sit back, relax, and let DeliGo bring the culinary delights to you.
<br />
DeliGo is not just a delivery service; it's a culinary adventure that connects food enthusiasts with their favorite eateries.
<br />
Join the DeliGo community today and indulge in a world of convenience, taste, and foodie happiness. Let us take care of your cravings while you enjoy the ultimate food delivery experience.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {/* for images */}
          {/* using map we can get 4 product listed here */}
          {
            // we have added arr[0] element so that even if one item avail display that
            homeProductCartList[0] ? 
              homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id = {el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                  // these are passed as props
                );
              })
              :
              loadingArray.map((el, index)=>{
                return(
                  <HomeCard
                    key = {index+"loading"}
                    loading = {"Loading..."}
                  />
                )
              })
          }
        </div>
      </div>

      {/* slider created */}
      <div className="">
        <div className="flex w-full items-center">
        <h2 className="font-bold text-2xl text-slate-800 mb-4">
          Fresh Vegetables
        </h2>
        <div className="ml-auto flex gap-4">
          <button className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded" onClick={prevProduct}><GrPrevious /></button>
          <button className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded" onClick={nextProduct}><GrNext /></button>
        </div>
        </div>
        <div className="flex gap-5 overflow-scroll scrollbar-none smooth-scroll transition-all" ref={slideProductRef}>
          {/* card feature */}
          {
            homeProductCartListVegetables[0] ? 
            homeProductCartListVegetables.map(el=>{
              return(
                <CardFeature 
                key = {el._id + "vegetable"}
                id = {el._id}
                name = {el.name}
                category = {el.category }
                price= {el.price}
                image = {el.image}
                />
              )
            })
            :
            // laoding is shown
            loadingArrayCardFeature.map((el, index) => (
              <CardFeature
              loading = "Loading..." key = {index+"cartLoading"}
             />
            ))
            
          }
          
        </div>
      </div>

      {/* THE PART FOR PRODUCTS IS PRESENT IN AllProduct.js */}
        <AllProduct heading={"Your Products"}/>


    </div>
  );
};

export default Home;
