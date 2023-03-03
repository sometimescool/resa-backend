import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const clientSchema = new Schema( {
    firstName: {
        type: String,
        required: 'Entrer un prénom',
    },
    lastName: {
        type: String,
        required: 'Entrer un nom',
    },
    email: {
        type: String,
        validate: {
            validator: function ( v ) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test( v );
            },
            message: props => `${props.value} n'est pas une adresse mail valide`
        },
        required: `Entrer une adresse mail`,
    },
    phone: {
        type: Number,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
} );

const Client = mongoose.model( 'Client', clientSchema );

exports.Client = Client;
