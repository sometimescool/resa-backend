import { getPaging, pagingMeta } from '../helpers/paging';
import mongoose from 'mongoose';

const addEntity = async ( Model, data ) => {
    let entity = new Model( data );
    const newEntity = await entity.save() // save do validattion
    return newEntity
};
const getEntities = async ( Model, { limit, page }, res ) => {
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