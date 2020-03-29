import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import { connect } from 'react-redux'
import MUIDataTable from "mui-datatables";
import JobsDialog from '../JobsDialog/JobDetails/JobsDialog'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Typography from '@material-ui/core/Typography';




let Dialog=null;
const column = [
    {
        name: "job_id",
        label: "Sno",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "job_title",
        label: "Title",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "job_location",
        label: "Location",
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
    {
        name: "job_category",
        label: "Category",
        options: {
            filter: true,
            sort: true,
        }
    },
];

 

class DashBoard extends Component {
    state={
        data:[],
        showDialog:false
    }

    dialogCloseHandler =(e)=>{

        e.preventDefault();
        this.setState({showDialog:false})
    }


    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/jobs')
            .then(response => {

                this.setState({data:[...response.data.result]});

            }).catch(() => {
                window.alert("FAIL")
            })
    }
    options = {
        selectableRowsOnClick: true,
        disableToolbarSelect: true,
        onCellClick:  (colData, cellMeta)=> {
        
            let companyId;
            for(let i of this.state.data){
                if(i.job_id==cellMeta.dataIndex+1){
                    companyId=i.company_id;
                }
            }
            Dialog=(<JobsDialog display={true} jobId={cellMeta.dataIndex+1} close={this.dialogCloseHandler} companyId={companyId}/>)
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
                        title={"All Jobs"}
                        data={this.state.data}
                        columns={column}
                        options={this.options}
                    />
                    </div>
               )
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

export default connect(mapStateToProps, mapDispatchToProps) (DashBoard);
