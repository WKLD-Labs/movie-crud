const request = require('supertest');
const app = require('./server');

describe('CRUD Operations for /api/movies', () => {

  // Test the Create (POST) operation
  it('should create a new movie', async () => {
    const newMovie = {
      title: 'New Movie',
      genre: 'Action',
      director: 'John Doe',
      year: 2021,
      rating: 8
    };
  
    const res = await request(app)
      .post('/api/movies')
      .send(newMovie)
      .expect('Content-Type', /json/)
      .expect(201);
  
    expect(res.body).toHaveProperty('movie');
    expect(res.body.movie).toHaveProperty('id'); 
    expect(res.body.movie.title).toEqual(newMovie.title);
  });

  // Test the Read (GET) operation
  it('should retrieve all movies', async () => {
    const res = await request(app)
      .get('/api/movies')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

});
