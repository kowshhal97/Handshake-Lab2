import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './SideComponent.css'
import Basic from './StudentBasicDetail'
import Skill from './Skills'
import Grid from '@material-ui/core/Grid';

class SideComponent extends Component {
    state = {
    }

    skillSet = {
        skillSet: ""
    }



    changed = (e) => {

    }



    
    changCity = (e) => {
        let newBasicDetails = { ...this.state.extraDetails }
        newBasicDetails.city_name = e.target.value
        this.setState({ extraDetails: newBasicDetails })
    }
    changeSta = (e) => {
        let newBasicDetails = { ...this.state.extraDetails }
        newBasicDetails.state_name = e.target.value
        this.setState({ extraDetails: newBasicDetails })
    }
    changeCon = (e) => {
        let newBasicDetails = { ...this.state.extraDetails }
        newBasicDetails.country_name = e.target.value
        this.setState({ extraDetails: newBasicDetails })
    }
    changePh = (e) => {
        let newBasicDetails = { ...this.state.extraDetails }
        newBasicDetails.phone_number = e.target.value
        this.setState({ extraDetails: newBasicDetails })
    }
    changeDob = (e) => {
        let newBasicDetails = { ...this.state.extraDetails }
        newBasicDetails.date_of_birth = e.target.value
        this.setState({ extraDetails: newBasicDetails })
    }
    changeObj = (e) => {
        let newBasicDetails = { ...this.state.BasicDetails }
        newBasicDetails.career_objective = e.target.value
        this.setState({ BasicDetails: newBasicDetails })
    }

    save = () => {
        var headers = new Headers();
        const data = {
            date_of_birth: this.state.extraDetails.date_of_birth,
            city_name: this.state.extraDetails.city_name,
            state_name: this.state.extraDetails.state_name,
            country_name: this.state.extraDetails.country_name,
            phone_number: this.state.extraDetails.phone_number,
            career_objective: this.state.BasicDetails.career_objective
        }
        axios.defaults.withCredentials = true;
        axios.post('http://54.188.68.233:3000/student/studentProfile/basicDetails/' + this.props.studentId, data)
            .then(response => {
            }).catch(() => {
                window.alert("FAIL")
            })
    }

    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/student/studentProfile/' + this.props.studentId)
            .then(response => {
                this.setState(response.data.obj)
            }).catch(() => {
                window.alert("FAIL")
            })
    }
    render() {
        return (<div className="sideProfile">
            {this.state.extraDetails === undefined ? null :
                (<div><div style={{ marginBottom: 20 }}><Basic studentId={this.props.studentId} BasicDetails={this.state.BasicDetails} extraDetails={this.state.extraDetails}
                     changeCity={this.changCity} changeSta={this.changeSta} changeCon={this.changeCon} changePh={this.changePh} changeDob={this.changeDob} changeObj={this.changeObj} save={this.save}
                /></div>
                    <Grid container direction="row" justify="center">
                        <Skill studentId={this.props.studentId} skillSet={this.state.skillSet.skillSet} />
                    </Grid>
                </div>)
            }
        </div>)
    }
}


export default (SideComponent);