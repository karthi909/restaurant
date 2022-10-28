const restoModel = require('../Model/restaurantsModel')

const createResto = async (req, res)=>{
    
    try{
    let data = req.body
    let {resto_name, resto_discription, location  } = data;

    

   

    let newData = await restoModel.create(data);

    res.status(201).send({status: true, data: newData})

    } catch(err){
        res.status(501).send({ status: false, Error: err})
    }
}

const rateResto = async (req, res)=>{
    try{

        let restId = req.params.restoId
        
        let newData = await restoModel.findOneAndUpdate({_id: restId, isDeleted: false}, {ratings: $inc} )
    } catch(err){
        es.status(501).send({ status: false, Error: err})
    }
}
const getResto = async (req, res)=>{
    try{
        const data = req.body;
        const {latitude, longitude, radius} = data



        let newData = await restoModel.find({ location: { 
            $near:{
                $geometry:{
                    type:"Point",
                    coordinates: [latitude, longitude]
                },
                $maxDistance: radius
            }
        }})

        console.log(newData)

        res.status(200).send({status: true, data: newData})


    } catch(err){
        console.log(err)
        res.status(501).send({ status: false, Error: err})
    }
}

const restoUpdate = async (req, res)=>{
    try{
        let restoId = req.params.restoid
        let data = req.body
        let {resto_name, resto_discription, location } = data;

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

        await restoModel.findOneAndUpdate({_id: restoId, isDeleted: false}, {isDeleted: true})

        res.status(201).send({status: true, msg:'Deleted Successfully'});


    } catch(err){
        res.status(501).send({ status: false, Error: err})  
    }
}

 

module.exports.createResto = createResto
module.exports.deleteResto = deleteResto
module.exports.restoUpdate= restoUpdate
module.exports.getResto= getResto
