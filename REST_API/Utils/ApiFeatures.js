

class Apifeatures{
    constructor(query,queryStr){
        this.query = query  // <- this.query
        this.queryStr = queryStr   //<- req.query 
    }

    filter(){
        let excludeFields = ['sort','page','limit','fields'];
        const queryObj = {...this.queryStr}
        // console.log(queryObj)
    
        excludeFields.forEach((el)=>{
            delete queryObj[el];
        })
        // console.log(queryObj)
        //ADDING DOLLOR SIGN
        let queryStr1 = JSON.stringify(queryObj);
        // gte
        queryStr1 = queryStr1.replace(/\b(gte|gt|lt|lte)\b/g,(match)=>`$${match}`)
        
        let queryObj2 = JSON.parse(queryStr1);
        this.query=this.query.find(queryObj2);
        return this 
    }

    sort(){
        //SORTING 

    if(this.queryStr.sort){
        const sortBy = this.queryStr.sort
        this.query = this.query.sort(sortBy)
    }
    return this
    }

    limit_fields(){
        
    }

    paginate(){}



}

module.exports = Apifeatures