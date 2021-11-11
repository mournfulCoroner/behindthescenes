import React from "react";
import "../login.css";
import { userActionCreator, userGetters, userThunkCreators } from "../../../bll/reducers/reducerUser";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Modal, Button } from "react-bootstrap";
import { loginActionCreators } from "../../../bll/reducers/reducerLogin";


const LoginForm = ({ isVisible, goToRegistrationForm, login, loginError, deleteLoginError, toggleOpenLogin }) => {
    const onClickGoTo = (e) => {
        e.preventDefault();
        goToRegistrationForm();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const loginForm = e.currentTarget;
        login(loginForm.elements.nickname.value, loginForm.elements.password.value);
    }

    const handlerDeleteLoginError = () => {
        if (loginError) {
            deleteLoginError();
        }
    }

    return (
        
        <Modal size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isVisible}
            onHide={toggleOpenLogin}>
            <Modal.Header closeButton>
                <h2 className="login__title" id="contained-modal-title-vcenter">Войти</h2>
            </Modal.Header>
            <Modal.Body>
                <form
                    className="login__form"
                    onSubmit={onSubmit}
                    action="#"
                >
                    {/* <div className="login__form-element">
                    <h2 className="login__title">Войти</h2>
                </div> */}

                    <TextField
                        label="Никнейм"
                        name="nickname"
                        error={!!loginError}
                        onChange={handlerDeleteLoginError}
                    />

                    <TextField
                        label="Пароль"
                        name="password"
                        type="password"
                        error={!!loginError}
                        onChange={handlerDeleteLoginError}
                    />

                    <div
                        className={`login__error ${!loginError && "login__error_hidden"}`}
                    >
                        {loginError}
                    </div>

                    <div className="login__form-element">
                        <Button className="m-3 px-3" variant="dark" type="submit">Войти</Button>
                        {/* <button className="login__main-button " type="submit">Войти</button> */}

                        <button
                            onClick={onClickGoTo}
                            className="login__additional-button fs-6"
                        >Регистрация</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
        
    );
}

const mapStateToProps = (state) => ({
    loginError: userGetters.getLoginError(state)
});

const mapDispatchToProps = (dispatch) => ({
    toggleOpenLogin() {
        dispatch(loginActionCreators.toggleOpen());
    },
    login(nickname, password) {
        dispatch(userThunkCreators.login(nickname, password));
    },
    deleteLoginError() {
        dispatch(userActionCreator.changeLoginError(""));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
