

import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import Header from "../Header/header";
import '../../scss/Login.scss'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

type UserModel = {
  name: string;
  username: string;
  password: string;
};


async function LoginHadelling(e: any, username: string, password: string, isTeacher: boolean, navigate: any) {

  e.preventDefault();
  const res = await axios.post<any>(
    'http://localhost:4001/auth/login',
    { username: username, password: password, isTeacher: isTeacher },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
    .then()
    .catch();
  if (res.data && res.data.currentUser.length >0  ) {
    console.log("xxxxx", res.data)
    if(res.data.isTeacher){
      navigate('/teacher/dashboard', { state: { userInfo: res.data} }); 
    }
    else{
      navigate('/', { state: { userInfo: res.data} }); 
    }
  }
  else {
    alert("Fail")
  }
}



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkStudentOrTeach, setStudentOrTeach] = useState(false); // New state for the checkbox
  const handleCheckboxChange = () => {
    setStudentOrTeach(!checkStudentOrTeach);
  };
  const navigate = useNavigate();




  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="wrap">
              <div className="img"></div>
              <div className="login-wrap p-4 p-md-5">
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className="mb-4">Sign In</h3>
                  </div>
                </div>
                <form action="#" className="signin-form" onSubmit={(e) => LoginHadelling(e, username, password,checkStudentOrTeach,  navigate)}>
                  <div className="form-group mt-3">
                    <label className="form-control-placeholder" htmlFor="username">Username</label>
                    <input id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" required />
                  </div>
                  <br></br>
                  <div className="form-group">
                    <label className="form-control-placeholder">Password</label>
                    <input type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                    <span data-toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
                  </div>
                  <br></br>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="form-group">
                      <label>
                        Login as Teacher 
                        <input
                          type="checkbox"
                          checked={checkStudentOrTeach}
                          onChange={handleCheckboxChange}
                          style={{ "marginLeft": "8px" }}
                        />
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;

