import { Client, validate } from '../models/clientModel';
import { addEntity, getEntities, getEntity, updateEntity, deleteEntity } from '../controllers/entityController';
import { formatError } from '../helpers/clientError';
import { formatResponse } from '../helpers/clientResponse';
import { ensurePagingParams, pagingMeta } from '../helpers/paging';

//Client.events.on( "error", err => console.log( `============>${err.message}` ) )

const addClient = async ( req, res ) => {
    try {
        const client = await addEntity( Client, req.body );
        res.send( formatResponse( client ) )
    } catch ( err ) {
        if ( err.name === 'ValidationError' ) {
            res.status( 400 ).send( formatError( err ) )
            return
        }
        res.status( 500 ).send( formatError( err ) )
    }
};
const getClients = async ( req, res ) => {
    try {
        const pagingdParams = ensurePagingParams( req.url );
        const rep = await getEntities( Client, pagingdParams )
        res.json(
            formatResponse( rep.data, pagingMeta( rep.count, pagingdParams.limit, pagingdParams.page ) )
        )
    } catch ( err ) {
        res.status( 500 ).send( formatError( err ) )
    }
};
const getClient = async ( req, res ) => {
    try {
        const client = await getEntity( Client, req.params.id );
        if ( client ) {
            res.json( formatResponse( client ) )
            return
        }
        res.status( 404 ).json( formatResponse( client ) )
    } catch ( err ) {
        res.status( 500 ).send( formatError( err ) )
    }
};
const updateClient = async ( req, res ) => {
    try {
        const client = await updateEntity( Client, req.params.id, req.body );
        if ( client ) {
            res.json( formatResponse( client ) )
            return
        }
        res.status( 404 ).json( formatResponse( client ) )
    } catch ( err ) {
        if ( err.name === 'ValidationError' ) {
            res.status( 400 ).send( formatError( err ) )
            return
        }
        res.status( 500 ).send( formatError( err ) )
    }
}
const deleteClient = async ( req, res ) => {
    try {
        const resp = await deleteEntity( Client, req.params.id )
        if ( resp.deletedCount === 1 ) {
            res.json(
                formatResponse( null, resp )
            )
            return
        }
        res.status( 404 ).json(
            formatResponse( null, resp )
        )
    } catch ( err ) {
        res.status( 500 ).send( formatError( err ) )
    }
}

exports.addClient = addClient;
exports.getClients = getClients;
exports.getClient = getClient;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;