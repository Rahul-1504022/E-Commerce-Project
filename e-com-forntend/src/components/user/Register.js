import Layout from "../Layout";
import { useState } from "react";
import { showError, showLoading } from "../../utils/messages";
import { register } from "../../api/apiAuth";
import { NavLink } from "react-router-dom";

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        success: false,
        errMsg: ''
    });

    const { name, email, password, success, error, loading, disabled, errMsg } = values;

    const handleChange = (event) => {
        setValues({
            ...values,
            error: false,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
        });
        register({ name, email, password })
            .then(response => {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    success: true
                })
            })
            .catch(error => {
                console.log(error.response.data);
                // if (error.response) {
                //     errMsg = error.response.data;
                // }
                setValues({
                    ...values,
                    errMsg: error.response.data,
                    error: true,
                    disabled: false,
                    loading: false,
                })
            })
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name:</label>
                <input type="text" name="name" className="form-control" onChange={handleChange}
                    value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input type="email" name="email" className="form-control" onChange={handleChange}
                    value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input type="password" name="password" className="form-control" onChange={handleChange}
                    value={password} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={disabled}>Create Account</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return (
                <div className="alert alert-primary">
                    New Account Created.Please <NavLink to="/login">Login</NavLink>
                </div>
            )
        }
    }

    return (
        <Layout title="Register" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showLoading(loading)}
            {showError(error, errMsg)}
            <h3>Register Here</h3>
            <hr />
            {signUpForm()}
            <hr />
        </Layout>
    )
}
export default Register;