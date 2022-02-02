
//Aca estoy del lado del cliente

//Referencias del HTML
const lblOnline     = document.querySelector('#lblOnline');
const lblOffline    = document.querySelector('#lblOffline');

const txtMensaje    = document.querySelector('#txtMensaje');
const btnEnviar     = document.querySelector('#btnEnviar');


const socketCliente = io();


socketCliente.on('connect', ()=>{ // El on es para estar escuchando algun evento en el servidor, en este caso el evento de cuando alguien se conecte


    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

}) //Este listener me va ayudar a saber cuando el cliente se conecta al servidor

socketCliente.on('disconnect', ()=>{ 
    console.log('Desconectado del servidor');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';

}) //Este listener me va ayudar a saber cuando el cliente se desconecta al servidor

socketCliente.on('enviar-mensaje', (payload)=> { // el argumento payload viene del server del evento "enviar-mensaje" que se esta emitiendo por el lado del server, aca ahora se esta escuchando ese evento
    console.log(payload);
})

//Aca envio un mensaje desde el front al backend

btnEnviar.addEventListener('click', ()=>{ // el boton estara escuchando el evento click, y cuando se presione va a disparar el callback, lo que quiere decir que cada vez que se presione se va hacer referencia al mensaje que quiero enviar 

    const mensaje = txtMensaje.value; //Esto toma el valor ingresado en la caja de texto

    const payload = mensaje;
    
    socketCliente.emit('enviar-mensaje', payload, (id) => { //El tercer argumento es un callback que va a recibir lo que sea que haya sido enviado del server
        console.log('desde el server',id);
    });

});

