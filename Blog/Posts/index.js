const express = require('express')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const posts ={}
app.get('/post', (req,res)=>{
 console.log("fl")
    console.log(posts)
    res.send(posts)
})
app.post('/post', async (req,res)=>{
    const id =  randomBytes(4).toString('hex');
    const {title} = req.body

    posts[id] = {
        id,title
    };
    try {
        
        await axios.post('http://localhost:5005/events',{
             type:"Post Created",
             data:{
                 id,title
             }
         })
    } catch (error) {
        // console.log(error)
    }
console.log(posts,"iiiiiiiii")
    res.status(201).send(posts[id])
    
})

app.post('/events', (req,res)=>{
    console.log("received event",req.body.type)

    res.send({})
})

app.listen(5000,()=>{
    console.log('running on 5000')
})