
const logContent = ( content ) => {
    console.log( content )
}

const logError = ( err ) => {
    console.log( "================ Error =====================" )
    console.log( err )
    console.log( "============================================" )
}
exports.logContent = logContent
exports.logError = logError