import React, { useState } from "react";
import Login from "./Login";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState("");

  return (
    <div>
      {!user ? <Login setUser={setUser} /> : <Chat user={user} />}
    </div>
  );
}

export default App;