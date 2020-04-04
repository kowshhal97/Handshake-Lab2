const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    collegeName: {
        type: String, 
        required: true
    },
    major: String,
    contactNumber: Number,
    dateOfBirth: Date,
    city: String,
    state: String,
    country: String,
    careerObjective: String,
    skillSet: [],
    education: [{
        university: String,
        location: String,
        degree: String,
        major: String,
        yearOfPassing: String,
        cgpa: String
    }],
    experience: [{
        Company: String,
        JobTitle: String,
        location: String,
        description: String,
        startDate: Date,
        endDate: Date
    }],
    applications: [],
    registeredEvents: []
})

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;