// pages/login.js

import React, { useState } from "react";
import Link from "next/link";
import { IUserLogin } from "@interfaces/auth/auth.interface";
import AuthService from "../../src/services/auth.service"
import { useRouter } from "next/router";


const Login: React.FC = () => {
  const router = useRouter();
  const [userState, setUserState] = useState<IUserLogin>({
    email: "",
    password: "",
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserState((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      let bodyUserLogin = { ...userState };
      let res = await AuthService.login(bodyUserLogin);
      console.log(res, "login")
      router.push('/posts/first-post');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="mb-4">Login</h2>
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                onChange={handleChangeInput}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmitLogin}>
              Login
            </button>
          </form>
          <p className="mt-3">
            Don't have an account?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
