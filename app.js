// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000


app.set('view engine', 'html')

// setting static files 設定Express路由以提供靜態檔案
app.use(express.static('public'))

// setting routes
app.get('/', (req, res) => {
// past the data into 'index' partial template
  res.sendFile('index.html', { root: __dirname})
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express app is running on the http://localhost:${port}`)
})