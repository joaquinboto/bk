
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
contenedor.save({nombre: 'Remera' , precio: '100' , cantidad: '10'})
contenedor.save({nombre: 'Camisa' , precio: '200' , cantidad: '20'})
contenedor.save({nombre: 'Pantalon' , precio: '300' , cantidad: '30'})


module.exports = Contenedor;












