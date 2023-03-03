import { logError } from "./log"

const formatError = ( err ) => {
    logError( err )
    return {
        "error": {
            "message": err.message,
            "stack": err.stack,
            "name": err.name,
            "string": err.toString(),
            "errors": err.errors
        }
    }
}

exports.formatError = formatError