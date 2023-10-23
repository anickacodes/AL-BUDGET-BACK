const request = require('supertest')
const app = require('../app')
const transactionArray = require('../models/data')


describe ('GET /transactions', () => {
    it ('should return the transactionsArray', async () => {
        // const transactionId = transactionArray[0].id
    const response = await request (app) .get ('/transactions');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(transactionArray)
    });
});
