import { IMG_CDN_URL } from "../config"
// import "../../index.css"
import { useContext } from "react";
import UserContext from "../utils/UserContext";


const ResturantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  avgRatingString,
}) => { 

  const {user}=useContext(UserContext);
  return (
    <>
      <div className="w-[250px] h-[400px] p-3 m-3 shadow-lg rounded-md bg-pink-50 ">
        <img src={`${IMG_CDN_URL}/${cloudinaryImageId}`} alt="" className="w-full h-1/2 rounded-lg transition-transform duration-300 transform hover:scale-[1.15]" />
        <h2 className="font-bold text-xl pt-4">{name}</h2>
        <h3 className="text-base pt-2">{cuisines.join(", ")}</h3>
        <h4 className="text-lg">{avgRatingString} ⭐️</h4>
        <h6 className="text-sm text-red-400"> {user.name}</h6>
        <h6 className="text-sm text-red-400"> {user.Email}</h6>
      </div>
    </>
  );
};

export default ResturantCard; 
