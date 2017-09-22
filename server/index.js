const PouchDB = require('pouchdb')
const express = require('express')
const mkdirp = require('mkdirp')
const app = express()
const { join } = require('path')

const BASE_DIR = join(__dirname, '..')
const DB_DIR = process.argv[2] || join(BASE_DIR, 'mydb/')

const start = () => {
  app.use(express.static(join(BASE_DIR, 'dist')))

  app.use('/db', require('express-pouchdb')(PouchDB.defaults({ prefix: DB_DIR })))

  app.listen(3000)
}

mkdirp(DB_DIR, err => {
  if (err) return console.error(err)
  start()
})
