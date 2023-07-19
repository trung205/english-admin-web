import React from "react";
import { NavbarComponent } from "@components/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Container fluid className="px-0">
        <div className="d-flex">
          <div>
            <NavbarComponent />
          </div>
          <div className="w-100 overflow-auto vh-100">
            <main>{children}</main>
          </div>
        </div>
      </Container>
    </>
  );
};
