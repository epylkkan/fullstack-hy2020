const Blog = require('../models/blog')
const User = require('../models/user')
const userId = '5e9436e4d0fcfce1357c40fc'


const initialBlogs = [ 
    { _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0 },
    { _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0 },
    { _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0 },
    { _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0 },
    { _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0 },
    { _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0 }
    ]
    
const newBlog = {
    title: 'New blog title',
    author: 'New blog author',
    url: 'https://newblog.com/',
    likes: 0,
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }


const testUserToDb = {
    _id: userId,
    username: 'test2',
    name: 'Test User 2',
    passwordHash: '$2b$10$fMZZIZISNmozGiWVWwzhDOPvaUuFifG1Xj.L/LZ4BQJ0ODKb1sQQO'
}


const testUser = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWQiOiI1ZTk0MzZlNGQwZmNmY2UxMzU3YzQwZmMiLCJpYXQiOjE1ODY3OTMzMjl9.OlllJzVd9cTc9RWAySP7VXzfhxzSKYu1RFESJPgEzOU'


module.exports = {
    initialBlogs, newBlog, usersInDb, testUserToDb, testUser
}