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
    },
    password: {
        type: String, 
        required: true
    },
    major: String,
    contactNumber: String,
    dateOfBirth: String,
    city: String,
    state: String,
    country: String,
    careerObjective: String,
    collegeName:String,
    skillSet: [],
    education: [{
        institution_name: String,
        location: String,
        degree: String,
        major: String,
        passing_year: String,
        cgpa: String
    }],
    experience: [{
        company_name: String,
        designation: String,
        company_location: String,
        work_summary: String,
        starting_date: Date,
        ending_date: Date
    }],
    applications: [{
        applicationId: Schema.Types.ObjectId,
        status: String,
        companyName: String,
        title: String,
        location: String,
        salary: String,
        jobDescription: String,
        category: String

    }],
    registeredEvents: []
})

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;