import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; // conversion entre le serveur et la db
import clientRoutes from './routes/clientRoutes';

dotenv.config()

const app = express();
const PORT = 3000;

// connexion mongoose
mongoose.Promise = global.Promise;
mongoose.set( 'strictQuery', true )
mongoose.connect( process.env.mongoDb, {
    useNewUrlParser: true,
} )

// bodypaser
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )

// Routes
app.use( '/api/clients', clientRoutes )


app.get( '*', ( req, res ) => {
    res.send( `Route inexistante` )
} )

app.listen( PORT, () =>
    console.log( `Serveur sur port ${PORT}` )
)