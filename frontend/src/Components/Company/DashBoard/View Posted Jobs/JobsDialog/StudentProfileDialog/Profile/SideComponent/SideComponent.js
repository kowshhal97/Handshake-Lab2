import React, { Component } from 'react';
import axios from 'axios';
import Card from './../Card'
import './SideComponent.css'

class SideComponent extends Component {
    state = {
    }

    skillSet = {
        skillSet: ""
    }


    changed = (e) => {

    }
    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/student/studentProfile/' + this.props.studentId)
            .then(response => {
                this.setState(response.data.obj)
                console.log(this.state)
            }).catch(() => {
                window.alert("FAIL")
            })
    }
    render() {

        return (<div className="sideProfile">
            <h2>
                Student Basic Details
            </h2>
            <Card obj={this.state.BasicDetails} />
            <Card obj={this.state.extraDetails} />
            <Card obj={this.state.skillSet} />
        </div>)
    }
}

export default (SideComponent);