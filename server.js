const io = require('socket.io')();

let webSocket = io.on('connection', (socket) => {
	console.log(`connect: ${socket.id}`);

	socket.on('hello', () => {
		console.log(`hello from ${socket.id}`);
	});

	socket.on('from-mobile-app', (data) => {
		try {
			console.log(data);
			webSocket.emit('from-back-end', data);
		} catch (error) {
			console.log('error', error);
		}
	});

	socket.on('disconnect', () => {
		console.log(`disconnect: ${socket.id}`);
	});
});

io.listen(4000);

setInterval(() => {
	io.emit('message', new Date().toISOString());
}, 1000);
