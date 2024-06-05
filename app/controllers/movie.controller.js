const db = require('../models');
const Movie = db.movie;

exports.create = async (req, res) => {
    try {
        const { title, genre, director, year, rating } = req.body;
        const newMovie = await Movie.create({ title, genre, director, year, rating });
        res.status(201).json({ movie: newMovie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/*exports.findAll = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}*/

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findByPk(id);
        if (movie) {
            res.status(200).json({ movie });
        } else {
            res.status(404).json({ message: '' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const  updatedMovie = await Movie.update(req.body, {
            where: { id },
            returning: true,
        });
        res.status(200).json( updatedMovie );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Movie.destroy({ where: { id } });
        if (deletedRowCount > 0) {
            res.status(200).json({ message: 'Movie deleted successfully' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}