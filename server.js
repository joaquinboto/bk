//Server
const routerPerson = require('./router/personsRouter')



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public' , express.static('public'))
app.use('/api/productos' , routerPerson) //modulo de rutas
const PORT = 8080

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`)) // escuchar en el puerto   
