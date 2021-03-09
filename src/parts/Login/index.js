import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

function Login() {
  return (
    <div className="container">

        <h1 className="h2 text-warning mb-4">Login</h1>

      <form>
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        
        <div className="mt-5"></div>
        <Button name="Login" />
      </form>

      <p className="text-secondary text-center mt-2">Don't have an account ? Klik  <span className="font-weight-bold"> Here </span></p>
    </div>
  );
}

export default Login;
