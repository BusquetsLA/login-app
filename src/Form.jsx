import React from 'react';
import './Form.css';

export function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = 'Username is required';
  } else if (!/\S+@\S+\.\S+/.test(input.username)) {
    errors.username = 'Username is invalid';
  }
  if (!input.password) {
    errors.password = 'Password is required';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = 'Password is invalid';
  }
  return errors;
};
export default function  Form() {
  const [input, setInput] = React.useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = React.useState({});
  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    }); /* the current state of the input */
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    })); /* the current state of the errors */
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User: ${input.username}, Password: ${input.password}`);
  }; /* there is no connection to an API so we'll just display your password on the screen */
  return (
      <div> 
        <form className='login-box' onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='textbox'>
            <i className="fa fa-user"></i>
            <input type='text' name='username' placeholder="Username" className={`${errors.username && 'danger'}`} value={input.username} onChange={handleInputChange}/>
            {/* we could just use type='email' here but i was trying to use the regex */}
              {errors.username && (<p className="danger">{errors.username}</p>)}
          </div>
          <div className='textbox'>
            <i className='fa fa-lock'></i>
            <input type='password' name='password' placeholder="Password" className={`${errors.password && 'danger'}`} value={input.password} onChange={handleInputChange}/>
              {errors.password && (<p className="danger">{errors.password}</p>)}
          </div>
          <button type='submit' className='btn'> Sign In </button>
        </form>
      </div>
  );
};