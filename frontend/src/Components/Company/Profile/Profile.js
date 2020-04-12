import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import './Profile.css';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import DescriptionIcon from '@material-ui/icons/Description';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';




const styles = {
    bigAvatar: {
        margin: 10,
        width: 160,
        height: 160,
    },
    profileCard: {
        height: 300,
        width: 300,
    },
    profilePaper: {
    },
    companyMain: {
        minHeight: 500
    },
    companyDetailsPaper: {
        margin: 20,
        height: 100

    },
    companyPaperInternal: {
        paddingLeft: 10,
    },
    companyPaperInternalTitle: {

    },
    editButton: {
        position: "absolute",
        marginBotton: 10
    },
    companyName: {
        textAlign: "center"
    },
    textStyle: {
        marginTop: 20,
        marginLeft: 10,
        width: 400
    },
    buttonCss: {


    }

};
class Profile extends Component {


    state = {
        company_name: "",
        editDes: false,
        editLoc: false,
        editContact: false

    }





    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/company/companyProfile/' + this.props.studentId)
            .then(response => {

                this.setState(response.data[0])
            }).catch(() => {
                window.alert("FAIL")
            })
    }
    editDesc = (e) => {
        this.setState({ editDes: true })
    }
    editDescCancel = () => {
        this.setState({ editDes: false })
    }
    changeDesc=(e)=>{
        this.setState({company_description:e.target.value})
    }
    editLoc = (e) => {
        this.setState({ editLoc: true })
    }
    editLocCancel = () => {
        this.setState({ editLoc: false })
    }
    changeLoc=(e)=>{
        
        this.setState({company_location:e.target.value})
    }
    editContact = (e) => {
        this.setState({ editContact: true })
    }
    editContactCancel = () => {
        this.setState({ editContact: false })
    }
    changeContact=(e)=>{
        
        this.setState({company_contact:e.target.value})
    }
    save = () => {
        var headers = new Headers();
            const data = {
                company_name : this.state.company_name,
                company_location : this.state.company_location,
                company_description:this.state.company_description,
                company_contact:this.state.company_contact
            }
            axios.defaults.withCredentials = true;
            axios.put('http://54.188.68.233:3000/company/companyProfile/'+this.props.studentId,data)
                .then(response => {
                }).catch(()=>{
                    window.alert("FAIL")
                })
                this.editDescCancel();
                this.editContactCancel();
                this.editLocCancel();
    }
    render() {
        const { classes } = this.props;
        let desc = null
        let loc = null
        let contactInfo = null
        if (this.state.editDes) {
            desc = (
                <Grid container>
                    <Grid xs={6}>
                        <TextField className={classes.textStyle} id="outlined-basic" label="Description" variant="outlined" defaultValue={this.state.company_description} helperText="Edit Description Here" onChange={this.changeDesc} />
                    </Grid>
                    <Grid container xs={6} justify="flex-end" direction="row" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={this.save}
                            className={classes.buttonCss}
                        >
                            Save
      </Button>
                        <Button onClick={this.editDescCancel}>
                            Cancel
      </Button>
                    </Grid>

                </Grid>);
        }
        else {
            desc = (<Grid
                className={classes.companyPaperInternal}>
                <Grid container>
                    <Grid container xs
                        alignItems="center">
                        <Grid>
                            <h3>Description</h3>
                        </Grid>
                        <Grid>
                            <DescriptionIcon />
                        </Grid>
                    </Grid>
                    <Grid container xs justify="flex-end" direction="row" alignItems="flex-start">
                        <Button variant="contained" color="default" color="primary" startIcon={<EditIcon />} onClick={this.editDesc}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
                <Grid>
                    {this.state.company_description}
                </Grid>
            </Grid>)
        }






        if (this.state.editContact) {
            contactInfo = (
                <Grid container>
                    <Grid xs={6}>
                        <TextField className={classes.textStyle} id="outlined-basic" label="Description" variant="outlined" defaultValue={this.state.company_contact} helperText="Edit Contact Information Here" onChange={this.changeContact} />
                    </Grid>
                    <Grid container xs={6} justify="flex-end" direction="row" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={this.save}
                            className={classes.buttonCss}
                        >
                            Save
      </Button>
                        <Button onClick={this.editContactCancel}>
                            Cancel
      </Button>
                    </Grid>

                </Grid>);
        }
        else {
            contactInfo = (<Grid
                className={classes.companyPaperInternal}>
                <Grid container>
                    <Grid container xs
                        alignItems="center">
                        <Grid>
                            <h3>Contact Information</h3>
                        </Grid>
                        <Grid>
                            <DescriptionIcon />
                        </Grid>
                    </Grid>
                    <Grid container xs justify="flex-end" direction="row" alignItems="flex-start">
                        <Button variant="contained" color="default" color="primary" startIcon={<EditIcon />} onClick={this.editContact}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
                <Grid>
                    {this.state.company_contact}
                </Grid>
            </Grid>)
        }




        if (this.state.editLoc == true) {
            loc = (
                <Grid container>
                    <Grid xs={6}>
                        <TextField className={classes.textStyle} id="outlined-basic" label="Description" variant="outlined" defaultValue={this.state.company_location} helperText="Edit Location Here" onChange={this.changeLoc}/>
                    </Grid>
                    <Grid container xs={6} justify="flex-end" direction="row" alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={this.save}
                            className={classes.buttonCss}>
                            Save
      </Button>
                        <Button onClick={this.editLocCancel}>
                            Cancel
      </Button>
                    </Grid>

                </Grid>);

        }
        else {
            loc = (<Grid
                className={classes.companyPaperInternal}>
                <Grid container>
                    <Grid container xs
                        alignItems="center">
                        <Grid>
                            <h3>Location</h3>
                        </Grid>
                        <Grid>
                            <LocationCityIcon />
                        </Grid>
                    </Grid>
                    <Grid container xs justify="flex-end" direction="row" alignItems="flex-start">
                        <Button onClick={this.editLoc} variant="contained" color="default" color="primary" startIcon={<EditIcon />}>
                            Edit
                        </Button>
                    </Grid>
                </Grid>
                <Grid>
                    {this.state.company_location}
                </Grid>
            </Grid>)
        }

        return (
            <div className="profileMain">
                <div className="profileLayout">

                    <Grid container >
                        <Grid container item xs={4} container direction="row" justify="center" alignItems="flex-start">
                            <Paper className={classes.profilePaper}>

                                <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.profileCard}>
                                    <Grid container>
                                        <Grid container xs direction="row" alignItems="flex-end" className="companyName">
                                            <h2>{this.state.company_name}</h2>
                                        </Grid>
                                        <Grid container xs justify="flex-end" direction="row" alignItems="flex-start">
                                            <Button variant="contained" color="default" color="secondary" startIcon={<EditIcon />}>
                                                Edit</Button>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="stretch">
                                        <img src="https://pbs.twimg.com/profile_images/1216813945408966663/vkVajfRz_400x400.jpg" className={classes.bigAvatar} />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container direction="column" alignItems="stretch" className={classes.companyMain} >
                                <Paper className={classes.companyDetailsPaper}>
                                    <Grid>
                                        {desc}
                                    </Grid>
                                </Paper>
                                <Paper className={classes.companyDetailsPaper}>
                                    <Grid>
                                        {loc}
                                    </Grid>
                                </Paper>
                                <Paper className={classes.companyDetailsPaper}>
                                    <Grid>
                                        {contactInfo}
                                    </Grid>
                                </Paper>



                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>)
    }
}



const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({ type: 'LOGOUT' }),
        onLogin: (value, studentId) => dispatch({ type: 'LOGIN', value: value, studentId: studentId })
    });
}

const mapStateToProps = state => {
    return {

        isLoggedIn: state.isLoggedIn,
        userType: state.userType,
        studentId: state.studentId
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
