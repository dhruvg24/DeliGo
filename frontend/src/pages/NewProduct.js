import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    // in order to avoid empty cells while filling form make it mandatory to select all req fields
    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      // convert the data coming from server side in json form
      const fetchRes = await fetchData.json();

      console.log(fetchRes);

      toast(fetchRes.message);

      // after uploading all the fields must become blank
      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Enter required field(s)!");
    }
  };
  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data)
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white rounded"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={"other"}>Select Category</option>
          <option value={"fruit"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icecream"}>Icecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"paneer"}>Paneer</option>
          <option value = {"non-veg"}>Non-Veg</option>
        </select>

        {/* upload images */}
        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              id="image"
              accept="image/*"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
          value={data.description}
        ></textarea>

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
