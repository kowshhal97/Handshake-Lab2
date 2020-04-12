import React from 'react';
import axios from 'axios';
import { Label, Icon } from 'semantic-ui-react';


class Skills extends React.Component {
    constructor() {
        super();
        this.state = {skills: [], current_skill: ''}
    }

    componentDidMount() {
        if(this.props.skillSet != null) {
            this.setState({skills: this.props.skillSet.split(",")})
        }
    }

    onAdd = (e) => {
        e.preventDefault();
        const list = [...this.state.skills, this.state.current_skill];
        const str = list.join();
        const data = {...this.props.skillSet};
        data.skillSet = str;
        axios
        .post('http://54.188.68.233:3000/student/studentProfile/skills/'+this.props.studentId, data, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status === 200) {
                console.log(res.data);
          
            } else {
                window.alert("huyu")
                console.log(res);
            }
        })
        .catch(err => {
            console.log(err);
        });
        this.setState({skills: list})
        this.setState({current_skill: ''});

    }

    onChangeHandler = (e) => {
        this.setState({current_skill: e.target.value});
        
    }
    onDeleteSkill = (e) => {
        console.log(e.target.id)
        const list = this.state.skills.filter(item => {
            if (e.target.id !== item) {
                return item;
            }
        })
        const str = list.join();
        const data = {...this.props.skillSet};
        data.skillSet = str;
        axios
        .post('http://54.188.68.233:3000/student/studentProfile/skills/'+this.props.studentId, data, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            if (res.status === 200) {
                
                console.log(res.data);
          
            } else {
                
                console.log(res);
            }
        })
        .catch(err => {
            console.log(err);
        });
        this.setState({skills: list})
    }

    renderSkills = (skill) => {
        return (
                <Label as='a' style={{marginBottom:'5px'}}>
                    {skill}
                    
                </Label>
        )
    }
    render() {
        return (
            <div>
                <div className='ui raised card' style={{padding: '10px'}}>
                    <div style={{marginBottom: '30px'}}>
                        <h3>Skills</h3>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        {this.state.skills.map((skill) => {
                            return this.renderSkills(skill)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Skills;