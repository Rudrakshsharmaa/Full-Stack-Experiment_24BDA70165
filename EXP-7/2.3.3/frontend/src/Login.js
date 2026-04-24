import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Enter Chat</h2>
      <input
        placeholder="Enter username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <button onClick={() => setUser(name)}>Enter Chat</button>
    </div>
  );
};

export default Login;