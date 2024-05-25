import { useEffect,useState } from "react";
import { FETCH_RES_INFO_URL } from "../config";
const useResturant = (id) => {
  const [resturantInfo, setResturantInfo] = useState([]);

  useEffect(() => {
    getResturantinfo();
  }, []);
  async function getResturantinfo() {
    const data = await fetch(
      // `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=9.91850&lng=76.25580&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
      `${FETCH_RES_INFO_URL}${id}`
    );
    const json = await data.json();
    // console.log(json);
    setResturantInfo(json);
  }
  return resturantInfo;
};

export default useResturant;
