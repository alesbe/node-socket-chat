const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utils/utilidades')

const usuarios = new Usuarios();

// ====================
//   SOCKETS SERVIDOR
// ====================

io.on('connection', (client) => {

    // Cuando el cliente entra al chat
    client.on('entrarChat', (data, callback) => {

        //Si no tiene nombre, fuera
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        client.join(data.sala);

        //Agrega la persona a la lista de usuarios
        usuarios.agregarPersona(client.id, data.nombre, data.sala)

        //Broadcast la nueva lista de personas
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala))
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unió`))

        //Hace un callback de la lista de personas
        callback(usuarios.getPersonasPorSala(data.sala));
    })

    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona.nombre, data.mensaje)
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

        callback(mensaje)
    })

    // Cuando el cliente se desconecta
    client.on('disconnect', () => {
        // Quita la persona de la lista
        let personaBorrada = usuarios.borrarPersona(client.id)

        //Crea un mensaje y lista la nueva lista de personas
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} salió del chat`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala))
    })

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

});