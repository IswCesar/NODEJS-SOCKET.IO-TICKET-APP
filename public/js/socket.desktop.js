let socket = io()

let searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('Desktop needed')
}

let desktop = searchParams.get('escritorio')
let label = $('small')


$('h1').text('Escritorio ' + desktop)

$('button').on('click', function() {
    socket.emit('attendTicket', {
        desktop: desktop
    }, function(resp) {
        if (resp === 'No more tickets') {
            label.text(resp)
            alert(resp)
            return
        }
        label.text('Ticket ' + resp.number)
    })
})