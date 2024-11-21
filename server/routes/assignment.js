var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Assignment = require('../model/assignment');
const assignment = require('../model/assignment');

router.get('/',async(req,res,next)=>{
try{
    const AssignmentList = await Assignment.find();
    res.render('Assignment/list',{
        title:'Assignments',
        AssignmentList:AssignmentList
    })}
    catch(err){
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
    });

    
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Assignment/add',{
            title: 'Add Assignment'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});

router.post('/add',async(req,res,next)=>{
    try{
        let newAssignment = Assignment({
            "Name":req.body.Name,
            "Description":req.body.Description,
            "Duedate":req.body.Duedate,
            "Class":req.body.Class
        });
        Assignment.create(newAssignment).then(()=>{
            res.redirect('/assignmentslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});

router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const assignmentToEdit= await Assignment.findById(id);
        res.render('Assignment/edit',
            {
                title:'Edit Assignment',
                Assignment:assignmentToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err);
    }
});

router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedAssignment = Assignment({
            "_id":id,
            "Name":req.body.Name,
            "Description":req.body.Description,
            "Duedate":req.body.Duedate,
            "Class":req.body.Class
        });
        Assignment.findByIdAndUpdate(id,updatedAssignment).then(()=>{
            res.redirect('/assignmentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Assignment.deleteOne({_id:id}).then(()=>{
            res.redirect('/Assignmentslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;