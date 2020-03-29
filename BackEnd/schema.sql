
use handshake;

CREATE TABLE company  (
    companyId int not null PRIMARY KEY auto_increment,
    compnayName varchar(255) not null,
    cPassword varchar(255) not null,
    emailId varchar(255),
    location varchar(255),
    cDesc varchar(255),
    profilePic Blob,
    contactInfo varchar(255)
    
);

CREATE TABLE application (
    appId int  not null auto_increment,
    cId int  not null,
    jobTitle varchar(255),
    jobpostDate date,
    applicationDeadline date,
    location varchar(255),
    salary int,
    jobDesc varchar(255),
    jobCategory varchar(255),
    primary key (appId)
);


CREATE TABLE applicationform (
    appformId int ,
    cId int  not null,
    studentId int not null,
    appfromstatus varchar(50),
    stdresume blob,
    appliedDate date,
     primary key (appformId,cId,studentId)
);

CREATE TABLE events (
    eId int,
    eName  varchar(255),
     cId int not null,
    edesc varchar(255),
    etime varchar(255),
     edate date,
     elocation varchar(255),
     elgibility varchar(255),
     primary key (eId)

);

CREATE TABLE eventform (
    eformId int,
    cId int,
    studentId int not null,
 primary key (eformId,cId,studentId)
);


CREATE TABLE  student (
    studentId int not null auto_increment ,
    studenName varchar(50),
    dob  varchar(50),
  city varchar(20),
  state varchar(20),
  country varchar(20),
      carrerObjective varchar(255),
    email varchar(255),
     spassword varchar(255),
     phone varchar(50),
 profile_pic_path varchar(255),
 primary key (studentId),
 collegeName varchar(255)
);



CREATE TABLE skillset(
  studentId  varchar(50) not null,
    skillName varchar(20),
   primary key (studentId,skillName)

);


CREATE TABLE  education (
    eduId int not null auto_increment ,
     studentId varchar(50),
    clgName varchar(50),
    location varchar(50),
     degree varchar(30),
  major varchar(20),
  yearOfPass varchar(50),
  cgpa   varchar(30),
 primary key (eduId,studentId)
);

CREATE TABLE expDetails(
    expId int not null auto_increment ,
     studentId varchar(50),
      cmpyname varchar(50),
    title varchar(50),
      location varchar(50),
        startDate  varchar(100),
     endDate varchar(100),
     desp varchar(255),
    primary key (expId,studentId)
);








