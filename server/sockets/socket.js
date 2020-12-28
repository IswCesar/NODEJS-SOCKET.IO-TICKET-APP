const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket()
        console.log(nextTicket)
        callback(nextTicket)
    })

    // Emit current state when somebody connects
    client.emit('currentState', {
        current: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    })

    client.on('attendTicket', (data, callback) => {
        console.log(data)
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'Desktop needed'
            })
        }

        let attendTicket = ticketControl.attendTicket(data.desktop)

        callback(attendTicket)

        // update-notify changes in last 4
        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4()
        })
    })
});