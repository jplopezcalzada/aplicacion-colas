// Comando para establecer la conexión

var socket = io();
const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblTicket = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

const lblEscritorio = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// Escuchar
socket.on('connect', () => {
    console.log('Conectado al servidor');
});
socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', (resp) => {
    actulizarHTML(resp.ultimos4);
});

// Nuevo evento 'ultimos4'
socket.on('ultimos4', (resp) => {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.muted = true;
    audio.play();
    audio.muted = false;
    actulizarHTML(resp.ultimos4);
});

function actulizarHTML(ultimos4) {
    for (let i = 0; i < ultimos4.length; i++) {
        lblTicket[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorio[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}