import React, { useState } from "react";
import Link from "next/link";
import { postRequest } from "../../utils/axios";
import { useRouter } from "next/router";

const Register: React.FC = () => {
  const router = useRouter();
  const [userState, setUserState] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserState((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      let bodyUserRegis = { ...userState };
      let res = await postRequest("auth/register", bodyUserRegis);
      console.log(res, "register")
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="mb-4">Register</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="username"
                onChange={handleChangeInput}
              />
            </div>
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
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password_confirmation"
                placeholder="Confirm your password"
                onChange={handleChangeInput}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
          <p className="mt-3">
            Already have an account?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
