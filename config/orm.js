var config = require("./connection");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

var orm = {
    selectAll: function(table){
        config.query(`SELECT * FROM ??`, [table], function(e, r){
            if(e) throw e;
            console.log(r);
        })
    },
    selectWhere: function(table, column, value){
        config.query(`SELECT * FROM ?? WHERE ?? = ?`, [table, column, value], function(e, r){
            if(e) throw e;
            console.log(r);
        })
    },
    // another generic version of select to handle to select all and select specific column
    select: function(whatToSelect, table){
        var queryString = "SELECT ?? FROM ??";
        var data = [whatToSelect, table];

        if(whatToSelect === "*"){
            queryString = "SELECT * FROM ??";
            data.splice(0,1);
        }

        config.query(queryString, data, function(e, r){
            if(e) throw e;
            console.log(r);
        })
    }
}

module.exports = orm;