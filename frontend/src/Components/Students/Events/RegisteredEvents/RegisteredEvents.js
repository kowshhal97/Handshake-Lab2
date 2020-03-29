import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import EventsDialog from './../EventsDialog'
import axios from 'axios';
import { connect } from 'react-redux';

let Dialog=null;
const column = [
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
    },
    
];



 

class PostedEvents extends Component {
    state={
        data:[],
        showDialog:false
    }

    dialogCloseHandler =(e)=>{

        e.preventDefault();
        this.setState({showDialog:false})
    }


    componentDidMount=()=>{
        
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/events/registered/'+this.props.studentId)
            .then(response => {
                let res=response.data.result;
                for(let i of res){
                    axios.get('http://54.188.68.233:3000/events/' + i.event_id)
            .then(response => {
                let obj={...response.data.result[0]};
                
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
           
            let eventId=this.state.data[cellMeta.dataIndex].event_id
            Dialog=(<EventsDialog display={true} eventId={eventId} close={this.dialogCloseHandler}/>)
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
                        title={"Registered Events"}
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

export default connect(mapStateToProps, mapDispatchToProps) (PostedEvents);

