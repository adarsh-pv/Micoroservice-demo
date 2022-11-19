const express = require('express')
const {radomBytes, randomBytes} = require('crypto')
const cors = require ('cors')
const axios = require('axios')


const app = express()
app.use(express.json())
app.use(cors())                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
const commentByPostId = {};
app.get('/post/:id/comments',(req,res)=>{
res.send(commentByPostId[req.params.id] || [])
})
app.post('/post/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
console.log(req.body,"funnn")
    const {content} = req.body
    const comments = commentByPostId[req.params.id] || []
   comments.push ({id:commentId , content,status:"pending"})

   commentByPostId[req.params.id] = comments;
try {
    
    await axios.post('http://localhost:5005/events',{
    
          type:"Comment Created",
          data:{
              id:commentId,
              content,
              postId:req.params.id,
              status:"Pending"
          }
      
     })
} catch (error) {
    console.log(error)
}
   console.log(commentByPostId,"hai")
   res.status(201).send(comments)

})

app.post('/events', async (req,res)=>{
  
    console.log("Event received :",req.body.type)
    const  {type,data} = req.body

    if(type === 'CommendModerated'){
        const {postId,id,status,content} = data;
        const comments = commentByPostId[postId];

        const comment = comments.find(comment =>{
            return comment.id ===id;
        })
        comment.status = status

        console.log(status,"status find")
     

      await axios.post('http://localhost:5005/events',{
            type:'CommentUpdated',
            data:{
                id,
                status,
                postId,
                content
            }

        })
    }

    res.send({})
})

app.listen(5001,()=>{
    console.log("Running on port 5001")
})
