import { getPaging, pagingMeta } from '../helpers/paging';
import mongoose from 'mongoose';

/**
 * Enregistre dans mondodb une entité
 * La méthode "save" execute la validation du modele (catch en cas d'erreur)
 * @param {*} Model : un model mongoose
 * @param {*} data  : les données : {"xxx":"value1", "yyy:value2"}
 * @returns un object json : l'entité ajoutée({"_id":"xxxxxxxxxxx","xxx":"value1", "yyy:value2"})
 */
const addEntity = async ( Model, data ) => {
    let entity = new Model( data );
    const newEntity = await entity.save() // save do validattion
    return newEntity
};

/**
 * recupère une collection dans mondodb, limitée ou non + pagination.
 * limit = 0 pout toute la collection
 * 
 * @param {*} Model  : un model mongoose
 * @param {*} param1 {nombre d'occurences à retourner, numéro de page 1 pour la première page}
 * @returns  un object json : { "data": array d'entités, "count":nombre total d'eléments dans la collection}
 */
const getEntities = async ( Model, { limit, page } ) => {
    const count = await Model.estimatedDocumentCount();
    const entities = await Model.find( {}, {}, getPaging( limit, page ) );
    return { "data": entities, "count": count }
};

const getEntity = async ( Model, id ) => {
    let entity = null
    if ( mongoose.isValidObjectId( id ) ) {
        entity = await Model.findById( id );
    }
    return entity
};

const updateEntity = async ( Model, id, data ) => {
    let entity = null
    if ( mongoose.isValidObjectId( id ) ) {
        await Model.validate( data )
        entity = await Model.findOneAndUpdate( { _id: id }, data, { new: true } )  // findOneAndUpdate do not validattion
    }
    return entity;
}

const deleteEntity = async ( Model, id ) => {
    let entity = null
    if ( mongoose.isValidObjectId( id ) ) {
        entity = await Model.deleteOne( { _id: id } )
        entity["_id"] = id
    } else {
        entity = {
            "-id": id,
            "deletedCount": 0
        }
    }
    return entity
}

exports.addEntity = addEntity;
exports.getEntities = getEntities;
exports.getEntity = getEntity;
exports.updateEntity = updateEntity;
exports.deleteEntity = deleteEntity;