import React from 'react';
import "../style/AuthPage.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';

const AuthPage = ({setToken, setUserId}) => {

    return (
        <div className="auth-page">
            <Tabs>
                <TabList>
                    <Tab>Sign In</Tab>
                    <Tab>Sign Up</Tab>
                </TabList>

                <TabPanel>
                    <SignIn setToken={setToken} setUserId={setUserId} />
                </TabPanel>
                <TabPanel>
                    <SignUp/>
                </TabPanel>
            </Tabs>
        </div>
    );
}

AuthPage.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUserId: PropTypes.func.isRequired
}

export default AuthPage;
