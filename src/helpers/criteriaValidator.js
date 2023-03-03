import mongoose from 'mongoose'

const isObjectIdValid = ( id ) => {
    return mongoose.Types.ObjectId.isValid( id )
}

exports.isObjectIdValid = isObjectIdValid