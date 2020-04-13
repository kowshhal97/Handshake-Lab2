import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import LocationCityIcon from '@material-ui/icons/LocationCity';
import DescriptionIcon from '@material-ui/icons/Description';
import ContactMailIcon from '@material-ui/icons/ContactMail';





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
    companyName:{
        textAlign:"center"
    }

};



class Profile extends Component {


    state = {
        company_name: "",
    }





    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/company/companyProfile/' + this.props.studentId)
            .then(response => {

                this.setState(response.data[0])
            }).catch(() => {
                window.alert("FAIL")
            })
    }
    render() {
        const { classes } = this.props;

        return (


            <div className="profileMain">
                <div className="profileLayout">

                    <Grid container >
                        <Grid container item xs={4} container direction="row" justify="center" alignItems="flex-start">
                            <Paper className={classes.profilePaper}>

                                <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.profileCard}>
                                    <Grid container>
                                    <Grid container xs
                                    direction="row"
                                        alignItems="flex-end"
                                        className="companyName"
                                        >
                                        <h2>{this.state.company_name}</h2>
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
                                    <Grid
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
                                        </Grid>
                                        <Grid>
                                            {this.state.company_description}
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Paper className={classes.companyDetailsPaper}>
                                    <Grid
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
                                        </Grid>
                                        <Grid>
                                            {this.state.company_location}
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Paper className={classes.companyDetailsPaper}>
                                    <Grid
                                        className={classes.companyPaperInternal}>
                                        <Grid container>
                                            <Grid container xs
                                                alignItems="center">
                                                <Grid>
                                                    <h3>Contact Information</h3>
                                                </Grid>
                                                <Grid>
                                                    <ContactMailIcon />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            {this.state.company_contact}
                                        </Grid>
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
