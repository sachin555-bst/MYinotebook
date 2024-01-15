import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';



const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""})
 let history = useHistory();

   const handleSubmit= async (e)=>{
    console.log("Submit button clicked");
e.preventDefault();

const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    //   "auth-token":
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1ZTIzYmJhY2FiZTM0OTVmYTQyYTliIn0sImlhdCI6MTcwMDY2ODM0N30.co7N16xJzjUyK1BCFMqbcQMjABR8T2AiAzwMwj0EXpI",
    },
  
    body:JSON.stringify({email:credentials.email,password:credentials.password})
  });
  const json = await response.json()
  console.log(json)
if(json.success){
  localStorage.setItem('token',json.authtoken);
  console.log("done token");
  history.push("/")
  props.showAlert("Logged in  successfully","success")
  window.location.href = '/';   // it helps to reload the page
}
else{
 props.showAlert("invalid credentials","danger")
}

    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className='mt-3'>
    <h2>Login to continue iNotebook</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">Well never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} id="password" onChange={onChange} name='password'/>
  </div>
  
  <button  type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
