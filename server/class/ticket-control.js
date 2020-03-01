const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosTickets = [];
        
        let data = require('./../data/data');

        if(data.hoy === this.hoy) {
            this.ultimo =  data.ultimo;
            this.tickets = data.tickets;
            this.ultimosTickets = data.ultimosTickets;
        }else {
            this.reiniciarConteo();
            console.log('Se ha inicializado el sistema');
        }
    }

    siguiente() {
        this.ultimo++;
        
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosTickets = [];
        this.grabarArchivo();
    }

    actual() {
        return `Ticket ${this.ultimo}`;
    }

    ultimos_4() {
        return this.ultimosTickets;
    }

    atenderTicket(escritorio) {
        if(this.tickets.length === 0) return 'No hay tickets';

        let numeroTicket = this.tickets[0].numero;
        
        // Eliminar el primer elemento del array
        this.tickets.shift();
        
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // Agregar al principio del array
        this.ultimosTickets.unshift(atenderTicket);
        
        // Eliminar el ultimo elemento del array
        // this.ultimosTickets.splice(-1, 1);
        if(this.ultimosTickets.length > 4) this.ultimosTickets.pop();

        // console.log('Ultimos 4');
        // console.log(this.ultimosTickets);

        this.grabarArchivo();

        return atenderTicket;
    }

    grabarArchivo() {
        let json = JSON.stringify({ 
            ultimo: this.ultimo, 
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosTickets: this.ultimosTickets
        });
        fs.writeFileSync('./server/data/data.json', json);
    }
}

module.exports = {
    TicketControl
}