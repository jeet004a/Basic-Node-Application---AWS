import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 Character']
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 Character']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Eamil must at least 5 Character']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    salt: {
        type: String,
        required: true,
        select: false
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User