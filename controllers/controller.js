const { topicsModel, articleIdModel } = require("../models/model.js");
const endPoints = require("../endpoints.json");

const topicsController = (request, response) => {
  topicsModel().then((result) => {
    response.status(200).send(result);
  });
};

apiController = (request, response) => {
  response.status(200).send(endPoints);
};

articleIdController = (request, response) => {
  const { article_id } = request.params;
  articleIdModel(article_id).then((result) => {
    response.status(200).send(result);
  });
};

module.exports = { topicsController, apiController, articleIdController };
