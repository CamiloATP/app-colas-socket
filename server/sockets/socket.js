const { io } = require('./../server');
const { TicketControl } = require('./../class/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('ticketActual', {
        ticket: ticketControl.actual(),
        ultimos_4: ticketControl.ultimos_4()
    });

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio) {
            return callback({
                err: true, 
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        if(atenderTicket) {
            callback(atenderTicket);
            // Actualizar o notificar cambios en los ultimos 4
            client.broadcast.emit('ultimos_4', {ultimos_4: ticketControl.ultimos_4()});
        }
    });

    client.on('disconnect', () => {
        console.log('Usuario desconectado...');
    });
});