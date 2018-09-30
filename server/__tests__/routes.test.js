const request = require('supertest')
const app = require('../../app')

describe('index routes', () => {
  it('GET request for users', () => {
    return request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  it('GETs user by id', () => {
    const user = {
      id: 1,
      username: 'rediscover',
      password: '$2a$08$LeQX5AIWgIKuaWea/VqrROjPujGb6jvtr7BDOEbfMYiYQDkdGn6X2',
      avatarUrl: 'https://i.imgur.com/dfwIuH7.jpg',
      postCount: 13,
      createdAt: '2018-09-26T21:23:52.762Z',
      updatedAt: '2018-09-30T15:57:30.938Z'
    }
    return request(app)
      .get('/api/users/1')
      .expect(200, user)
  })
})
