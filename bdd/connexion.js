
    let mysql = require('mysql')

    let connection = mysql.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'maxor',
        password : 'Douglas20',
        database : 'koin'
    
    });
    
    //connection.connect();
    
    module.exports = connection