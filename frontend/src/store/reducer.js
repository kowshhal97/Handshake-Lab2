
const initialState={

    isLoggedIn:true,
    userType:'student',
    studentId:'1'
}

const reducer=(state=initialState,action)=>{
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
            studentId:action.studentId
        }
    }
return state;
}

export default reducer;