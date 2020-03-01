
// Comando para establecer la conexion
let socket = io();

// socket.on('connect', () => {
//     console.log('Conectado al servidor');
// });

// socket.on('disconnect', () => {
//     console.log('Desconectado del servidor');
// });

let button = document.getElementsByTagName('button')[0];
let label = document.getElementById('lblNuevoTicket');

if(label) {
    socket.on('ticketActual', (data) => {
        console.log(data);
        label.innerHTML = data.ticket;
    });
}

if(button && label) {
    button.onclick = () => {
        // Para pedir el siguiente ticket
        socket.emit('siguienteTicket', null, (siguienteTicket) => {
            label.innerHTML = siguienteTicket;
        });        
    }
}