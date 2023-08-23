import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);

  const categoryList = [...new Set(productData.map((el) => el.category))];
  // console.log(categoryList)

  // all the data filtered will be stored in dataFilter
  const [filterBy, setFilterBy] = useState("")

  const [dataFilter, setDataFilter] = useState([]);
  // initally all data is to be displayed
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);
  // whenever productData changed it useEffect will be caled

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayCardFeature = new Array(10).fill(null);
  return (
    
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">
        {heading}
        {/* heading is passed as props */}
      </h2>

      {/* filter the product */}
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {/* available in filterProduct.js component */}

        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key = {el}
                isActive = {el.toLowerCase() === filterBy.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingArrayCardFeature.map((el, index) => (
              <CardFeature loading="Loading..." key = {index+"allProduct"}/>
              // to make unique key
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
