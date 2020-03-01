let lblTicket1 = document.getElementById('lblTicket1');
let lblEscritorio1 = document.getElementById('lblEscritorio1');

let lblTicket2 = document.getElementById('lblTicket2');
let lblEscritorio2 = document.getElementById('lblEscritorio2');

let lblTicket3 = document.getElementById('lblTicket3');
let lblEscritorio3 = document.getElementById('lblEscritorio3');

let lblTicket4 = document.getElementById('lblTicket4');
let lblEscritorio4 = document.getElementById('lblEscritorio4');

let tickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let escritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// Comando para establecer la conexion
let socket = io();

// socket.on('connect', () => {
//     console.log('Conectado al servidor');
// });

// socket.on('disconnect', () => {
//     console.log('Desconectado del servidor');
// });

socket.on('ticketActual', data => {
    actualizarHTML(data.ultimos_4);
});

socket.on('ultimos_4', (data) => {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(data.ultimos_4);
});

function actualizarHTML(ultimos_4) {
    for (let i = 0; i < ultimos_4.length; i++) {
        tickets[i].textContent = 'Ticket: '+ ultimos_4[i].numero;
        escritorios[i].textContent = 'Escritorio: '+ ultimos_4[i].escritorio;
    }
}