import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          name: formData.name,
          age: Number(formData.age),
          phone: formData.phone,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setMessage(`✅ User created (ID: ${data.id})`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create user");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} style={inputStyle} />
        <input name="age" placeholder="Age" onChange={handleChange} style={inputStyle} />
        <input name="phone" placeholder="Phone" onChange={handleChange} style={inputStyle} />
        <input name="email" placeholder="Email" onChange={handleChange} style={inputStyle} />

        <button type="submit">Save</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

const inputStyle = {
  display: "block",
  marginBottom: "10px",
  padding: "8px",
};

export default App;
