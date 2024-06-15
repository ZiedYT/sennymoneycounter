var socket = null
var gifted = {}
function subscription() {
	socket = io('https://realtime.streamelements.com', {
		transports: ['websocket']
	});

	socket.on('connect', () => {
		console.log('Successfully connected to the websocket')
		socket.emit('authenticate', { method: 'jwt', token: token })
	})

	socket.on('event', (data) => {
		amount = data.data.amount
		console.log(data)
		if (data.type == 'subscriber') {
			if(data.data.tier == "2000")
				current = current + 7
			else if(data.data.tier == "3000")
				current = current + 17.5
			else
				current = current + 3.5
		}
		else if (data.type == 'cheer') {
			current = current + data.data.amount/100
		}
		else if (data.type == 'tip'){
			current = current + data.data.amount
		}
		var num = Number(current) // The Number() only visualizes the type and is not needed
		var roundedString = num.toFixed(2);
		current = Number(roundedString); // toFixed() returns a string (often suitable for printing already)

		update()
	});
}

subscription()