const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://fullstack:${password}@cluster0-5meyz.mongodb.net/bloglist?retryWrites=true&w=majority`
//`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: '' },
  url: { type: String, required: true },  
  likes: { type: Number, default: 0 },
  /*
  user: {
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
  }
  */
})


const Blog = mongoose.model('Blog', blogSchema)
//const Person = mongoose.model('Person', personSchema)

const addNewBlog = (newTitle, newAuthor, newUrl, newLikes ) => {
    const blog = new Blog({
        title: newTitle,
        author: newAuthor,  
	url: newUrl, 
        likes: newLikes
      })
      
    blog.save().then(response => {
    console.log(`added ${newTitle} number ${newUrl}`)
    mongoose.connection.close()
  })

}

const getAll = () => {
    Blog.find({}).then(result => {
        result.forEach(p => {
          console.log(`${p.author} ${p.title}`)          
        })
        mongoose.connection.close()
      })
}

if (process.argv.length === 7) {
    addNewBlog(process.argv[3], process.argv[4], process.argv[5], process.argv[6])
}
if (process.argv.length === 3) {
    getAll()
}

/*
if ((process.argv.length != 3) && (process.argv.length != 5)) {
    console.log('you need to give password or password + new name & phonenumber as arguments')
}
*/
//mongoose.connection.close()
