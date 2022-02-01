//Configuracion del servidor utilizando el paquete externo express, aca se definen los path de las rutas de la aplicacion 

const express = require('express')
const cors= require('cors');
const { socketComunicacionControler } = require('../sockets/controllerComunicacionSockets');

class Server{

    constructor() {
      this.app      = express();
      this.port     = process.env.PORT;
      this.server   = require('http').createServer(this.app);
      this.io       = require('socket.io')(this.server); // El io es toda la informacion de los sockets conectados, se puede utilizar io para mandarle un mensaje a todas las personas que se encuentren conectadas a mi backend
      // middlewares
      this.middlewares();

      // Rutas de mi aplicacion
      this.routes();

      // Path para manejo de eventos de sockets
      this.sockets();
    
    }

    middlewares(){

        //CORS
        this.app.use( cors() );
        
        //Directorio publico
        this.app.use( express.static('public') ); // Directorio Publico

    }

    routes(){ 

        // this.app.use( this.authPath, require('../routes/authRoutes'));
        // this.app.use( this.buscarPath, require('../routes/buscarRoutes'));
        
    }

    sockets(){
        this.io.on("connection", socketComunicacionControler)

            /* Esto fue comentado porque sera trabajado con un controlador, el segundo argumento de mi this.io.on ahora sera el controlador y todo este codigo estara dentro de el

            socket.on('disconnect', () => {
                //console.log('cliente desconectado');
            })


            socket.on('enviar-mensaje', (payload, callback) => { // el segundo argumento llamado callback es la referencia a la funcion "socketCliente.emit('enviar-mensaje', payload, (id) => {" hecha en el lado del socketCleinte
                const id = 123456;
                callback({
                    id,
                    fecha: new Date().getTime()
                }); //Aca el servidor emite un mensaje por la misma via en que lo escucho, es decir el cliente que emita el evento es el unico que recibira esta respuesta
                //this.io.emit('enviar-mensaje',payload);// De esta manera el io.emit emite un mensaje a todos los clientes conectados
            })
            
        });*/
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}


module.exports = Server;