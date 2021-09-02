const knex = require("../db/connection");

function read(review_id){
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
}

function destroy(reviewId){
    return knex("reviews")
        .where({ review_id: reviewId })
        .del();
}

function list(movie_id){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.movie_id", "*")
    .where({ movie_id });
} 

async function update(updatedReview) {
    const review_id = updatedReview.review_id;
    await knex("reviews")
      .select("*")
      .where({ review_id })
      .update(updatedReview, "*");
  
    return read(updatedReview.review_id);
  }

function getCritic(critic_id) {
    return knex("critics").select("*").where({ critic_id }).first();
}

module.exports = {
    read,
    update,
    list,
    getCritic,
    delete: destroy,
}