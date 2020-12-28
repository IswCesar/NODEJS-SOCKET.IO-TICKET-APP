const fs = require('fs')

class Ticket {
    constructor(number, desktop) {
        this.number = number
        this.desktop = desktop
    }
}

class TicketControl {

    constructor() {
        this.last = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.last4 = []

        let data = require('../data/data.json')

        if (data.today === this.today) {
            this.last = data.last
            this.tickets = data.tickets
            this.last4 = data.last4
        } else {

            this.restartCounter()
        }
    }

    // Just increment by one the next ticket
    nextTicket() {
        this.last += 1
        let ticket = new Ticket(this.last, null)
        this.tickets.push(ticket)
        this.writeFile()
        return `Ticket ${this.last}`
    }

    getLastTicket() {
        return `Ticket ${this.last}`
    }

    getLast4() {
        return this.last4
    }

    attendTicket(desktop) {
        // Check pending tickets exist
        if (this.tickets.length === 0) {
            return 'No more tickets'
        }

        // Get first ticket
        let ticketNumber = this.tickets[0].number

        // Delete ticket in first position
        this.tickets.shift()

        // Create the new ticket that will attend it
        let attendTicket = new Ticket(ticketNumber, desktop)

        // Add element to the first of the array in the last 4 attended
        this.last4.unshift(attendTicket)

        // Check array not have more than 4 elments
        // if it has, then delete 1 item
        if (this.last4.length > 4) {
            // Delete last item in array
            this.last4.splice(-1, 1)
        }

        console.log('Last 4:')
        console.log(this.last4)
        this.writeFile();
        return attendTicket
    }

    // Restart server values (for new day)
    restartCounter() {
        this.last = 0
        this.tickets = []
        this.last4 = []
        console.log('System restarted')
        this.writeFile()
    }

    // Write new values in json file
    writeFile() {
        // Create JSON OBJECT
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }

        // PASS JSON OBJECT TO STRING FOR CAN WRITE IN DATA.JSON
        let jsonDataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server/data/data.json', jsonDataString)

    }

}

module.exports = {
    TicketControl
}