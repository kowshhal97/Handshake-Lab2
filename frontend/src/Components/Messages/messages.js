import React, { Component } from 'react';
import MessageList from './MessageList'
import Conversation from './Conversation'
import Grid from '@material-ui/core/Grid';
import './Messages.css'

class Messages extends Component {


    state = {
        selectedMessage: null,
    }


    selectMessage=(value)=>{
        this.setState({selectedMessage:value})
    }
    render = () => {

        return (
            <div>
                <Grid container xs={12}>
                    <Grid container xs={4}>
                    <MessageList selectMessage={this.selectMessage}/>
                    </Grid>
                
                    <Grid container xs={8}>
                        {this.state.selectedMessage!=undefined?<Conversation conversationId={this.state.selectedMessage}/>:
                        <div className="section">
                        <h1 className="selectText">
                            Please select a Coversation
                            </h1>
                            </div>
                            }
                    
                    </Grid>
                
                </Grid>
            </div>
        )
    };
}



export default Messages;