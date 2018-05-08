var config = require("./connection");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

var orm = {
    selectAll: function(table, cb){
        config.query(`SELECT * FROM ??`, [table], function(e, r){
            if(e) throw e;
            //return r;
            cb(r);
        })
    },
    selectWhere: function(table, column, value, cb){
        config.query(`SELECT * FROM ?? WHERE ?? = ?`, [table, column, value], function(e, r){
            if(e) throw e;
            //return r;
            cb(r);
        })
    },
    // another generic version of select to handle to select all and select specific column
    select: function(whatToSelect, table, cb){
        var queryString = "SELECT ?? FROM ??";
        var data = [whatToSelect, table];

        if(whatToSelect === "*"){
            queryString = "SELECT * FROM ??";
            data.splice(0,1);
        }

        config.query(queryString, data, function(e, r){
            if(e) throw e;
            //return r;
            cb(r);
        })
    },
    delete: function(table, columnName, value, cb){        
        config.query(`DELETE FROM ?? WHERE ?? = ?`, [table, columnName, value], function(e, r){
            if(e) throw e;
            cb(r);
        })
    }
}

module.exports = orm;