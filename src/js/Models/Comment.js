'use strict';

const db = require('../StoreDB.module');

class Comment {
  constructor({ content, user_login, product_name, id }) {
    this.content = content;
    this.user_login = user_login;
    this.product_name = product_name;
    this.id = id;
  }

  save = async () => {
    const newComment = {
      content: this.content,
      user_login: this.user_login,
      product_name: this.product_name,
    };
    if (this.id) {
      const [comment] = await db.select('comment', ['*'], { id: this.id });
      if (comment) {
        for (const value in newComment) {
          if (!newComment[value]) delete newComment[value];
        }
        return db.update('comment', newComment, { id: this.id });
      }
    }
    if (this.content && this.user_login && this.product_name) {
      return db.insert('comment', newComment);
    }
  };

  static Find = conditions =>
    new Promise(async (res, rej) => {
      db.select('comment', ['*'], conditions).then(comments => {
        if (comments.length) res(comments.map(comment => new Comment(comment)));
        res([]);
      });
    });

  static All = () =>
    new Promise(async (res, rej) => {
      db.select('comment', ['*']).then(comments => {
        if (comments.length) res(comments.map(comment => new Comment(comment)));
        res([]);
      });
    });

  static Delete = conditions => db.delete('comment', conditions);
}

module.exports = Comment;
