import React, { useEffect, useState } from "react";
import { IUser } from "../../types/types";
import { addUser, getUsers } from "../../util_user";
import { useNavigate } from "react-router-dom";
import "../../components/Style/Login.css";

const Register = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const usernameExists = users.find((user) => user.username === username);
    const isEmptyUsername = !username;
    const isEmptyPassword = !password;
    const passwordsDoNotMatch = password !== confirmPassword;

    if (usernameExists) {
      alert("Username already exists! Please choose a different username.");
    } else if (isEmptyUsername || isEmptyPassword || passwordsDoNotMatch) {
      alert("Please fill all required fields and ensure passwords match.");
      if (isEmptyUsername) alert("Username is required.");
      if (isEmptyPassword) alert("Password is required.");
      if (passwordsDoNotMatch) alert("Passwords do not match.");
    } else {
      try {
        const newUser: IUser = {
          username,
          password,
          role,
          userId: 0,
        };

        await addUser(newUser);
        alert("Registration successful!");
        navigate("/login");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginBox">
        <div className="loginHeader">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              className="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <select
              className="password"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="button">
            Register
          </button>
          <button type="button" className="button" onClick={() => navigate("/login")}>
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
