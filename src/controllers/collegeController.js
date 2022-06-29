const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

let createCollege = async function (req, res) {
    try {
        let data = req.body

        if (await collegeModel.findOne({ name: data.name }))
        return res.status(400).send({ msg: "College name already exist" })

        if (await collegeModel.findOne({ fullName: data.fullName }))
        return res.status(400).send({ msg: "College fullName already exist" })

        if (await collegeModel.findOne({ logoLink: data.logoLink }))
        return res.status(400).send({ msg: "logoLink already exist" })
        

        let saveData = await collegeModel.create(data)
        res.status(201).send({ status: true, data: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

let getCollegeDetails = async function(req, res){
    let saveData= await collegeModel.find().populate('Intern')
    res.send({msg:saveData})


    
}

module.exports.createCollege = createCollege;
module.exports.getCollegeDetails=getCollegeDetails
