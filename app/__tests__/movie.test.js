const request = require('supertest');
const app = require('../../server');

describe('CRUD Operations for /api/movies', () => {
    let createdMovieId;

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
        createdMovieId = res.body.movie.id;
    });

    // Test the Read (GET) operation
    it('should retrieve all movies', async () => {
        const res = await request(app)
            .get('/api/movies')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test the Read (GET) operation for a single movie
    it('should retrieve a single movie', async () => {
        const res = await request(app)
            .get(`/api/movies/${createdMovieId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toHaveProperty('movie');
        expect(res.body.movie.id).toEqual(createdMovieId);
    });

    // Test the Delete (DELETE) operation
    it('should delete a movie', async () => {
        const res = await request(app)
            .delete(`/api/movies/${createdMovieId}`)
            .expect('Content-Type', /json/);

        // Check if the movie was deleted successfully
        if (res.status === 200) {
            expect(res.body).toHaveProperty('message', 'Movie deleted successfully');
        } else if (res.status === 404) {
            expect(res.body).toHaveProperty('message', 'Movie not found');
        } else {
            // Handle other error cases if needed
            fail(`Unexpected response status: ${res.status}`);
        }
    });
});