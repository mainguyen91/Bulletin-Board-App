const pool = require('../database/configuration');

module.exports = {
    goHome: (req, res) => {
        res.render('index');
    },

    getResults: (req, res) => {
        pool.connect()
            .then(client => {
                return client.query(`select * from messages`)
                    .then(results => {
                        client.release();
                        res.render('results', {
                            newMessage: results.rows
                        })
                    })
                    .catch(error => {
                        client.release();
                        console.error(`Something went wrong when adding new message ${error.stack}`)
                    })
            })
            .catch(error => {
                console.error(`Could not connect to database ${error.stack}`)
            })
    },

    addMessage: (req, res) => {
        console.log(req.body)
        pool.connect()
            .then(client => {
                return client.query('insert into messages (title, body) values ($1, $2)', [req.body.title, req.body.body])
                    .then(results => {
                        client.release();
                        res.redirect('/results');
                        console.log(`Added new message to database ${results.rowCount}`)
                    })
                    .catch(error => {
                        client.release();
                        console.error(`Could not add new message ${error.stack}`)
                    })
            })
            .catch(error => {
                console.error(`Could not connect to database ${error.stack}`)
            })

    }

}