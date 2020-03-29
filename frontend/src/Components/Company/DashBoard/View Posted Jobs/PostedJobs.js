import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import JobsDialog from './JobsDialog/JobsDialog'
import axios from 'axios';
import { connect } from 'react-redux';


let Dialog=null;
const column = [
    {
        name: "job_title",
        label: "Job Title",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "job_location",
        label: "Location",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "job_category",
        label: "Category",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "job_posting_date",
        label: "Posting Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "job_application_deadline",
        label: "Deadline",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "job_salary",
        label: "Salary",
        options: {
            filter: true,
            sort: true,
        }
    },
];




 

class PostedJobs extends Component {
    state={
        showDialog:false
    }

    dialogCloseHandler =(e)=>{

        e.preventDefault();
        this.setState({showDialog:false})
    }


    options = {
        selectableRowsOnClick: true,
        disableToolbarSelect: true,
        onCellClick:  (colData, cellMeta)=> {
            Dialog=(<JobsDialog display={true} jobId={this.props.jobPostings[cellMeta.dataIndex].job_id} close={this.dialogCloseHandler}/>)
            this.setState({showDialog:true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

      
    
    render() {

        if(!this.state.showDialog){
            Dialog=null
        }
        return (
            <div>
                {Dialog}
                    <MUIDataTable
                        title={"Posted Job"}
                        data={this.props.jobPostings}
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

