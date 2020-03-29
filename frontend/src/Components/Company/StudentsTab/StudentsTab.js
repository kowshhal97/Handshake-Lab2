import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import ProfileDialog from './../../StudentProfileDialog/profileDialog'


let Dialog=null;
const columns = [
    {
        name: "student_id",
        label: "Sno",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "student_name",
        label: "Name",
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
    {
        name: "major",
        label: "Major",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "country_name",
        label: "State",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "skillSet",
        label: "Skills",
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
            Dialog=(<ProfileDialog display={true} studentId={cellMeta.dataIndex+1} close={this.dialogCloseHandler}/>)
            this.setState({showDialog:true})
        },
        selectableRows: "none",
        download: false,
        print: false
    };

    componentDidMount = () => {
        var headers = new Headers();
        axios.defaults.withCredentials = true;
        axios.get('http://54.188.68.233:3000/student/studentProfile/')
            .then(response => {
                this.setState({data:[...response.data.result]})
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
            <div className="handShakeMain">
                <div className="handShakeLayout">
                    <MUIDataTable
                        title={"Registered Students"}
                        data={data}
                        columns={columns}
                        options={this.options}
                    />
                </div>
            </div>
            </div>)
    }
}

export default StudentsTab;