const mysql = require("mysql")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'woo94',
    password: 'woo94'
})

connection.connect(err => {
    if(err) {
        console.log(err)
    }
    else {
        console.log('connection sucecss')
        console.log('id:', connection.threadId)
    }
})