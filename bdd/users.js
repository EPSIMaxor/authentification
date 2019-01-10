var connection = require('./connexion')
var bcrypt = require('bcryptjs')

class Users {

    constructor(mail, password) {
        this.mail = mail
        this.password = password
    }
    
    getMail(){
        return this.mail
    }

    getPassword(){
        return this.password
    }

    search (cb) {
        connection.query('SELECT * FROM user WHERE email = ? limit 1',[this.mail], (err, result) => {
            if(err) {
                throw err
            }
            cb(result)
        })
    }
    
    create (cb) {
        this.password = bcrypt.hashSync(this.password, 10)
        connection.query('INSERT INTO user SET email = ?, password = ?',[this.mail, this.password], (err, result) => {
            if(err) {
                throw err
            }
            cb(result)
        })
    }

    searchAll (cb) {
        connection.query('SELECT * FROM user', (err, rows) => {
            if(err) throw err
            cb(rows)
        })
    }
    
    delete (cb){
        connection.query('DELETE FROM user WHERE email = ?' ,[this.mail], (err, result) => {
            if(err) {
                throw err
            }
            cb(result)
        })
    }

    Update (cb){
        this.password = bcrypt.hashSync(this.password, 10)
        connection.query('UPDATE user SET password = ? WHERE email = ?' ,[this.password, this.mail], (err, result) => {
            if(err) {
                throw err
            }
            cb(result)
        })
    }

}

module.exports = Users