import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/users");
  }, []);
  return <div className="d-flex flex-column min-vh-100"></div>;
};

export default Home;
