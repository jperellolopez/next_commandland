import {Schema, model, models} from 'mongoose' // models object stores all the registeres models

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'El email ya existe'],
        required: [true, 'El email es necesario']
    },
    username: {
        type: String,
        required: [true, 'Se requiere un nombre de usuario'],
        match: [/^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Nombre de usuario no válido, debe contener 8-20 carácteres alfanuméricos y ser único"]
    },
    image: {
        type: String
    }
})

// the route only will be created at the time is being called, which differs with a conventional server which is required to stay connected continuously.
const User = models.User || model('User', UserSchema)

export default User