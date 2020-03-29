import React,{Component} from 'react';

import axios from 'axios';
import { connect } from 'react-redux'
import MUIDataTable from "mui-datatables";
import JobsDialog from './JobDetails/JobsDialog';





let Dialog=null;
const column = [
    {
        name: "job_id",
        label: "job_id",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "company_id",
        label: "company_id",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "application_date",
        label: "Applied Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "application_status",
        label: "Status",
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
        axios.get('http://54.188.68.233:3000/applications/'+this.props.studentId)
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
                if(i.job_id===cellMeta.dataIndex+1){
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
                        title={"Applications"}
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
