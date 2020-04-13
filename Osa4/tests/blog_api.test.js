const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./api_test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs').expect(200)
        const urls = response.body.map(blog => blog.url)
        expect(response.body.length).toBe(helper.initialBlogs.length)    
        helper.initialBlogs.forEach(blog => {
            expect(urls).toContain(blog.url)
        })
    })

    test('blogs have field id but not _id', async () => {
        const response = await api.get('/api/blogs').expect(200)
        if (response.body.length > 0 ){
            const firstBlog = response.body[0]
            expect(firstBlog.id).toBeDefined()
            expect(firstBlog._id).toBe(undefined)
        }      
    })
    
})

describe('POST /api/blogs', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany([helper.testUserToDb])
    })
    
    test('a blog can be added to database', async () => {
        const initialResponse = await api.get('/api/blogs').expect(200)

        await api
            .post('/api/blogs')
            .set('Authorization', helper.testUser)
            .send(helper.newBlog)
            .expect(200)
 
        const response = await api.get('/api/blogs').expect(200)
        expect(response.body.length).toBe(initialResponse.body.length + 1)
        const urls = response.body.map(blog => blog.url)
        expect(urls).toContain(helper.newBlog.url)

    })

    
    test('field likes defaults to 0', async () => {
        const blog = { title: 'New blog title', author: 'New blog author', url: 'https://newblog.com/' }
        const response = await api
            .post('/api/blogs')
            .set('Authorization', helper.testUser)
            .send(blog)
            .expect(200)
        expect(response.body.likes).toBeDefined()
        expect(response.body.likes).toBe(0)
    })
    
    test('400 bad request - title or url missing', async () => {
        const initialResponse = await api.get('/api/blogs').expect(200)
        const blogWithoutTitle = { author: 'New blog author', url: 'https://newblog.com/' }
        const blogWithoutUrl = { title: 'New blog itle', author: 'New blog author' }

        await api
            .post('/api/blogs')
          .set('Authorization', helper.testUser)
            .send(blogWithoutTitle)
            .expect(400)
        await api
            .post('/api/blogs')
            .set('Authorization', helper.testUser)
            .send(blogWithoutUrl)
            .expect(400)

        const finalResponse = await api.get('/api/blogs').expect(200)
        expect(initialResponse.body.length).toBe(finalResponse.body.length)
    })
    
})


describe('DELETE /api/blogs/:id', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany([helper.testUserToDb])
    })

    test('delete blog successful', async () => {
        await Blog.deleteMany({})
        await Blog.insertMany([
            { title: 'New 1', author: 'Abc', url: 'http://new1.com/' , user: helper.testUserToDb._id },
            { title: 'New 2', author: 'Def', url: 'http://new2.com/' , user: helper.testUserToDb._id }
        ])

        const initialResponse = await api.get('/api/blogs').expect(200)
        expect(initialResponse.body.length).toBe(2)
        
        await api
            .delete(`/api/blogs/${initialResponse.body[0].id}`)
            .set('Authorization', helper.testUser)
            .expect(204)

        const response = await api.get('/api/blogs').expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].id).toBe(initialResponse.body[1].id)
    })
    
})


describe('PUT /api/blogs/:id', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany([helper.testUserToDb])
    })

    test('update successful', async () => {
        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', helper.testUser)
            .send(helper.newBlog)
            .expect(200)

        let newBlog = helper.newBlog
        newBlog.likes = newBlog.likes + 10
        
        const putResponse = await api
            .put(`/api/blogs/${postResponse.body.id}`)
            .send(newBlog)
            .expect(200)
        expect(putResponse.body.likes).toBe(newBlog.likes)

    })
})

afterAll(() => {
    mongoose.connection.close()
})