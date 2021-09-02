const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res) {
    const data = await service.list();
    const reduceData = reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        rating: ["movies", null, "rating"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        is_showing: ["movies", null, "is_showing"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
      });
    const reducedData = reduceData(data);
    res.json({ data: reducedData })
}


module.exports ={
    list: asyncErrorBoundary(list),
}