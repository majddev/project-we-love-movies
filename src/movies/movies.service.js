const knex = require("../db/connection");

function list(){
    return knex("movies as m")
        .select("m.runtime_in_minutes as runtime", "m.*");
}

function listShowingMovies(is_showing){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.runtime_in_minutes as runtime"," m.*", "mt.is_showing")
        .groupBy("m.movie_id", "mt.is_showing")
        .where({ is_showing });
        
}

function read(movieId){
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId})
        .first();
}

module.exports = {
    list,
    listShowingMovies,
    read,
}