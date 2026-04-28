import { useState } from "react";
import "./App.css";
import Counter from "./Components/Counter";
import Header from "./Components/Header";

export default function App() {
  const [userName, setUserName] = useState("Guest");

  function handleSubmit(event) {
    event.preventDefault();

    const nextUserName = event.currentTarget.elements.userName.value;
    setUserName(nextUserName);
    event.currentTarget.reset();
  }

  return (
    <main className="app-shell">
      <form className="name-form" onSubmit={handleSubmit}>
        <label htmlFor="userName">Enter user name</label>
        <div className="form-row">
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="Type a name"
          />
          <button type="submit">Save</button>
        </div>
      </form>

      <Header userName={userName} />
      <section className="counter-card">
        <Counter />
      </section>
    </main>
  );
}
