import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import JobsDialog from './JobsDialog'
import axios from 'axios';
import { connect } from 'react-redux';
import ProfileDialog from './StudentProfileDialog/profileDialog'

let Dialog=null;
const column = [
    {
        name: "student_name",
        label: "Name",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "major",
        label: "Major",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "student_college_name",
        label: "College Name",
        options: {
            filter: true,
            sort: true,
        }
    },
];




 

class PostedJobs extends Component {
    dialogCloseHandler =(e)=>{

        e.preventDefault();
        this.setState({showDialog:false})
    }

    state={
        data:[],
        showDialog:false
    }

    componentDidMount=()=>{
        
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/applications/job/' + this.props.jobId)
            .then(response => {
                let res=response.data;
                for(let i of res){
                    axios.get('http://54.188.68.233:3000/student/studentProfile/' + i.student_id)
            .then(response => {
                let obj={...response.data.obj.BasicDetails};
                 obj.application_status=i.application_status;
                 obj.student_id=i.student_id;
                let newData=[...this.state.data,obj];
                this.setState({data:newData});
            }).catch(() => {
                window.alert("FAIL")
            })
                }
            }).catch(() => {
                window.alert("FAIL")
            })

    }



    options = {
        selectableRowsOnClick: true,
        disableToolbarSelect: true,
        onCellClick:  (colData, cellMeta)=> {
            let studentId=this.state.data[cellMeta.dataIndex].student_id
            Dialog=(<ProfileDialog  display={true} studentId={studentId} close={this.dialogCloseHandler}/>)
            this.setState({showDialog:true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

      
    
    render() {
        
        console.log(this.state.data);
        if(!this.state.showDialog){
            Dialog=null
        }
        return (
            <div>
                {Dialog}
                    <MUIDataTable
                        title={"Posted Job"}
                        data={this.state.data}
                        columns={column}
                        options={this.options}
                    />
                </div>)
    }
}


const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({ type: 'LOGOUT' }),
        onLogin: (value) => dispatch({ type: 'LOGIN', value: value })
    });
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        userType: state.userType,
        studentId: state.studentId
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (PostedJobs);

