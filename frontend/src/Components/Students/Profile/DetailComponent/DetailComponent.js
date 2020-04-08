
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import Card from './../Card'
import Grid from '@material-ui/core/Grid';
import './DetailComponent.css'
import AddIcon from '@material-ui/icons/Add';
import Education from './Education'
import AddForm from './AddForm';
import Experience from './Experience';
import AddExperienceForm from './AddExperienceForm'


class DetailComponent extends Component {
    _isMounted = false;
    state = {
        educationDetails: [],
      experienceDetails: [],
      showAddForm: false,
      showTextFrom: false,
      showAddExperienceForm: false,

    }

    componentDidMount = () => {
        this._isMounted = true;

        

        // var headers = new Headers();
        // axios.defaults.withCredentials = true;
        // axios.get('http://54.188.68.233:3000/student/studentProfile/educationDetails/' + this.props.studentId)
        //     .then(response => {
        //         this.setState({ educationDetails: response.data.result });
        //     }).catch(() => {
        //         window.alert("FAIL")
        //     });
        // axios.get('http://54.188.68.233:3000/student/studentProfile/experienceDetails/' + this.props.studentId)
        //     .then(response => {
        //         console.log(response.data)
        //         this.setState({ experienceDetails: response.data.result })
        //         console.log(this.state)
        //     }).catch(() => {
        //         window.alert("FAIL")
        //     })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onAddSchoolClick = () => {
        this.setState({showAddForm: !this.state.showAddForm});
      }
    
      onAddSchool = (school) => {
        console.log('new', school);
        const list = [...this.state.educationDetails, school];
        console.log(list);
        this.setState({educationDetails: list});
        this.setState({showAddForm: !this.state.showAddForm});
      }

      onUpdateEducation = (education) => {
        const data = this.state.educationDetails.map((item) => {
          if(item.education_id === education.education_id) {
            return education
          }
          return item;
        })
        this.setState({educationDetails: data});
      }
      onUpdateExperience = (experience) => {
        console.log(experience)
        const data = this.state.experienceDetails.map((item) => {
          if(item.experience_id === experience.experience_id) {
            return experience
          }
          return item;
        })
        this.setState({experienceDetails: data});
      }
      onAddExperience = (experience) => {
        console.log('new', experience);
        const list = [...this.state.experienceDetails, experience];
        console.log(list);
        this.setState({experienceDetails: list});
        this.setState({showAddExperienceForm: !this.state.showAddExperienceForm});
      }
      onAddExperienceClick = () => {
        this.setState({showAddExperienceForm: !this.state.showAddExperienceForm});
      }


    render() {

        let exp = []
        if (this.state.experience) {
            for (let i of this.state.experience) {
                exp.push(<Card obj={i} />)
            }
        }
        return (<div className="DetailCompMain">



<div style={{marginBottom: '20px'}}>
            <div className='ui raised segment'>
                <h4>Education</h4>
                <div className='ui items'>
                {this.state.educationDetails.map(education => {
                  return <Education key={education} onUpdateEducation={this.onUpdateEducation} education={education} />;
                })}
                </div>
                <div>
                    {!this.state.showAddForm && <button class="fluid ui button" onClick={this.onAddSchoolClick}>Add School</button>}
                    {this.state.showAddForm && <AddForm onAddSchool={this.onAddSchool} toggle={this.onAddSchoolClick} studentId={this.props.studentId}/>}
                </div>
            </div>
          </div>
          <div style={{marginBottom: '20px'}}>
            <div className='ui segment'>
                <b>Work Experience</b>
              <div className='ui items'>
              {this.state.experienceDetails.map(experience => {
                return <Experience key={experience} onUpdateExperience={this.onUpdateExperience} experience={experience} studentId={this.props.studentId}/>;
              })}
              </div>
              <div>
                {!this.state.showAddExperienceForm && <button class="fluid ui button" onClick={this.onAddExperienceClick}>Add Work Experience</button>}
                {this.state.showAddExperienceForm && <AddExperienceForm onAddExperience={this.onAddExperience} toggle={this.onAddExperienceClick} studentId={this.props.studentId} />}
              </div>
            </div>
          </div>
        </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
