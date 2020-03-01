
let socket = io();

// socket.on('connect', () => {
//     console.log('Conectado al servidor');
// });

// socket.on('disconnect', () => {
//     console.log('Desconectado del servidor');
// });

// Leer escritorio por la url
let searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');

let h1 = document.getElementsByTagName('h1')[0];

if(h1) {
    h1.textContent += ' ' + escritorio;
}

let small = document.getElementsByTagName('small')[0];
let button = document.getElementsByTagName('button')[0];

if(button) {
    button.onclick = () => {
        socket.emit('atenderTicket', {
            escritorio,

        }, (resp) => {
            if(small)
            {
                if(resp === 'No hay tickets') 
                {
                    small.textContent = resp;
                    alert(resp);
                    return;
                }

                small.textContent = resp.numero;
            }
        });

    }
}