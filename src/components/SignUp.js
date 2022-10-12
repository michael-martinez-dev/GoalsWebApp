import React from "react";
import "./style/AuthPage.css";

const SignUp = () => {
    const [error, setError] = React.useState("");
    const [result, setResult] = React.useState("");

    function handleSignUp(e) {
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
        const { firstName, lastName, email, password } = e.target.elements;
        try {
            if (firstName !== "" && lastName !== "" && emailRegex.test(email.value) && passwordRegex.test(password.value)) {
                console.debug(email.value);
                console.debug(password.value);
                console.log(`${process.env.REACT_APP_USER_AUTH_BASE_URL}${process.env.REACT_APP_USER_AUTH_API_BASE_ENDPOINT}/signup`)
                fetch(`${process.env.REACT_APP_USER_AUTH_BASE_URL}${process.env.REACT_APP_USER_AUTH_API_BASE_ENDPOINT}/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: `{"email": "${email.value}", "password": "${password.value}"}`
                })
                .then(res => res.json())
                .then(data => {
                    console.debug(data);
                    setResult("Success!");
                    e.target.elements.firstName.value = "";
                    e.target.elements.lastName.value = "";
                    e.target.elements.email.value = "";
                    e.target.elements.password.value = "";
                })
                .catch(err => {
                    console.debug(err);
                    setResult("Error signing up");
                });
            } else {
                setResult("");
            }
        } catch (error) {
            setError(error.message);
        } finally {

        }

    }

    return (
    <div>
        <form className="form" onSubmit={handleSignUp}>
            <div className="error">
                {error}
            </div>
            <table>
                <tbody>
                <tr>
                        <td>
                            <label htmlFor="firstName"> First Name</label>
                        </td>
                        <td>
                            <input type="text" name="firstName" id="firstName" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="lastName"> Last Name</label>
                        </td>
                        <td>
                            <input type="text" name="lastName" id="lastName" />
                        </td>
                    </tr>
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
        <div className="result">
            {result}
        </div>
    </div>);
}

export default SignUp;
