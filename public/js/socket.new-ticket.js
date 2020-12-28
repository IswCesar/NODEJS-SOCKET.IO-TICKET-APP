// comand for set socket conection

let socket = io()
let label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Connected to the server')
})

socket.on('disconnect', function() {
    console.log('Desconnected from the server')
})

socket.on('currentState', function(resp) {
    label.text(resp.current)
})

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket)
    })
})