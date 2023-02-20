import React from "react";
import { useNavigate } from "react-router-dom";

function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    if (!confirm("Are you sure you want to logout")) {
      return;
    }

    localStorage.removeItem("login");

    navigate("/auth/#signin");
  }

  return (
    <div>
      AppLayout <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AppLayout;
