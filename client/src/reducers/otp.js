const otpReducer = (state = {}, action) => {
    switch (action.type) {
      case 'OTP_SENT':
        return { ...state, otpToken: action.payload.otpToken, otpRequired: action.payload.otpRequired };
      case 'OTP_VERIFIED':
        return { ...state, otpVerified: true, message: action.payload.message };
      default:
        return state;
    }
  };
  
  export default otpReducer;
  