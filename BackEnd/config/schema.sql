create database handshake_application_db;
use handshake_application_db;

create table student_information
(student_id int(5) not null auto_increment,
student_name varchar(50) not null,
student_email_id varchar(200) not null unique,
student_password varchar(400) not null,
student_college_name varchar(200) not null,
major varchar(100),
skillSet varchar(200),
date_of_birth date,
city_name varchar(100),
state_name varchar(100),
country_name varchar(100),
career_objective varchar(400),
phone_number varchar(20),
student_profile_photo varchar(1000),
student_resume varchar(1000),
primary key(student_id),
unique key (student_email_id));

alter table student_information modify date_of_birth varchar(20);


create table student_educational_details(
education_id int(5) not null auto_increment,
degree varchar(30) not null,
student_id int(5) not null,
institution_name varchar(30) not null,
cgpa varchar(10) not null, 
major varchar(30) not null, 
passing_year varchar(5) not null, 
primary key(education_id),
foreign key(student_id) 
references student_information(student_id));


create table student_experience_details
(experience_id int(5) not null auto_increment, 
designation varchar(30) not null,
work_summary varchar(1000),
company_name varchar(30) not null, 
company_location varchar(30) not null, 
starting_date date not null, 
ending_date date, 
student_id int(5) not null, 
primary key(experience_id), 
foreign key(student_id) 
references student_information(student_id));

alter table student_experience_details modify starting_date varchar(20);


CREATE TABLE company_information (
  company_id int NOT NULL AUTO_INCREMENT,
  company_name varchar(100) NOT NULL,
  company_password varchar(400) NOT NULL,
  company_email_id varchar(200) NOT NULL,
  company_location varchar(100) DEFAULT NULL,
  company_description varchar(400) DEFAULT NULL,
  company_contact varchar(100) DEFAULT NULL,
  company_logo varchar(100) DEFAULT NULL,
  PRIMARY KEY (company_id),
  UNIQUE KEY company_email_id (company_email_id)
);

create table event_information 
(event_id int(5) auto_increment not null,
event_name varchar(25) not null,
event_description varchar(500), 
event_timing time, 
event_from_date date,
event_to_date date, 
event_location varchar(100), 
event_eligibility_criteria varchar (500), 
event_major varchar(300) not null, 
company_id int(5) not null, 
primary key(event_id), 
foreign key(company_id) references company_information(company_id));

alter table event_information modify event_from_date varchar(20);
alter table event_information modify event_to_date varchar(20);
alter table event_information modify event_timing varchar(20);






-- select * from company_information;
create table jobs_information 
( job_id int(5) not null auto_increment,
job_title varchar(300),
job_description varchar(1000),
job_requirements varchar(1000),
job_category varchar(1000),
job_posting_date date,
job_application_deadline date,
job_location varchar(300),
job_salary int(5),
company_id int(5) not null,
primary key (job_id),
foreign key (company_id) references company_information(company_id));

alter table jobs_information modify job_posting_date varchar(20);
alter table jobs_information modify job_application_deadline varchar(20);

create table application_information_table
(application_id int(5) not null auto_increment,
application_status varchar(30) default 'Pending', 
application_date date not null, 
student_id int(5) not null,
company_id int(5) not null, 
job_id int(5) not null,
primary key (application_id), 
foreign key (student_id) references student_information(student_id), 
foreign key (company_id) references company_information(company_id),
foreign key (job_id) references jobs_information (job_id));

create table registered_events
(registered_event_id int(5) not null auto_increment,
event_id int(5) not null, 
student_id int(5) not null, 
company_id int(5) not null,  
primary key(registered_event_id), 
foreign key(company_id) references company_information(company_id), 
foreign key (event_id) references event_information(event_id), 
foreign key(student_id) references student_information(student_id));



flush privileges;
