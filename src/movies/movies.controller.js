const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next){
    const {movieId} = req.params;
    const movie = await service.read(movieId);

    if(movie){
        res.locals.movie = movie;
        return next();
    }
    return next({ status: 404, message: `Movie ID ${movieId} not found`})
}

async function list(req, res, next){
    let data = '';
    if(req.query.is_showing) {
        const data = await service.listShowingMovies(true)
        res.json({ data })
    }
    else {
        data = await service.list();
        res.json({ data })
    }
}

async function read(req, res, next){
    const data = res.locals.movie;
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExists, asyncErrorBoundary(read)],
    movieExists: asyncErrorBoundary(movieExists),
}