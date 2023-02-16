const express = require('express');
const postPersonFunction = require('./functions/postPersonFunctions.js');

class PersonRouter {
  constructor(middleware) {
    this.router = express.Router();
    this.middleware = middleware;
  }

  setupRoutes() {
    const middleware = this.middleware;
    const dbManager = middleware.getDatabaseManager();
    
    this.router.post('/persons',  middleware.execute, function (req, res) {
      return postPersonFunction(req, res, dbManager);
    });

    this.router.put('/persons/:id', function (req, res) {
      middleware.execute();

      const id = req.params.id;
      const { name, motherId, fatherId } = req.body;

      const sql =
        'UPDATE persons SET name = ?, mother_id = ?, father_id = ? WHERE id = ?';
      const values = [name, motherId, fatherId, id];

      database.query(sql, values, function (error, results) {
        if (error) {
          return res.status(500).send('Error updating data in database');
        } else if (results.affectedRows === 0) {
          return res.status(404).send('Person not found');
        } else {
          return res.status(200).send('Person updated successfully');
        }
      });
    });

    this.router.delete('/persons/:id', function (req, res) {
      middleware.execute();
      const id = req.params.id;
      const sql = 'DELETE FROM persons WHERE id = ?';
      const values = [id];

      database.query(sql, values, (error, results) => {
        if (error) {
          res.status(500).send('Error deleting data from database');
        } else if (results.affectedRows === 0) {
          res.status(404).send('Data not found');
        } else {
          res.status(204).send();
        }
      });
    });
  }

  getRouter() {
    return this.router;
  }
}

module.exports = PersonRouter;