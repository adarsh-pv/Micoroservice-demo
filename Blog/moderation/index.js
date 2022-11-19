const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

app.post('/events',async (req,res)=>{
  const {type,data} = req.body

  if(type === 'Comment Created'){
    const status = data.content.includes('orange') ? 'rejectd' : 'approved';
    console.log(status,"jim jim")

    await axios.post('http://localhost:5005/events',{
        type:'CommendModerated',
        data:{
            id:data.id,
            postId:data.postId,
            status,
            content:data.content
        }
    })
  }
  res.send({})
})

app.listen(5003, ()=>{
    console.log("Running in 5003")
})