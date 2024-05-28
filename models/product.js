module.exports = class productmodel{
    constructor(object){
        this.productName = object.productName;
        this.productWeight = object.productWeight;
        this.productWeightMetrics = object.productWeightMetrics;
        this.productHeight = object.productHeight;
        this.productHeightMetrics = object.productHeightMetrics;
        this.productColors = object.productColors;
        this.productDescription=object.productDescription;
    }
    validator(){
        const productnamepattern =/^[A-Za-z0-9\s-.]{5,29}$/;
        const productweightpattern =/^\d+(\.\d+)?$/;
        const productweightmetricspattern =/^(kg|g)?$/;
        const productheightpattern=/^\d+(\.\d+)?$/;
        const productheightmetricspattern=/^(cm|m|in)?$/;
       // const productcolorspattern =/^('+colors.join('|')+')$/;
        const productdescriptionpattern =/^[A-Za-z\s.]+$/;
        const validation = {
            message:[],
            status:true
        }


        
    if(!productnamepattern.test(this.productName)){
        validation.message.push("invalid productname");
        validation.status = false;
    }
    if(!productweightpattern.test(this.productWeight)){
        validation.message.push("invalid productweight");
        validation.status = false;
    }
    if(!productweightmetricspattern.test(this.productWeightMetrics)){
        validation.message.push("invalid productweightmetrics");
        validation.status = false;
    }
    
    if(!productheightpattern.test(this.productHeight)){
        validation.message.push("invalid productheight");
        validation.status = false;
    }
    if(!productheightmetricspattern.test(this.productHeightMetrics)){
        validation.message.push("invalid productheightmetrics");
        validation.status = false;
    }
   /* if(!productcolorspattern.test(this.productColors)){
        validation.message.push("invalid productcolors");
        validation.status = false;
    }*/
    if(!productdescriptionpattern.test(this.productDescription)){
        validation.message.push("invalid productdescription");
        validation.status = false;
    }

    return validation;
}

    
}
    


