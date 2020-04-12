import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import ProfileDialog from './../../../StudentProfileDialog/profileDialog'
import { Collapse } from '@material-ui/core';
import { connect } from 'react-redux'


let Dialog=null;
const columns = [
    {
        name: "event_name",
        label: "event Name",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "event_timing",
        label: "Time",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "event_from_date",
        label: "Start Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "event_to_date",
        label: "End Date",
        options: {
            filter: true,
            sort: true,
        }
    }
];

class StudentsTab extends Component {
    _isMounted = false;
    state={
        data:[],
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
            let studentId=this.state.data[cellMeta.dataIndex].studentId;
            Dialog=(<ProfileDialog display={true} studentId={studentId} close={this.dialogCloseHandler}/>)
            this.setState({showDialog:true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

    componentDidMount=()=>{
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/events/company/'+this.props.user.name)
            .then(response => {
                this.setState({data:response.data});  
            }).catch(() => {
                window.alert("FAIL")
            })
    }


    componentWillUnmount() {
        this._isMounted = false;
      }
    
    render() {
        
        if(!this.state.showDialog){
            Dialog=null
        }
        let data=[]
        data=this.state.data
        return (
            <div>
                {Dialog}
                    <MUIDataTable
                        title={"Registered Students"}
                        data={data}
                        columns={columns}
                        options={this.options}
                    />
                </div>
            )
    }
}


const mapDispatchToProps = dispatch => {
    return ({
        onLogout: () => dispatch({ type: 'LOGOUT' }),
        onLogin: (value,user) => dispatch({ type: 'LOGIN', value: value,user:user })
    });
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        userType: state.userType,
        user:state.user
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(StudentsTab);