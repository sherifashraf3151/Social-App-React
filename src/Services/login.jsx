import axios from "axios";
import { header } from "framer-motion/client";

export async function sendLoginData(values) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      values
    );

    console.log(data);
    return data;
  }
  catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}


export async function getLoggedUserData() {
  try {
    const { data } = await axios.get( "https://linked-posts.routemisr.com/users/profile-data", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    } );

    console.log(data);

    return data;
  }
  catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}
