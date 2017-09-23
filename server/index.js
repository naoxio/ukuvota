const PouchDB = require('pouchdb')
const express = require('express')
const mkdirp = require('mkdirp')
const app = express()
const morgan = require('morgan')
const { join } = require('path')

const BASE_DIR = join(__dirname, '..')
const DB_DIR = process.argv[2] || join(BASE_DIR, 'mydb/')
const PORT = process.argv[3] || process.env.PORT || 3000

app.use(morgan('combined'))
app.use(express.static(join(BASE_DIR, 'dist')))

const start = () => {
  app.use('/db', require('express-pouchdb')(PouchDB.defaults({ prefix: DB_DIR })))

  app.listen(PORT, () => {
    console.log('Listening on port:', PORT)
  })
}

mkdirp(DB_DIR, err => {
  if (err) return console.error(err)
  start()
})
