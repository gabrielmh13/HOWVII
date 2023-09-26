const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const { Executor } = require('./executor')

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'how'
})

con.connect((err) => {
    if(err){
        console.log(err)
        throw err
    }

    console.log("Connection with mysql established")
})

const app = express()
app.use(express.json())

app.use(cors({ origin: "*" }))

query = "SELECT \
                p.id, \
                DATE_FORMAT(p.data_do_pagamento, '%Y-%m-%d') AS data_do_pagamento, \
                p.valor_do_pagamento, \
                i.codigo_imovel, \
                i.descricao_imovel, \
                t.descricao AS tipo_imovel \
            FROM pagamento p \
            JOIN imovel i ON p.imovel_id = i.id \
            JOIN tipo_imovel t ON i.tipo_imovel_id = t.id"


app.get('/payments', async(req, res) => {
    con.query(query , (err, result) => {
        if(err){
            return res.json({error: err})
        }

        return res.status(200).json(result)
    })
})

// Letra a)
app.get('/payments/property', async(req, res) => {
    con.query(query , (err, result) => {
        if(err){
            return res.json({error: err})
        }

        const output = Executor.sumPerProperty(result)

        return res.status(200).json(output)
    })
})

// Letra b)
app.get('/payments/month', async(req, res) => {
    con.query(query , (err, result) => {
        if(err){
            return res.json({error: err})
        }

        const output = Executor.sumPerMonth(result)

        return res.status(200).json(output)
    })
})

// Letra c)
app.get('/payments/property-type/percentage', async(req, res) => {
    con.query(query , (err, result) => {
        if(err){
            return res.json({error: err})
        }

        const output = Executor.percentagePerPropertyType(result)

        return res.status(200).json(output)
    })
})


app.listen(9000, () => {
    console.log('Server running on port 9000')
})