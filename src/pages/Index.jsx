import { useState, useEffect } from "react";

import Main from "../components/Main";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";

import { getSession, logout } from "../lib/data";

const Index = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (session) setUsername(session);
  }, []);

  const handleAuth = (user) => setUsername(user);

  const handleLogout = () => {
    logout();
    setUsername(null);
  };

  if (!username) return <SignIn onAuth={handleAuth} />;

  return (
    <>
      <Navbar username={username} onLogout={handleLogout} />
      <Main username={username} />
    </>
  );
};

export default Index;
