var config = require("./connection");

var orm = {
    selectAll: function(table){
        config.query(`SELECT * FROM ??`, [table], function(e, r){
            if(e) throw e;
            console.log(r);
        })
    }
}

module.exports = orm;