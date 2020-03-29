import React from 'react';
import Signup from './Signup/Signup'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Signup.css';
import axios from 'axios';
import { connect } from 'react-redux';




import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class SimpleTabs extends React.Component {

    handleChange = (event, value) => {
        this.setState({ value });
    };
    state={
        value: 0,
        name:"",
        emailId:"",
        password:"",
        collegeName:"",
        major:"",


}

emailHandler=(e)=>{
    this.setState({emailId:e.target.value})
}
passwordHandler=(e)=>{

    this.setState({password:e.target.value})
}

collegeNameHandler=(e)=>{

    this.setState({collegeName:e.target.value})
}

nameHandler=(e)=>{

    this.setState({name:e.target.value})
}

MajorHandler=(e)=>{
    this.setState({major:e.target.value})
}

signup=(e,userType)=>{
    var headers = new Headers();
        e.preventDefault();
        if(userType==='student'){
        const data = {
            student_email_id : this.state.emailId,
            student_password : this.state.password,
            student_name:this.state.name,
            student_college_name:this.state.collegeName,
            major:this.state.major
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/student/signUp',data)
            .then(response => {
                let studentId=response.data.id
                this.props.onLogin(userType,studentId);
                console.log("Status Code : ",response.status);
            }).catch(()=>{
                window.alert("FAIL")
            })}
            else{
                const data = {
                    company_email_id : this.state.emailId,
                    company_password : this.state.password,
                    company_name:this.state.name,
                    company_location:this.state.collegeName,
                    major:this.state.major
                }
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3000/company/signUp',data)
                    .then(response => {
                        window.alert(response.data.id)
                        let companyId=response.data.id
                        this.props.onLogin(userType,companyId);
                        console.log("Status Code : ",response.status);
                    }).catch(()=>{
                        window.alert("FAIL")
                    })
            }
}

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <Grid className='main'>
                    <Paper square className='main'>
                        <AppBar position="static" color="default">
                            <Tabs value={value} onChange={this.handleChange}>
                                <Tab label="Student" />
                                <Tab label="Company" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <TabContainer><Signup type="student" par="CollegeName" changeEmail={this.emailHandler} changePassword={this.passwordHandler} changeCollege={this.collegeNameHandler} changeName={this.nameHandler}  signup={this.signup} major={this.MajorHandler} /></TabContainer>}
                        {value === 1 && <TabContainer><Signup type="company" par="Location" changeEmail={this.emailHandler} changePassword={this.passwordHandler} changeCollege={this.collegeNameHandler} changeName={this.nameHandler}  signup={this.signup} major={this.MajorHandler}/></TabContainer>}
                    </Paper>
                </Grid>
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({ type: 'LOGOUT' }),
        onLogin: (value,studentId) => dispatch({ type: 'LOGIN', value: value,studentId:studentId })
    });
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.isLoggedIn,
        userType: state.userType,
        studentId:state.studentId
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(SimpleTabs));