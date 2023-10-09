interface UserState {
    userEmail: string;
    
  }
  
  const initialState: UserState = {
    userEmail: '', 
   
  };
  
  const userReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
      case 'SET_USER_EMAIL':
        return { ...state, userEmail: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;