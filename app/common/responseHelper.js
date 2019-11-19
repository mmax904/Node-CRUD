export class responseHelper{
    
    createResponseObject(error,results){
        return {
            error: error,
            results: results === undefined ? null : results === null ? null : JSON.stringify(results)
        }
    }

    rejectReponse(ex){
        return this.createResponseObject(ex,null);
    }

    resolveReponse(result){
        return this.createResponseObject(null,result);
    }

}