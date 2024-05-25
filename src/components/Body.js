import { useContext, useEffect, useState } from "react";
import { resturantList } from "../constant";
import ResturantCard from "./ResturantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import { filterData } from "../utils/useFilterResturant";
import useOnline from "../utils/useOnline"; 
import useAllResturant from "../utils/useAllResturant";

import UserContext from "../utils/UserContext";

const Body = () => {
  const [allrestruants, FilterRest] = useAllResturant();
  const [filterrestruants, setFilterRestruants] = useState([]);
  const [search, setSearch] = useState("");
  const {user,setUser}=useContext(UserContext)

  console.log("JS");
  console.log(allrestruants);
  console.log(FilterRest);

  //early return { when we dont have anything on allresturuamts dont render anything}
  if (!allrestruants) return null;

  //Conditioanl Rendering
  //if resturant is empty => Shimmer UI
  //if resturant have data => actual data UI
  return allrestruants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search p-2 bg-pink-200 my-2 flex flex-row">
        <div className="w-1/4 ">
          <input
            type="text"
            className="rounded-xl p-3 w-full"
            placeholder="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

        </div>
        <button
          className="p-3 bg-purple-700 mx-2 rounded-md text-white transition duration-150 hover:bg-gray-400"
          onClick={() => {
            //need to filter the data
            //update the state - i.e filterresturants variable
            const data = filterData(search, allrestruants);
            setFilterRestruants(data);
            // console.log(data)
          }}
        >
          Search
        </button>
        <input type="text" value={user.name} className="rounded-xl p-3 w-full m-5" onChange={(e)=>{
          setUser({
            ...user,
            name:e.target.value
          })
        }}/>
        <input type="text" value={user.Email} className="rounded-xl p-3 w-full m-5" onChange={(e)=>{
          setUser({
            ...user,
            Email:e.target.value
          })
        }}/>
        {/* {console.log(allrestruants)} */}
      </div>

      <div className="Slider">

      </div>
      
      <div className="flex flex-wrap py-[11px] px-28">
        {(filterrestruants?.length === 0 ? FilterRest : filterrestruants).map(
          function (i) {
            return (
              <Link
                to={`/resturant/${i.info.id}`}
                key={i.info.id}
                className="myLink"
              >
                <ResturantCard key={i.info.id} {...i.info} />
              </Link>
            );
          }
        )}
      </div>
    </>
  );
};
export default Body;
