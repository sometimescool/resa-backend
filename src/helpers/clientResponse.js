const formatResponse = ( data, meta ) => {
    let response = {
        "data": data
    }
    if ( meta ) {
        response.meta = meta
    }
    return response;
}
exports.formatResponse = formatResponse