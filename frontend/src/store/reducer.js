import axios from 'axios';
const initialState={

    isLoggedIn:false,
    userType:'none',
    user:{

    }
}

const reducer=(state=initialState,action)=>{
    console.log(action)
    if(action.type==='LOGOUT'){
        return {
            ...state,
            isLoggedIn:false,
            userType:"none"
        }
    }
    if(action.type==='LOGIN'){
        return {
            ...state,
            isLoggedIn:true,
            userType:action.value,
            user:action.user
        }
    }
    if(action.type==='saveToProfile'){
        console.log(action.user)
        axios.put('http://localhost:3000/student/studentProfile/' + action.user._id, action.user)
            .then(response => {
                return {
                    ...state,
                    ...response.data
                }
            }).catch(() => {
                window.alert("FAIL")
            })
    }
return state;
}

export default reducer;