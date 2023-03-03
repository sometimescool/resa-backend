import querystring from 'querystring';
import url from 'url';

const ensurePagingParams = ( stringUrl ) => {
    const params = querystring.parse( url.parse( stringUrl ).query );
    const limit = parseInt( params["limit"] || 0, 10 );
    let page = ( limit !== 0 ) ? parseInt( params["page"] || 1, 10 ) : 1;
    if ( page === 0 ) page = 1
    console.log( limit + ' ' + page )
    return {
        limit: limit,
        page: page
    }
}

const getPaging = ( limit, page ) => {
    let skip = null;
    let paging = {};
    if ( limit !== 0 ) {
        skip = ( page * limit ) - limit;
        paging.limit = limit;
        paging.skip = skip
    }
    return paging
}

const pagingMeta = ( count, limit, page ) => {
    return {
        "totalCount": count,
        "limit": ( limit !== 0 ) ? limit : count,
        "page": page
    }
}


exports.ensurePagingParams = ensurePagingParams;
exports.getPaging = getPaging;


exports.pagingMeta = pagingMeta