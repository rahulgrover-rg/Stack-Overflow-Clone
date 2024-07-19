import React, { useState } from 'react' ;
import './Auth.css' ;
import icon from "../../assets/icon.png";
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../actions/auth';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [newPassword , setNewPassword] = useState('') ;
    const [confirmPassword , setConfirmPassword] = useState('') ;
    const [newConfirmed , setNewConfirmed] = useState(true) ;
    const dispatch = useDispatch() ;
    const params = useParams() ;
    const navigate = useNavigate() ;
    const {id , token} = params ;

    const handleSubmit = (e) => {
      e.preventDefault() ;

      if(newPassword === confirmPassword) {
        setNewConfirmed(true) ;
        dispatch(resetPassword({newPassword,id,token}, navigate)) ;
      } else {
        setNewConfirmed(false) ;
      }
    }


  return (
    <section className="auth-section">
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          
          <label htmlFor="pass">
            <h4>Password</h4>
            <input
              type="password"
              name="pass"
              id="pass"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </label>
          <label htmlFor="cpass">
            <h4>Confirm password</h4>
            <input
              type="password"
              name="pass"
              id="cpass"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </label>
            {newConfirmed ? 
            '' :
            <p className='error-text'>password and confirm password don't match.</p>  
          }
          
          <button type="submit" className="auth-btn">
            Reset Password
          </button>
        </form>
        
      </div>
    </section>
  )
}

export default ResetPassword