import React, { useEffect, useState } from "react";
import { getPosts } from "../Services/PostService";
import LoadingScreen from "../Components/LoadingScreen";
import PostCard from "../Components/Post/PostCard";
import PostForm from "../Components/PostForm";
import { useQuery } from "@tanstack/react-query";

export default function FeedPage() {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // async function getAllPosts() {
  //   let response = await getPosts();
  //   if (response.message == "success") {
  //     setPosts(response.posts);
  //   }
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   getAllPosts();
  // }, [] );

  // data as posts
  const { data : posts , isLoading , isError , error , isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,

    // refetch every 3 sec 
    // refetchInterval: 3000 ,
    select: (data)=> data?.data.posts
  });
  

  return (
    <>
      <div className="w-[95%] md:w-xl mx-auto Feedpage">

        <PostForm />

        { isLoading ? (
          <LoadingScreen />
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} commentsLimit={2} />)
        ) }
      </div>
    </>
  );
}
