const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://fullstack:${password}@cluster0-5meyz.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`
//`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    //important: Boolean,
  })
  

const Person = mongoose.model('Person', personSchema)

const addNewPerson = (newName, newNumber) => {
    const person = new Person({
        name: newName,
        number: newNumber,  
      })
      
    person.save().then(response => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })

}

const getAll = () => {
    Person.find({}).then(result => {
        result.forEach(p => {
          console.log(`${p.name} ${p.number}`)          
        })
        mongoose.connection.close()
      })
}

if (process.argv.length === 5) {
    addNewPerson(process.argv[3], process.argv[4])
}
if (process.argv.length === 3) {
    getAll()
}

if ((process.argv.length != 3) && (process.argv.length != 5)) {
    console.log('you need to give password or password + new name & phonenumber as arguments')
    mongoose.connection.close()
}


