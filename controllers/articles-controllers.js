const {
  queryArticleById,
  queryArticles,
  insertVotes,
} = require("../models/articles-models.js");

const { checkTopicExists } = require("../models/topics-models.js");

exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  queryArticleById(article_id)
    .then((result) => {
      response.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleList = (request, response, next) => {
  const { topic, sort_by, order_by } = request.query;
  if (topic) {
    return Promise.all([
      checkTopicExists(topic),
      queryArticles(topic, sort_by, order_by),
    ])
      .then((resolvedPromises) => {
        response.status(200).send(resolvedPromises[1]);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    queryArticles(null, sort_by, order_by)
      .then((result) => {
        response.status(200).send(result);
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.patchVotes = (request, response, next) => {
  const { article_id } = request.params;
  const votes = request.body;
  return Promise.all([
    queryArticleById(article_id),
    insertVotes(votes, article_id),
  ])
    .then((resolvedPromises) => {
      response.status(200).send({ article: resolvedPromises[1] });
    })
    .catch((err) => {
      next(err);
    });
};