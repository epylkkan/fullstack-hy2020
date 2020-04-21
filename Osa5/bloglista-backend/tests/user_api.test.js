const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./api_test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})

})

describe('New unique users', () => {

  test('create a new user', async () => {
    const usersAtStart = await helper.usersInDb()

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('topsecret', saltRounds)

    const newUser = {
      username: 'tester',
      name: 'Jack Tester',
      password: 'secret',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(helper.testUser)
      .expect(500)


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
    mongoose.connection.close()
 })