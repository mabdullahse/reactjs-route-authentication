import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function mocklogin() {
  return Promise.resolve({
    token: "your_token_value_here",
    data: {
      user: {
        id: 123456,
        username: "example_user",
        email: "user@example.com",
        full_name: "John Doe",
        role: "admin",
      },
    },
    status: "active",
  });
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      //
      const res = await mocklogin();

      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("here");
        navigate("/");
        return;
      }
    };

    // validateToken();

    // Cleanup function
    return () => {
      // Perform cleanup if necessary
    };
  }, []);

  const loginAction = async (data) => {
    try {
      //   const response = await fetch("your-api-endpoint/auth/login", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });
      //   const res = await response.json();

      const res = await mocklogin();

      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
