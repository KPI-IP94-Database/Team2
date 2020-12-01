'use strict';

const db = require('./StoreDB.module');
const Rating = require('./Models/Rating');
const Comment = require('./Models/Comment');

const getRatings = cond => Rating.Find(cond);
const getComments = cond => Comment.Find(cond);

module.exports = {
  getRatings,
  getComments,
};
