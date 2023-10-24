import React from "react";
import { useNavigate } from "react-router-dom";

function Logout({ onLogout }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    onLogout(false);
    navigate("/");
  }, [onLogout]);
}

export default Logout;
