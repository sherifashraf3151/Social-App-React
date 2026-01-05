import axios from "axios";

export async function createCommentApi(content, post) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/comments",
      {
        content,
        post,
      },
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

export async function updateCommentApi(content, commentId) {
  try {
    const { data } = await axios.put(
      "https://linked-posts.routemisr.com/comments/" + commentId ,
      {
        content,
      },
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

export async function getCommentApi( postId ) {
  try {
    const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments` ,
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

export async function deleteCommentApi(commentId) {
  try {
    const { data } = await axios.delete(
      "https://linked-posts.routemisr.com/comments/" + commentId,
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
