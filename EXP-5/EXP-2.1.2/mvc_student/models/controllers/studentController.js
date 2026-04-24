const Student = require('../models/studentModel');

exports.getStudents = async (req,res)=>{
    const students = await Student.find();
    res.render('index',{students});
};

exports.showAddPage = (req,res)=>{
    res.render('addStudent');
};

exports.addStudent = async (req,res)=>{
    const student = new Student(req.body);
    await student.save();
    res.redirect('/students');
};

exports.deleteStudent = async (req,res)=>{
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/students');
};