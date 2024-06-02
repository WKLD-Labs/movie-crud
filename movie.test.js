
const request = require('supertest');
const app = require('./server');

describe('GET /api/movies', () => {
  it('should respond with a JSON array of movies', async () => {
    const res = await request(app)
      .get('/api/movies')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toHaveLength(2);

    expect(res.body[0]).toEqual({
      id: 1,
      title: 'How to basic',
      genre: 'horror',
      director: 'skibidi',
      year: 2000,
      rating: 2,
      createdAt: '2024-06-02T17:42:37.000Z',
      updatedAt: '2024-06-02T17:42:37.000Z'
    });

    expect(res.body[1]).toEqual({
      id: 2,
      title: 'Pudidi',
      genre: 'comedy',
      director: 'fanum tax',
      year: 2020,
      rating: 10,
      createdAt: '2024-06-02T17:44:56.000Z',
      updatedAt: '2024-06-02T17:44:56.000Z'
    });
  });
});
