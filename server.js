const Contenedor = require('./js')
const contenedor = new Contenedor('data.json')
//Server
const express = require('express')
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine' , 'ejs')
app.set('views' , './views')



let productos = contenedor.getAll()
//desafio

app.get('/' , (req , res) => {
    res.render('index.ejs', {productos})
})

app.get('/productos' , (req, res) => {
    res.render('indexProduct.ejs' , {productos})
})

app.post('/productos' , (req , res) => {
    let producto = req.body
    contenedor.save(producto)
    res.redirect('/')
})



app.listen(PORT , () => console.log(`Server is running on port ${PORT}`)) // escuchar en el puerto   
