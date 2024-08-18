import Cookies from "js-cookie";
import axios from "axios";

const host = `${process.env.NEXT_PUBLIC_HOST}/products`;
const api = `${host}/transactions/`;

const HandleBuy = async (product_id) => {
  try {
    const id = Number(product_id); // Convert product_id to a number
    await axios.post(
      api,
      {
        product_id: id,
      },
      {
        headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
      }
    );
    alert("Added to cart!");
  } catch (error) {
    console.error("Error making the purchase", error);
    if (error.response) {
      if (error.response.status === 401) {
        alert("Session expired or sign in needed. Redirecting to login.");
        window.location.href = "/Login"; 
      } else {
        alert(`Failed to add to cart! (${error.response.status})`);
      }
    } else {
      alert("Failed to add to cart! Please try again.", error);
    }
  }
};

export { HandleBuy };
