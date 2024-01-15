

var cors = require('cors');
const connectToMongo = require('./db');
const express = require('express')
connectToMongo();


const app = express()
const port = 5000


app.use(cors())
//Available routes
app.use(express.json())  // this is used to use json page with (res,req)

app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello00 World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
