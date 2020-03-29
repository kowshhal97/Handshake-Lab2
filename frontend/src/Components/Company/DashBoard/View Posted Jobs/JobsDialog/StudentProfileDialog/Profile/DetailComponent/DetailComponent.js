
import React, { Component } from 'react';
import axios from 'axios';
import Card from './../Card'
import Grid from '@material-ui/core/Grid';
import './DetailComponent.css'


class DetailComponent extends Component {
    _isMounted = false;
    state = {

    }

    componentDidMount = () => {
        this._isMounted = true;
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/student/studentProfile/educationDetails/' + this.props.studentId)
            .then(response => {

                this.setState({ education: response.data.result })
                console.log(this.state)
            }).catch(() => {
                window.alert("FAIL")
            });
        axios.get('http://54.188.68.233:3000/student/studentProfile/experienceDetails/' + this.props.studentId)
            .then(response => {
                console.log(response.data)
                this.setState({ experience: response.data.result })
                console.log(this.state)
            }).catch(() => {
                window.alert("FAIL")
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        console.log(this.state)

        let exp = []
        let edu = []

        if (this.state.education) {
            for (let i of this.state.education) {
                edu.push(<Card obj={i} />)
            }
        }
        if (this.state.experience) {
            for (let i of this.state.experience) {
                exp.push(<Card obj={i} />)
            }
        }
        return (<div className="DetailCompMain">
            <Grid>
                <h2>Education</h2>
                {edu}
            </Grid>
            <Grid>
                <h2>Experience</h2>
                {exp}
            </Grid>
        </div>
        );
    }
}

export default (DetailComponent);
