import React, { useState } from "react";
import Link from "next/link";
import { postRequest } from "../../utils/axios";
import { useRouter } from "next/router";
import { registerSuccess, registerFail } from "../../src/redux/slices/auth";
import { useAppDispatch } from "@redux/store";
import routes from "constants/routes";
import styles from "./Register.module.scss"

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
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
      await postRequest("auth/register", bodyUserRegis);
      dispatch(registerSuccess());
      router.push(routes.auth.login);
    } catch (error) {
      console.log(error);
      dispatch(registerFail());
    }
  };

  return (
    <section className={`vh-100 ${styles.gradient_custom}`}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Đăng ký</h2>
                  <p className="text-white-50 mb-5"> </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="Họ tên"
                      name="username"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      name="email"
                      onChange={handleChangeInput}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="Mật khẩu"
                      name="password"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="Xác nhận mật khẩu"
                      name="password_confirmation"
                      onChange={handleChangeInput}
                    />
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Đăng ký
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">
                    Bạn đã có tài khoản?{" "}
                    <Link href={routes.auth.login}>
                      <a href="#!" className="text-white-50 fw-bold">
                        Đăng nhập
                      </a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
