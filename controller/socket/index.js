const socketFunctions = { 
    "input-change" : (socket, msg) => { 
        socket.broadcast.emit('update-input', msg)
    }
}

export default (socket) => { 
    for (let i in socketFunctions) { 
        socket.on(i, msg => { 
            socketFunctions[i](socket, msg)
        })
    }
}