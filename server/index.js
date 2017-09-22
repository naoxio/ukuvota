let PouchDB = require('pouchdb')
let express = require('express')
let app = express()

app.use(express.static('../dist'))

app.use('/db', require('express-pouchdb')(PouchDB.defaults({prefix: './mydb/'})))

app.listen(3000)
