const express = require('express')
const app = express()
const port = 3000
const path = require("path")

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "static", "index.html" ))
})

app.use(express.static("static"))

app.listen(process.env.PORT || PORT, () => console.log(`Example app listening on port ${port}!`))
