import React, { useState, useEffect } from "react";
import { NavbarComponent } from "@components/navbar";
import { Container} from "react-bootstrap";
import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import routes from "constants/routes";

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (!user.isLoggedIn) router.push(routes.auth.login);
    setIsLogin(user.isLoggedIn)
  }, [user])
  return (
    <>
      <Container fluid className="px-0">
        <div className="d-flex">
          {isLogin && (
            <div>
              <NavbarComponent />
            </div>
          )}
          <div className="w-100 overflow-auto vh-100">
            <main>{children}</main>
          </div>
        </div>
      </Container>
    </>
  );
};
