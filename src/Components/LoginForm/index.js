import { useState, useEffect } from "react"

import Cookies from "js-cookie"

import { useNavigate } from "react-router-dom"; 

import "./index.css"

function LoginForm(){
    const [username, setUserName] = useState('');
    
    const [password, setPassword] = useState('');

    const [errorsMsg, setErrormsg] = useState('');

    const [isShow, setShowMsg] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token");
        if (jwtToken !== undefined){
            navigate("/")
        }
    },[navigate])

    const onSuccess = (token) => {
    
        Cookies.set("jwt_token", token, { expires:30 });

        navigate("/");
    }

    const onSubmitLoginForm = async (event) => {
        event.preventDefault();
        const userDetails = {username,password}
        const Api = 'https://apis.ccbp.in/login'

        let options = {
            method: "POST",
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(Api, options);
        const fetchData = await response.json();
        
        if (response.ok === true){
            setShowMsg(false);
        
            onSuccess(fetchData.jwt_token)
        }else{
            setShowMsg(true);
            setErrormsg(fetchData.error_msg);
        }
    
    }

    const onchangeUserInput = (event) =>{
        setUserName(event.target.value);
    }

    const onchangepassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <main className="Login_main_container">
            <section className="Login_container">
                <img className="logo"  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo"/>
                <form className="form_container" onSubmit={onSubmitLoginForm}>
                    <div className="input_container">
                        <label className="Label" htmlFor ="Input">username</label>
                        <input type = "text" placeholder="Username" className="input" id="Input" onChange={onchangeUserInput} value={username}/>
                    </div>
                    <div className="input_container">
                        <label className="Label" htmlFor ="Password">password</label>
                        <input type = "password" placeholder="Password" className="input" id="Password" onChange={onchangepassword} value={password}/>
                    </div>
                    <button type="submit" className="loginbtn">Login</button>
                    {isShow ? (<p className="errors">*{errorsMsg}</p>) : ""}
                    
                </form>
            </section>
        </main>
    )
}

export default LoginForm