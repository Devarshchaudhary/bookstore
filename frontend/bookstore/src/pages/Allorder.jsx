import React, { useState, useEffect } from "react";
import axios from "axios";
// import Orderhistory from "../components/profile/Orderhistory";
// import { FaUserLarge } from "react-icons";
// import { Link} from "react-router-dom"
// import  { IoOpenOutline} from "react-icon/io5"
// import {FaCheck} from "react-icon/fa6"
// import SeeUserData from "../pages/SeeUserData";
const Allorders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1)
  const [Values, setValues] = useState({staus:""})
  const [userdiv, setuserDiv] = useState("hidden")
  const [userDivData, setuserDivData] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/getallorder",
                { headers }
            );
            setAllOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            // Optionally, you can set an error state to display a message to the user
        }
    };
    fetch();
}, []);

//   const change = () => {
//     const {value} = e.target;
//     setValues({satus: value})
//   }
//   const submitChanges = async (i) => {
//     const id = Orderhistory[i]._id;
//     const response = await axios.put(
//       `http://localhost:8080/api/v1//updateorder/${id}`,
//       Values, 
//       {
//         headers
//       }
//     )
//     alert(response.data.message)
//   }

// AllOrders && AllOrders.splice(AllOrders.length-1, 1);
return (
  <>
    {AllOrders && AllOrders.length > 0 && (
      <div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 border-b-2 border-gray-300 py-2">
            <div className="font-semibold">Sr.</div>
            <div className="font-semibold">Title</div>
            <div className="font-semibold">Price</div>
            <div className="font-semibold">Status</div>
            <div className="font-semibold">Payment Mode</div>
          </div>
          {/* Render each order here */}
          {AllOrders.map((order, index) => (
            <div key={order._id} className="grid grid-cols-6 gap-4 border-b border-gray-300 py-2">
              <div>{index + 1}</div>
              <div>{order.title}</div>
              <div>{order.price}</div>
              <div>{order.status}</div>
              <div>COD</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);
}
export default Allorders;
