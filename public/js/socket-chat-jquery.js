// Funciones para renderizar usuarios
var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre')
var sala = params.get('sala')

// referencias jquery
var divUsuarios = $('#divUsuarios')
var formEnviar = $('#formEnviar')
var txtMensaje = $('#txtMensaje')
var divChatbox = $('#divChatbox')

function renderizarUsuarios(personas) { //[{}, {}, {}]

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '   <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html)
}

function renderizarMensajes(mensaje, yo) {
    var html = ''
    var fecha = new Date(mensaje.fecha)
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Admin') {
        adminClass = 'danger'
    }

    if (yo) {
        html += '<li class="reverse">'
        html += '    <div class="chat-content">'
        html += '        <h5>' + mensaje.nombre + '</h5>'
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>'
        html += '    </div>'
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '    <div class="chat-time">' + hora + '</div>'
        html += '</li>'

    } else {
        if (mensaje.nombre === 'Admin') {
            html += '<li class="animated fadeIn" style="text-align: center">'
            html += '    <div class="chat-content">'
            html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>'
            html += '    </div>'
            html += '</li>'
        } else {
            html += '<li class="animated fadeIn">'
            html += '    <div class="chat-img"><img src="assets/images/users/3.jpg" alt="user" /></div>'
            html += '    <div class="chat-content">'
            html += '        <h5>' + mensaje.nombre + '</h5>'
            html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>'
            html += '    </div>'
            html += '    <div class="chat-time">' + hora + '</div>'
            html += '</li>'
        }
    }

    divChatbox.append(html)
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
// Escuchar todos los clicks de todos los <a> dentro de divUsuarios
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id') //hace referencia a 'a'

    //para ignorar los a que no queramos, como el de "Chat de x"
    if (id) {
        console.log(id);
    }
})

formEnviar.on('submit', function(event) {
    event.preventDefault(); //cuando pulsemos enter no va a hacer submit

    // si el mensaje está vacío, no hagas nada
    if (txtMensaje.val().trim().length === 0) {
        return
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
})