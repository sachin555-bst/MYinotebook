import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';


const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"" ,email:"", password:"", cpassword:""})
  let history = useHistory();

  const handleSubmit= async (e)=>{
    console.log("Submit button clicked");
    e.preventDefault();
    const {name,email,password}= credentials;

const response = await fetch("http://localhost:5000/api/auth/createuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    //   "auth-token":
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1ZTIzYmJhY2FiZTM0OTVmYTQyYTliIn0sImlhdCI6MTcwMDY2ODM0N30.co7N16xJzjUyK1BCFMqbcQMjABR8T2AiAzwMwj0EXpI",
    },
  
    body:JSON.stringify({name,email,password})
  });
  const json = await response.json()
  console.log(json)
if(json.success){
  localStorage.setItem('token',json.authtoken);
  console.log("done token");
  history.push("/")
  window.location.href = '/';   // it helps to reload the page
  props.showAlert("Account created successfully","success")
}
else{
  props.showAlert("invalid Details","danger")
}

    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div className='container mt-3'>
    <h2>Create an account to use iNotebook</h2>
    <form onSubmit={handleSubmit}>

    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  onChange={onChange}  name='name' aria-describedby="emailHelp"/>
  </div>

    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp"/>
    </div>

    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control"  id="password"  onChange={onChange} minLength={5} required
      name='password'/>
    </div>

    <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control"  id="cpassword" onChange={onChange} minLength={5} required name='cpassword'/>
  </div>
    
    <button  type="submit" className="btn btn-primary" >Submit</button>
  </form>
    </div>
  )
}

export default Signup
