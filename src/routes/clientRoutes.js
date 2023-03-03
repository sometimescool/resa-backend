import express from 'express';
import { addClient, getClients, getClient, updateClient, deleteClient } from '../controllers/clientController';

const router = express.Router();

router.get( '/', getClients );
router.get( '/:id', getClient );
router.post( '/', addClient );
router.put( '/:id', updateClient );
router.delete( '/:id', deleteClient );
router.all( '*', ( req, res ) => {
    res.status( 404 ).send( `${req.baseUrl}${req.url} Route inexistante` )
} );

export default router