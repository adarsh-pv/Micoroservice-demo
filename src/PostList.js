import { useEffect, useState } from "react";
import React from "react";
import axios from 'axios';
import CommendCreate from "./CommendCreate";
import CommentList from "./CommentList";

export default () =>{
    const [posts,setPosts] = useState({})

    const fetchPost = async () =>{
    

        const res =  await axios.get('http://localhost:5002/posts')

console.log(res.data,"helo")
        setPosts(res.data)
    }
  useEffect(()=>{
   fetchPost();
  },[])
  const renderedPost = Object.values(posts).map(post=>{
   return <div className="card" style={{width:'30%' , marginBottom :'20px'}} key={post.id} >
  <div className="card-body">
    <h3>{post.title}</h3>
    <CommentList comments={post.comments}/>
    <CommendCreate postid={post.id} />
  </div>
   </div>
  })
    return <div className="d-flex flex-row justify-content-between">
        {renderedPost}
    </div>
}

