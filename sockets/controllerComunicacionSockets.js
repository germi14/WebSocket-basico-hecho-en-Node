

const socketComunicacionControler = (socket) => {
    
    console.log('cliente conectado',socket.id)
    
    socket.on('disconnect', () => {
        console.log('cliente desconectado', socket.id);
    });


    socket.on('enviar-mensaje', (payload, callback) => { // el segundo argumento llamado callback es la referencia a la funcion "socketCliente.emit('enviar-mensaje', payload, (id) => {" hecha en el lado del socketCleinte
        const id = 123456;
        callback({ //Aca el servidor emite un mensaje por la misma via en que lo escucho, es decir el cliente que emita el evento es el unico que recibira esta respuesta
            id,
            fecha: new Date().getTime()
        }); 
        socket.broadcast.emit('enviar-mensaje',payload);// aca no tengo el io.emit asi que debe ser socket.emit, el .broadcast es enviale el mensaje a todos los clientes
    })
    
}


module.exports = {
    socketComunicacionControler
}