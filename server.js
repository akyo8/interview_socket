const httpServer = require('http')
	.createServer((req, res) => {
		// serve the index.html file
	})
	.listen(3000);
const io = require('socket.io')(httpServer, { origins: '*:*' });

let webSocket = io.on('connection', (socket) => {
	console.log(`connect: ${socket.id}`);

	// socket.on('hello', () => {
	// 	console.log(`hello from ${socket.id}`);
	// });

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
