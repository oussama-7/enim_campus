import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [file, setFile] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    img: '',
    city: '',
    phone: '',
  });
  const [validationError, setValidationError] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validation = (credentials) => {
    const errors = {};

    if (!credentials.firstName) {
      errors.firstName = 'First name is required';
    } else if (!credentials.lastName) {
      errors.lastName = 'Last name is required';
    } else if (!credentials.username) {
      errors.username = 'Username is required';
    } else if (!credentials.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'Invalid email format';
    } else if (!credentials.city) {
      errors.city = 'City is required';
    } else if (!credentials.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const val = validation(credentials);
    setValidationError(val);
    console.log(credentials);
    if (
      !val.firstName &&
      !val.lastName &&
      !val.username &&
      !val.email &&
      !val.city &&
      !val.city &&
      !val.password
    ) {
      dispatch({ type: 'LOGIN_START' });
      try {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'upload');
        let res;
        if (file) {
          const uploadRes = axios.post(
            'https://api.cloudinary.com/v1_1/dlvlxisrh/image/upload',
            data
          );
          const { url } = (await uploadRes).data;
          const newUser = {
            ...credentials,
            img: url,
          };
          res = await axios.post('/auth/register', newUser);
        } else {
          res = await axios.post('/auth/register', credentials);
        }
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        localStorage.setItem('state.user', JSON.stringify(res.data));

        navigate('/cart');
        setSuccessMessage('Successfully Registred! ');
      } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form-signup">
        <img
          className="mb-4"
          src="https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
        <div className="row">
          <div className="col-lg-6">
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="firstName"
              className="form-control"
              placeholder="First Name"
              required
              autoFocus
              autoComplete="off"
            />
            {validationError.firstName && (
              <p style={{ color: 'red', fontSize: '13px' }}>
                {validationError.firstName}
              </p>
            )}
          </div>
          <div className="col-lg-6">
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="lastName"
              className="form-control"
              placeholder="Last Name"
              required
              autoComplete="off"
            />
            {validationError.lastName && (
              <p style={{ color: 'red', fontSize: '13px' }}>
                {validationError.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              required
              autoComplete="off"
            />
            {validationError.username && (
              <p style={{ color: 'red', fontSize: '13px' }}>
                {validationError.username}
              </p>
            )}
          </div>
          <div className="col">
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
              autoComplete="off"
            />
            {validationError.email && (
              <p style={{ color: 'red', fontSize: '13px' }}>
                {validationError.email}
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label htmlFor="city" className="sr-only">
              City
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="city"
              className="form-control"
              placeholder="City"
              required
              autoComplete="off"
            />
            {validationError.city && (
              <p style={{ color: 'red', fontSize: '13px' }}>
                {validationError.city}
              </p>
            )}
          </div>
          <div className="col-lg-6">
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="phone"
              className="form-control"
              placeholder="Phone"
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="custom-file form-control">
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="custom-file-input"
              />
              <label className="custom-file-label" htmlFor="customFile">
                Image{' '}
              </label>
            </div>
          </div>

          <div className="col-lg-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
              autoComplete="new-password"
            />
            {validationError.password && (
              <p style={{ color: 'red', fontSize: '13px' }}>
                {validationError.password}
              </p>
            )}
          </div>
        </div>
        <div className="mb-3">
          <Link to="/login">
            <span
              onClick={() => {
                dispatch({ type: 'LOGIN_START' });
              }}
            >
              You already have an account, Login?
            </span>
          </Link>
        </div>

        <button
          onClick={handleClick}
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Sign up
        </button>
        {/* {(successMessage!=="") && <Link to="/login">
            <button style={{margin:"20px"}} className="btn btn-lg btn-primary btn-block" onClick={()=>{dispatch({ type: "LOGIN_START" });}} >Successfully Registred, try to Login</button>
          </Link>} */}
        <div className="mb-3">
          {error && (
            <p style={{ color: 'red', margin: '20px' }}>{error.message}</p>
          )}
          {successMessage && (
            <>
              <div
                style={{ margin: '20px' }}
                className="alert alert-info sm-gap big-zindex"
              >
                {successMessage}{' '}
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch({ type: 'LOGIN_START' });
                  }}
                >
                  Login
                </Link>{' '}
              </div>
            </>
          )}
        </div>

        <p className="mt-5 mb-3 text-muted">&copy; Enim campus</p>
      </form>
    </div>
  );
};

export default Register;
