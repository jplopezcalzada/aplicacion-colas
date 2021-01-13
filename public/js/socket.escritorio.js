// Comando para establecer la conexión

var socket = io();


// Escuchar la conexion del servidor
socket.on('connect', () => {
    console.log('Conectado al servidor');
});
socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});


var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');
const label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, (resp) => {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);

    });
});