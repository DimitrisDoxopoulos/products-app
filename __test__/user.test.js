const mongoose = require('mongoose')
const superTest = require('supertest')
const helper = require('../helpers/user.helper')
const app = require('express')
require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
})

describe('Check user root requests', () => {
    it('Get all users', async () => {
        const res = await request(app)
            .get('/api/users')
            .expect(res.statusCode).toBe(200)
            .expect(res.body.status).toBeTruthy()
            .expect(res.body.data.length).toBeGreaderthan(0)
    }, 10000)

    it('Get a user', async () => {
        const result = await helper.findLastInsertedUser();
        const res = await request(app)
            .get('/api/users/' + result.username)
            .expect(res.statusCode).toBe(200)
            .expect(res.body.status).toBeTruthy()
            .expect(res.body.data.username).toBe(result.username)
            .expect(res.body.data.email).toBe(result.email)
    }, 10000)

    it('Post create a user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                username: 'test4',
                password: '12345',
                name: 'name for test 4',
                surname: 'surname for test 4',
                email: 'test4@aueb.gr'
            })
            .expect(res.statusCode).toBe(200)
            .expect(res.body.status).toBeTruthy()
    })

    it('Post create user that already exists', async () => {
        const res = await request(app)
            .send({
                username: result.username,
                password: '11111',
                name: 'new name',
                surname: 'new surname',
                email: 'new@aueb.gr'
            })
            .expect(res.statusCode).toBe(400)
            .expect(res.body.status).toBeFalsy()
    })

    it('Patch update a user', async () => {
        const result = await helper.findLastInsertedUser()

        const res = await request(app)
            .patch('/api/users/' + result.username)
            .send({
                username: result.username,
                password: 'xXx',
                name: 'new updated name',
                surname: 'new updated surname',
                email: 'new@aueb.gr',
                address: {
                    area: 'xXx',
                    road: 'xXx'
                },
                phone: {
                    type: 'xXx',
                    number: '1234567'
                }
            })
            .expect(res.statusCode).toBe(200)
            .expect(res.body.status).toBeTruthy()
    })

    it('Delete a user', async () => {
        const result = await helper.findLastInsertedUser()
        const res = await request(app)
            .delete('/api/users/' + result.username)
            .expect(res.statusCode).toBe(200)
            .expect(res.body.status).toBeTruthy()
    })
})