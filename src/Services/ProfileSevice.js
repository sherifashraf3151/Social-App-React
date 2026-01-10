import axios from "axios";

export async function getUserData() {
  try {
    const { data } = await axios.get(`https://linked-posts.routemisr.com/users/profile-data` ,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    console.log(data);
    return data;

  } catch (error) {
    console.log(error);
  }
}

export async function uploadProfilePhotoApi(file) {
  try {
    console.log("Sending file to API:", file);
    const formData = new FormData();
    formData.append('photo', file);
    console.log("FormData created");

    const { data } = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    console.log("API response:", data);
    return data;

  } catch (error) {
    console.log("API error:", error);
  }
}