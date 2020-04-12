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
    major: String,
    collegeName:String,
    contactNumber: Number,
    dateOfBirth: Date,
    city: String,
    state: String,
    country: String,
    careerObjective: String,
    skillSet: [],
    education: [{
        id:String,
        institution_name: String,
        location: String,
        degree: String,
        major: String,
        passing_year: String,
        cgpa: String
    }],
    experience: [{
        id:String,
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
    registeredEvents: [{
        registeredEventId: Schema.Types.ObjectId,
        eventId: Schema.Types.ObjectId,
        companyName: String,
        event_name: String,
        event_description: String,
        event_timing:String,
        event_location: String,
        event_eligibility_criteria: String,
        event_from_date: String,
        event_to_date: String,
        event_major:String
    }]
})

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;