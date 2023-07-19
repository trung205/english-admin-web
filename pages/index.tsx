import React from "react";

import { Cards, Footer, Header, Main } from "@components";

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main />
      <Cards />
      <Footer />
    </div>
  );
};

export default Home;
