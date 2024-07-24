class ApiFeatures{
    constructor(mongooseQuery,data){
        this.mongooseQuery=mongooseQuery
        this.data=data

    }

    pagination(){
        let {page,limit}=this.data
        if(!limit||limit<=0 ){
            limit=4
    }
        if(!page||page<=0 ){
            page=1
    }
    const skip=(Number(page)-1)*Number(limit)
    this.mongooseQuery.limit(limit).skip(skip)
    return this
    }

    sort(){
        if(this.data.sort){
            this.mongooseQuery.sort(this.data.sort.replaceAll(',',' '))
            return this
        }
        return this
    }

        fields(){
            if(this.data.fields){
                console.log('hh')
                this.mongooseQuery.select(this.data.fields.replaceAll(',',' '))
                return this
            }
            
        return this
    }
    search(field1,field2){
        if(this.data.search){
            this.mongooseQuery.find({
                $or:[
                    {[field1]:{$regex:this.data.search}},
                    {[field2]:{$regex:this.data.search}}
                ]
            })
            return this
        }
        
    return this
}
}


export default ApiFeatures