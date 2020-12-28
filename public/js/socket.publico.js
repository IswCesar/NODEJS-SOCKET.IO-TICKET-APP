let socket = io()

let lblTicket1 = $('#lblTicket1')
let lblTicket2 = $('#lblTicket2')
let lblTicket3 = $('#lblTicket3')
let lblTicket4 = $('#lblTicket4')

let lblDesktop1 = $('#lblEscritorio1')
let lblDesktop2 = $('#lblEscritorio2')
let lblDesktop3 = $('#lblEscritorio3')
let lblDesktop4 = $('#lblEscritorio4')

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
let lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4]


socket.on('currentState', function(data) {
    updateHTML(data.last4)
})

socket.on('last4', function(data) {
    let audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    updateHTML(data.last4)
})



function updateHTML(last4) {
    for (let index = 0; index < last4.length; index++) {
        lblTickets[index].text('Ticket ' + last4[index].number)
        lblDesktops[index].text('Escritorio ' + last4[index].desktop)
    }
}