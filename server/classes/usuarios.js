/*
{
    id: 'KGkhAD-ASasdg23',
    nombre: 'test',
    sala: 'Videojuegos'
}
*/

class Usuarios {
    constructor() {
        this.personas = []
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala }
        this.personas.push(persona);

        return this.personas
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id)

        //reemplaza la lista actual por la lista de personas filtrada sin la persona con la id que le hayamos pasado
        this.personas = this.personas.filter(persona => persona.id != id)

        return personaBorrada
    }

    getPersona(id) {
        // el [0] es para que devuelva estrictamente un solo registro
        let persona = this.personas.filter(persona => persona.id === id)[0]

        return persona // si encuentra una persona, devolverá un objeto, si no, null o undefined
    }

    getPersonas() {
        return this.personas
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala)
        return personasEnSala
    }

}

module.exports = {
    Usuarios
}