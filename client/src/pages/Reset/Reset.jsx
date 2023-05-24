import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./reset.css";

const Reset = () => {
  const [email, setEmail] = useState("");
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const validation = (credentials) => {
    const errors = {};
    if (!credentials.email) {
      errors.email = "Email is required";
    }else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const val = validation({ email });
    setValidationError(val);

    if (!val.email) {
      try {
        const res = await axios.post("/auth/forgotPassword", { email });
        alert(res.data.message);
      } catch (err) {}
    }
  };

  return (
    <div className="form-container">
      <form className="form-signin">
        <img
          className="mb-4"
          src="https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Reset password</h1>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          className="form-control"
          placeholder="Email"
          required
          autoFocus
        />
        {validationError.email && (
          <p style={{ color: "red", fontSize: "13px" }}>
            {validationError.email}
          </p>
        )}

        <button
          onClick={handleClick}
          className="btn btn-lg btn-primary btn-block form-control"
          type="submit"
        >
          Submit
        </button>
        <div className="mb-3">
          {error && (
            <p style={{ color: "red", margin: "20px" }}>{error.message}</p>
          )}
        </div>

        <p className="mt-5 mb-3 text-muted">&copy; Enim campus</p>
      </form>
    </div>
  );
};

export default Reset;
