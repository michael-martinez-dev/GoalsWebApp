import React from "react";
import "../style/AuthPage.css";
import PropTypes from 'prop-types';

const SignIn = ({setToken, setUserId}) => {
    const [error, setError] = React.useState("");

    function handleSignIn(e) {
        const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
        const passwordRegex = new RegExp(/.+/);
        if (!emailRegex.test(e.target.email.value)) {
            setError("invalid email address");
        } else if (!passwordRegex.test(e.target.password.value)) {
            setError("invalid password");
        } else {
            setError("");
        }
        e.preventDefault();
        const { email, password } = e.target.elements;
        try {
            if (emailRegex.test(email.value) && passwordRegex.test(password.value)) {
                fetch(`https://auth.mixedmachine.ml/api/v1/signin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: `{"email": "${email.value}", "password": "${password.value}"}`
                })
                .then(res => res.json())
                .then(data => {
                    console.debug(data);
                    if (data.token !== undefined) {
                        setToken(data.token);
                    }
                    if (data.userId !== undefined) {
                        setUserId(data.userId);
                    }
                })
                .catch(err => {
                    console.debug(err);
                    setError("Error signing in");
                });
            }
        } catch (error) {
            setError(error.message);
        } finally {
            e.target.elements.email.value = "";
            e.target.elements.password.value = "";
        }

    }

    return (
    <div>
        <form className="form" onSubmit={handleSignIn}>
            <div className="error">
                {error}
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="email">Email</label>
                        </td>
                        <td>
                            <input type="email" name="email" id="email" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="password">Password</label>
                        </td>
                        <td>
                            <input type="password" name="password" id="password" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="submit-button" type="submit">Submit</button>
        </form>
    </div>);
}

SignIn.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default SignIn;
