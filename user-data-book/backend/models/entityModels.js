import mongoose from 'mongoose'
import User from './userModels.js'

const entitySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: User.modelName
    },
    tableName: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phoneNumber: { type: Number },
    dob: { type: Date }
}, {
    timestamps: true,
    versionKey: false
})


const Entitie = mongoose.model('Entities', entitySchema);

export default Entitie