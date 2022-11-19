const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
const events = []

// app.use(cors())
console.log("kjdsjjidfji");
app.post('/events',async (req,res)=>{
  const event = req.body;
events.push (event);
  
  console.log(event,"events")


  await axios.post('http://localhost:5000/events',event)
  await axios.post('http://localhost:5001/events',event)
 await axios.post('http://localhost:5002/events',event)
  await axios.post('http://localhost:5003/events',event)


  res.send({status :'ok'})
})

app.get('/events', (req,res)=>{
   res.send(events)
})

app.listen(5005, ()=>{
    console.log("Connected in 5005" )
})
