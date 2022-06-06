const { Router } = require('express')
const router = Router()
const Contenedor = require('../js')
const contenedor = new Contenedor('data.json');

router.get('/' , (req , res) => res.json(contenedor.getAll()) )

router.post('/' , (req , res) => { contenedor.save(req.body); res.json(req.body) } )

router.get('/:id' , (req , res) => {
    const obj = contenedor.getByID(req.params.id)
    
    if (!obj) {
        res.status(404).send('No existe el producto')
    }   else {
        res.json(obj)
    }
})

router.delete('/:id' , (req , res) => {
    contenedor.deleteByID(req.query.id)
    res.json('Producto eliminado')
})


module.exports = router

