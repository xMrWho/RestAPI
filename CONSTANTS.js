const path = require('path');

module.exports = {
    DATABASE: {
        usedDatabase: 'MySQL',
        configFile: path.join(__dirname, 'mySql.json'),
        databaseName: 'Lillnor'

    }
};
