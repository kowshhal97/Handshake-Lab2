import React from 'react';
import Paper from '@material-ui/core/Paper';
import './Card.css'
    const card=(props)=>{

        let output = []
    for (let i in props.obj) {
        if(i==="education_id"||i==='student_id'||i==="experience_id")
        continue;
    output.push(<p >{i} : {props.obj[i]}</p>)
        output.push(<br/>)
    }
    return (
        <div className="cardProfile">
            <Paper square>
                <div className="cardText">
                    {output}
                    </div>
            </Paper>
        </div>
    );

    }

export default card;