'use strict';

exports.errorHandler = (err, res) => {
  if (err) {
    res.status(500).json({error: 'Something wrong was happened.'});
  }
};