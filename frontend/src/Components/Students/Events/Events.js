import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import { connect } from 'react-redux'


import AllEvents from './AllEvents/AllEvents';
import RegisteredEvents from './RegisteredEvents/RegisteredEvents'

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

class Events extends Component {
    handleChange = (event, value) => {
        this.setState({ value });
    };


    constructor(props) {
        super(props);
    
        this.state = {
            value: 0,
            eventName: "",
            description: "",
            time: "",
            toDate:"",
            fromDate: "",
            eligibility: "",
            location:"",
            major:"",
            getEventData: [
            ]
      };
    }






    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/events')
            .then(response => {
                this.setState({ getEventData: [...response.data.result] })
                console.log(this.state.getEventData)
            }).catch(() => {
                window.alert("FAIL")
            })
    }


    render() {
        const { classes } = this.props;
        const { value } = this.state;


        return (
            <div className="profileMain">
                <div className="profileLayout">
                    <div className={classes.root}>
                        <Grid className='main'>
                            <Paper square className='main'>
                                <AppBar position="static" color="default">
                                    <Tabs value={value} onChange={this.handleChange}>
                                        <Tab label="All Events" />
                                        <Tab label="Registered Events" />
                                    </Tabs>
                                </AppBar>
                                {value === 0 && <TabContainer><AllEvents /></TabContainer>}
                                {value === 1 && <TabContainer><RegisteredEvents /></TabContainer>}
                            </Paper>
                        </Grid>
                    </div>
                </div></div>
        );
    }
}
Events.propTypes = {
    classes: PropTypes.object.isRequired,
};

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






export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Events));
