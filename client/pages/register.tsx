import { NextPage } from "next";
import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";

const Register: NextPage = () => {
  return (
    <main className="max-h-[100vh]">
      <RegisterForm />
    </main>
  );
};

export default Register;
