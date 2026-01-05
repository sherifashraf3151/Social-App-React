import axios from "axios";

export async function createPostApi(formData) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts",
      formData ,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        }
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts() {

    return axios.get(
      "https://linked-posts.routemisr.com/posts",
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
        params: { 
          limit: 30 ,
          sort : '-createdAt'
        },
      }
    );
}

export async function getPostApi(postId) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts/" + postId,
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

export async function deletePostApi(postId) {
  try {
    const { data } = await axios.delete(
      "https://linked-posts.routemisr.com/posts/" + postId,
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

