import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import ProfileDialog from './../../../StudentProfileDialog/profileDialog'
import { Collapse } from '@material-ui/core';


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
        axios.get('http://54.188.68.233:3000/events/registered/'+this.props.eventId)
            .then(response => {
                let res=response.data.result;
                for(let i of res){
                    axios.get('http://54.188.68.233:3000/events/' + i.event_id)
            .then(response => {
                let obj={...response.data.result[0]};
                obj.studentId=i.student_id;
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

export default StudentsTab;