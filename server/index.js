import level from 'level-rocksdb'

let db = level('./mydb')

db.put('name', 'wolfi', err => {
  if (err) return console.log('Oops!', err)

  db.get('name', (err, value) => {
    if (err) return console.log('Oops!', err)
    console.log('name=' + value)
  })
})