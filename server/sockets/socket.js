const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')


let ticketControl = new TicketControl();
io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        console.log(siguiente);
    });

    // emitir 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        console.log(data.escritorio);
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        const atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        // Emitir evento para actualiar 4 ultimos
        // 'ulitmos4'
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });


});