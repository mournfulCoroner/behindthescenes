import React, {useState} from "react";
import "./login.css"
import LoginForm from "./LoginForm/LoginForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import {loginActionCreators, loginGetters} from "../../bll/reducers/reducerLogin";
import {connect} from "react-redux";

const Login = (props) => {
    const [isActiveLoginForm, setIsActiveLoginForm] = useState(false);

    return (
            <section>
                <LoginForm
                    isVisible={props.isOpen}
                    goToRegistrationForm={() => {
                        setIsActiveLoginForm(true);
                        props.toggleOpenLogin();
                    }}
                />
                <RegistrationForm
                    isVisible={isActiveLoginForm}
                    goToLoginForm={() => {
                        setIsActiveLoginForm(false);
                        props.toggleOpenLogin();
                    }}
                    closeForms={() => setIsActiveLoginForm(false)}
                />
            </section>
    );
}

const mapStateToProps = (state) => ({
    isOpen: loginGetters.getIsOpenLogin(state)
});

const mapDispatchToProps = (dispatch) => ({
    toggleOpenLogin() {
        dispatch(loginActionCreators.toggleOpen());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
