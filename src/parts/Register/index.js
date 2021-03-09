import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";

function Register() {
  return (
    <div className="container">

        <h1 className="h2 text-warning mb-4">Register</h1>

      <form>
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="text" placeholder="Fullname" />
        <Input type="text" placeholder="Gender" />
        <Input type="number" placeholder="phone" />
        
        <div className="mt-5"></div>
        <Button name="Register" />
      </form>

      <p className="text-secondary text-center mt-2">Already have an account ?  Klik <span className="font-weight-bold"> Here </span></p>

    </div>
  );
}

export default Register;
