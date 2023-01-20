import React , { useState , useEffect}from "react"
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
export default function Login() {
  useEffect(()=>{
    const auth = localStorage.getItem('User')
    if(auth)
    {
      navigate("/")
    }
    // else {
    //   navigate("/signup")
    // }

  })
  const [password , setPassword] =useState("");
  const [email , setEmail] =useState("");
  const navigate = useNavigate()

  const handleLogin =  async()=>{
// console.log(email , password)
let  result =  await fetch("http://localhost:3000/login" , {
  method :"post",
  body : JSON.stringify({ email , password}) , 
  headers :{
    'content-type' :'application/json'
  }
})
result = await result.json()
// console.log(result)
if(result.auth){
localStorage.setItem("User"  , JSON.stringify(result.user))
localStorage.setItem("token"  , JSON.stringify(result.auth))

  navigate("/")
}
else{

  alert("please enter correct details")
  navigate("/signup")

}
  }

  return (
    <div className="form">
             <Form>
            <h1>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Button variant="primary"  onClick={handleLogin}>
        Submit
      </Button>
    </Form>
        </div>
  )
}
