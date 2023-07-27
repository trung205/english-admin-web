const routes = {
  auth: {
    login: "/login",
    register: "/register",
  },
  private: {
    dashboard: "/lessons",
    home: "/",
    users: "/users",
    listenings: (id: string) => `/lessons/listenings/${id}`,
    readings: (id: string) => `/lessons/readings/${id}`,
    grammars: (id: string) => `/lessons/grammars/${id}`,
  }
};

export default routes;
