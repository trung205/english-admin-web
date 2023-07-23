import React, { useState } from "react";
import { NavbarComponent } from "@components/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export const Layout: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
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
