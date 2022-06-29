const express = require('express')
const { randomUUID } = require('crypto')
const fs = require('fs')

const app = express()

app.use(express.json())

let products = []

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        products = JSON.parse(data)
    }
})


app.post('/products', (req, res) => {
    
    const { name, price } = req.body

    const new_product = {
        id: randomUUID(),
        name,
        price
    }

    products.push(new_product)

    updateProductFile()
})


app.get('/products', (req, res) => {
    return res.json(products)
})


app.get('/products/:id', (req, res) => {
    const { id } = req.params
    const product = products.find(item => item.id === id)

    return res.json(product)
})


app.put('/products/:id', (req, res) => {
    const { id } = req.params
    const { name, price } = req.body
    const product_index = products.findIndex(item => item.id === id)
    
    products[product_index] = {
        ...products[product_index],
        name,
        price
    }

    updateProductFile()

    return res.json({message: "Produto alterado com sucesso!"})
})


app.delete('/products/:id', (req, res) => {
    const { id } = req.params
    const product_index = products.findIndex(item => item.id === id)

    products.splice(product_index, 1)

    updateProductFile()

    return res.json({message: "Produto excluído com sucesso!"})
})


function updateProductFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Novo produto inserido')
        }
    })
}


app.listen(3003, () => console.log("Servidor rodando na porta 3003"))