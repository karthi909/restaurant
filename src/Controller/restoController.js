const restoModel = require('../Model/restaurantsModel')

const createResto = async (req, res)=>{
    
    try{
    let data = req.body
    let {resto_name, resto_discription, location } = data;

    if(!resto_name) return res.status(400).send({status: false, msg:"Please give resto_name feild"})
    if(!resto_discription) return res.status(400).send({status: false, msg:"Please give resto_discription feild"})
    if(!location) return res.status(400).send({status: false, msg:"Please give location feild"})
   


    

   

    let newData = await restoModel.create(data);

    res.status(201).send({status: true, data: newData})

    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
}



const rateResto = async (req, res)=>{
    try{

        let restId = req.params.restoid

        if(!restId) return res.status(400).send({status: false, msg:"Please give restId in path params"})
        //console.log(restId)
        let data = req.body

        let {rate} = data
        
        if(rate <= 0 || rate > 5){
            res.status(400).send({status: false, msg:"Rating sholud be between 0-5"})
        }


        let doc = await restoModel.findOne({_id: restId, isDeleted: false})

        let arr = doc.ratings
        arr.push(rate)
        console.log(arr)
       //doc.numberOfRatings = rts.length

       let total = arr.reduce((acc, curr)=>{
                    acc=acc+curr
                    return acc
       }, 0)

       let lt = total/arr.length

       let newData = await restoModel.findOneAndUpdate({_id: restId, isDeleted: false}, {ratings: arr, numberOfRatings: arr.length, avg_rating: lt}, {new: true});

        res.status(201).send({status: true, data:newData  });

    } catch(err){
        console.log(err)
        res.status(501).send({ status: false, Error: err})
    }
}


const getResto = async (req, res)=>{
    try{
        const data = req.body;
        const {latitude, longitude, radius} = data

        if(!latitude) return res.status(400).send({status: false, msg:"Please give latitude feild"})
        if(!longitude) return res.status(400).send({status: false, msg:"Please give longitude feild"})
        if(!radius) return res.status(400).send({status: false, msg:"Please give radius feild"})


        let newData = await restoModel.find({ location: { 
            $near:{
                $geometry:{
                    type:"Point",
                    coordinates: [latitude, longitude]
                },
                $maxDistance: radius
            }
        }}).select({isDeleted:0,__v:0, createdAt:0, updatedAt:0})

        //console.log(newData)

        res.status(200).send({status: true, data: newData})


    } catch(err){
        console.log(err)
        res.status(501).send({ status: false, Error: err})
    }
}

const restoUpdate = async (req, res)=>{
    try{
        let restoId = req.params.restoid
        if(!restoId) return res.status(400).send({status: false, msg:"Please give restoId in path params"})

        let data = req.body

        let {resto_name, resto_discription, location } = data;

        if(!data) return res.status(400).send({status: false, msg:"Please provide data to update"})

        let newData = await restoModel.findOneAndUpdate({_id: restoId, isDeleted: false},{
            resto_name, resto_discription, location
        },{new: true})

        res.status(201).send({status: true, data: newData})
    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
}

const deleteResto = async (req, res)=>{
    try{
        let restoId = req.params.restoid
        if(!restoId) return res.status(400).send({status: false, msg:"Please give restoId in path params"})

    

       let s =  await restoModel.findOneAndUpdate({_id: restoId, isDeleted: false}, {isDeleted: true})

       if(!s) return res.status(404).send({status: false, msg:`resto with this id ${restoId} already deleted or doesn't exist`})


        res.status(201).send({status: true, msg:'Deleted Successfully'});


    } catch(err){
        res.status(501).send({ status: false, Error: err})  
    }
}

 

module.exports.createResto = createResto
module.exports.deleteResto = deleteResto
module.exports.restoUpdate= restoUpdate
module.exports.getResto= getResto
module.exports.rateResto= rateResto
