
const fs = require('fs');

class Contenedor {

    constructor(textJson) {
        this.textJson = textJson;
        this.data = []
        try {
            this.read()
        } catch (error) {
            this.write()
        }
    }

    read() {
        this.data = JSON.parse(fs.readFileSync(this.textJson));
    }

    write() {
        fs.writeFileSync(this.textJson, JSON.stringify(this.data));
    }
    
    save(obj) {
        obj['id'] = this.data.length + 1;
        this.data.push(obj)
        this.write()
    }

    getByID(id) {
        const objID = this.data.find(obj => obj.id == id)
        return objID
    }

    getAll() {
        return this.data
    }

    deleteByID(id) {
        const idx = this.data.findIndex(obj => obj.id == id)
        this.data.splice(idx, 1)
        this.write()
    }

    deleteAll() {
        this.data = []
        this.write()
    }

}
const contenedor = new Contenedor('data.json');


//Server
const express = require('express')
const {Router} = express
const app = express()
const router = Router()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public' , express.static('public'))

const PORT = 8080


router.get('/' , (req , res) => res.json(contenedor.getAll()) )

router.post('/' , (req , res) => { contenedor.save(req.body); res.json(req.body) } )


app.get('/api/productos/:id' , (req , res) => {
    const obj = contenedor.getByID(req.params.id)
    
    if (!obj) {
        res.status(404).send('No existe el producto')
    }   else {
        res.json(obj)
    }
})


app.delete('/api/productos/:id' , (req , res) => {
    contenedor.deleteByID(req.query.id)
    res.json('Producto eliminado')
})



app.use('/api/productos' , router) //modulo de rutas
app.listen(PORT , () => console.log(`Server is running on port ${PORT}`)) // escuchar en el puerto   
