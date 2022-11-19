const express = require('express')
const cors = require('cors')
const axios = require('axios')


const app = express()

app.use(express.json())
app.use(cors())
const posts = {}
const handleEvent = (type,data) =>{
    if(type === "Post Created"){
        const { id,title} = data
       console.log(data,"Data")
        posts[id] = {id,title ,comments: [] };
        console.log(posts)
        
        }
       
        if(type === "Comment Created"){
       
           const {id , content ,postId} = data;
           console.log(data,"Data")
           const post = posts[postId];
           post?.comments.push({ id,content})
       
       }
       if(type === "CommentUpdated"){
           console.log("first")
         const {id,content,postId,status} =data;
           const post = posts[postId]
           const  comment = post.comments.find(comment =>{
               return comment.id === id
           })
           comment.status = status;
           comment.content = content;
           
       }
}
try {
  app.get('/posts' ,(req,res)=>{
  
  res.json(posts)
  })
  
} catch (error) {
  
}
app.post('/events',(req,res)=>{
 const {type , data} = req.body;

console.log(req.body,"typessss")
 

handleEvent({type, data})
res.send({})
});

app.listen(5002,async()=>{
    console.log("Running in 5002")

  const res =  await axios.get('http://localhost:5005/events');

  for(let event of res.data){
    console.log("processing event :", event.data)

    handleEvent(event.type,event.data)
  }

})

