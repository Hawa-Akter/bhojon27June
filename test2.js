const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./test.db');

let sql = `SELECT invoice invoice FROM test`;

db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    else {
        if (rows.length === 0) {
            var d = new Date().toLocaleDateString("sv-SE")
            db.run(`INSERT INTO test (id, name, invoice, token, dateTime) VALUES(?, ?, ?, ?, ?)`, [1, "Rafiul", "0001", "0001", d], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log(`A row has been inserted with rowid ${this.lastID}`)
            })
        }
        else {
            let sql = `select dateTime datetime, invoice invoice from test ORDER BY invoice DESC, datetime DESC LIMIT 1`
            db.all(sql, [], (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    var d = new Date().toLocaleDateString("sv-SE")
                    let lastDate = rows[0].datetime;
                
                    if (lastDate === d) {
                        let lastInvoiceNo = rows[0].invoice;
                        let lastDigit = parseInt(lastInvoiceNo);

                        let convertToInt = parseInt(lastDigit);
                        convertToStr = (convertToInt + 1).toString()

                        let stringFormat = counter(convertToStr)

                        db.run(`INSERT INTO test (id, name, invoice, token, dateTime) VALUES(?, ?, ?, ?, ?)`, [5, "Air", stringFormat, stringFormat, d], function (err) {
                            if (err) {
                                return console.log(err.message);
                            }
                            console.log(`A row has been inserted with rowid ${this.lastID}`)
                        })
                    }
                    else {
                        db.run(`INSERT INTO test (id, name, invoice, token, dateTime) VALUES(?, ?, ?, ?, ?)`, [1, "Badhon", "0001", "0001", d], function (err) {
                            if (err) {
                                return console.log(err.message);
                            }
                            console.log(`A row has been inserted with rowid ${this.lastID}`)
                        })
                    }
                }
            })
        }
    }
});

db.close();

function counter(val) {
    var len = val.length
    if (len == 1) {
        return "000" + val
    }
    else if (len == 2) {
        return "00" + val
    }
    else if (len == 3) {
        return "0" + val
    }
    else {
        return val
    }
}