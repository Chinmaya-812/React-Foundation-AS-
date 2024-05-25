import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../config";
import Shimmer from "./Shimmer";
import useResturant from "../utils/useResturant";
import { addItem, clearCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

import { notify } from "./AlertTost";
import { ToastContainer } from "react-toastify";



const ResturantMenu = () => {
  const params = useParams();
  // const{id}=useParams();  Meaing of this and next line is same
  const { id } = params;
  // console.log(id);

  //Here useResturant is custom Hooks. Custom Hooks is nothing but  a javascript function at the end
  //They allow you to extract component logic into a separate function that can be used across different components.

  const resturantInfo = useResturant(id);
  // console.log(resturantInfo);
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(addItem("Grapes"));
  };

  const clearCartItem = () => {
    alert("Your cart has been cleared");
    dispatch(clearCart());
  };

  const addFooditem = (item) => {
    dispatch(addItem(item));
  };

  

  return resturantInfo.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="grid grid-flow-col ml-3">
      <div className="mt-3">
        <h1 className="font-bold text-4xl my-2">Resturant id :{id} </h1>
        <h2 className="text-2xl text-gray-600 my-4">
          {resturantInfo?.data?.cards[2]?.card?.card?.info.name}
        </h2>
        <img
          src={`${IMG_CDN_URL}/${resturantInfo?.data?.cards[2]?.card?.card?.info.cloudinaryImageId}`}
          width={"300px"}
        />
        <h3 className="mt-2 text-3xl text-gray-600">
          {resturantInfo?.data?.cards[2]?.card?.card?.info.city}
        </h3>
        <h3 className="mt-2 text-2xl text-gray-600">
          {resturantInfo?.data?.cards[2]?.card?.card?.info.areaName}
        </h3>
        <h3 className="mt-2 text-xl text-gray-600">
          {resturantInfo?.data?.cards[2]?.card?.card?.info.avgRating}
        </h3>
        <h3 className="mt-2">
          {resturantInfo?.data?.cards[2]?.card?.card?.info.costForTwoMessage}
        </h3>

        <div>
          <button
            className="rounded-lg border-2 border-solid border-black p-3 ml-4 bg-purple-400"
            onClick={() => {
              handleAddItem();
            }}
          >
            Add Item
          </button>

          <button
            className="rounded-lg border-2 border-solid border-black p-3 ml-4 bg-purple-400"
            onClick={() => {
              clearCartItem();
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>

      

      <div className="p-6">
        <h1>Menu</h1>
        <ul>
          {(resturantInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
            .slice(
              2,
              resturantInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
                ?.cards.length / 2
            )
            .map(function (j, v) {
              return (
                <div
                  className="border-2 border-solid border-black m-2 p-2"
                  key={v}
                >
                  <h3 className="text-xl font-bold">{j.card.card.title}</h3>
                  <button className="p-2 rounded-md bg-pink-300 cursor-pointer">
                    Show
                  </button>
                  <ul>
                    {(j.card.card.itemCards === undefined
                      ? j.card.card.categories[0].itemCards
                      : j.card.card.itemCards
                    ).map(function (i) {
                      return (
                        <li className="m-2" key={i.card.info.id}>
                          {i.card.info.name} -{" "}
                          <button
                            className="p-1 bg-green-100"
                            onClick={() => {
                              console.log(i.card.info);
                              dispatch(addItem(i.card.info));
                              notify()
                            }}
                          >
                            Add
                          </button>
                          <ToastContainer  />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ResturantMenu;

