

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
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query= this.query.sort('-createdAt')
        }
        return this;
    }
    limitFields(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate(){
        const page = this.queryStr.page*1 || 1;
        const limits = this.queryStr.limit*1 || 10;
        //PAGE 1: 1- 10 ;PAGE 2:11 -20 ; PAGE 3: 21 - 30 
        const skip =(page - 1) * limits;
        this.query = this.query.skip(skip).limit(limits)
        //Showing error
        // if(this.queryStr.page){
        //     const moviesCount =await Movie.countDocuments();
        //     if(skip >=moviesCount){
        //         throw new Error("This page is not found!")
        //     }
        // }
        return this;
    }



}

module.exports = Apifeatures