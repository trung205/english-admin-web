import React, { useState } from "react";
import Link from "next/link";
import { IUserLogin } from "@interfaces/auth/auth.interface";
import AuthService from "../../src/services/auth.service";
import { useRouter } from "next/router";
import { useAppDispatch } from "@redux/store";
import { loginSuccess } from "../../src/redux/slices/auth";
import routes from "constants/routes";
import styles from "../../src/styles/login/Login.module.scss";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userState, setUserState] = useState<IUserLogin>({
    email: "",
    password: "",
  });

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
      dispatch(loginSuccess(res));
      router.push(routes.private.users);
    } catch (error) {
      console.log(error);
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
                  <h2 className="fw-bold mb-2 text-uppercase">Đăng nhập</h2>
                  <p className="text-white-50 mb-5"> </p>

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

                  {/* <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p> */}

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmitLogin}
                  >
                    Đăng nhập
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
                    Bạn không có tài khoản?{" "}
                    <Link href={routes.auth.register}>
                      <a href="#!" className="text-white-50 fw-bold">
                        Đăng ký
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

export default Login;
