import React, { useEffect, useState } from "react";
import { userActionCreator, userGetters, userThunkCreators } from "../../../bll/reducers/reducerUser";
import { connect } from "react-redux";
import { util } from "../../../util/util";
import TextField from "@material-ui/core/TextField";
import { Modal, Button } from "react-bootstrap";

const MIN_SIZE = 6;
const MAX_SIZE = 50;

const checkSize = (text) => {
    if (text.length < MIN_SIZE) {
        return `Минимальный размер ${MIN_SIZE} символов`;
    }

    if (text.length > MAX_SIZE) {
        return `Максимальный размер ${MAX_SIZE} символов`;
    }

    return "";
}

const RegistrationForm = ({ isVisible, goToLoginForm, registration,
    registrationError, deleteRegistrationError, closeForms
}) => {
    const [errorNickname, setErrorNickname] = useState("");
    const [sizeErrorPass1, setSizeErrorPass1] = useState("");
    const [sizeErrorPass2, setSizeErrorPass2] = useState("");
    const [errorNotSamePass, setErrorNotSamePass] = useState("");

    useEffect(() => {
        setErrorNickname(registrationError);
    }, [registrationError]);

    const onClickGoTo = (e) => {
        e.preventDefault();
        goToLoginForm();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const loginForm = e.currentTarget;

        const newErrNick = checkSize(loginForm.elements.nickname.value);
        const newErrPass1 = checkSize(loginForm.elements.password.value);
        const newErrPass2 = checkSize(loginForm.elements.passwordAgain.value);

        if (newErrNick) {
            setErrorNickname(newErrNick);
        }

        if (newErrPass1) {
            setSizeErrorPass1(newErrPass1);
        }

        if (newErrPass2) {
            setSizeErrorPass2(newErrPass2);
        }

        if (newErrNick || newErrPass1 || newErrPass2) {
            return;
        }

        if (loginForm.elements.password.value !== loginForm.elements.passwordAgain.value) {
            setErrorNotSamePass("Пароли должны быть одинаковыми");
            return;
        }

        registration(
            loginForm.elements.nickname.value,
            loginForm.elements.password.value
        );

        closeForms();

    }

    const handlerDeleteLoginError = () => {
        if (registrationError) {
            deleteRegistrationError();
        }
    }

    const handlerNickname = (e) => {
        handlerDeleteLoginError();

        if (errorNickname) {
            setErrorNickname(checkSize(e.target.value));
        }
    }

    const handlerPass1 = (e) => {
        if (errorNotSamePass) {
            setErrorNotSamePass("");
        }

        if (sizeErrorPass1) {
            setSizeErrorPass1(checkSize(e.target.value));
        }
    }

    const handlerPass2 = (e) => {
        if (errorNotSamePass) {
            setErrorNotSamePass("");
        }

        if (sizeErrorPass2) {
            setSizeErrorPass2(checkSize(e.target.value));
        }
    }

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isVisible}
            onHide={closeForms}>
            <Modal.Header closeButton>
                <h2 className="login__title" id="contained-modal-title-vcenter">Регистрация</h2>
            </Modal.Header>
            <Modal.Body>
                <form
                    className="login__form"
                    onSubmit={onSubmit}
                    id="registrationForm"
                    action="#"
                >

                    <TextField
                        label="Никнейм"
                        name="nickname"
                        error={!!errorNickname}
                        onChange={handlerNickname}
                        helperText={errorNickname}
                    />

                    <TextField
                        label="Пароль"
                        name="password"
                        type="password"
                        onChange={handlerPass1}
                        error={!!sizeErrorPass1 || !!errorNotSamePass}
                        helperText={sizeErrorPass1 || errorNotSamePass}
                    />

                    <TextField
                        label="Повторите пароль"
                        name="passwordAgain"
                        type="password"
                        onChange={handlerPass2}
                        error={!!sizeErrorPass2 || !!errorNotSamePass}
                        helperText={sizeErrorPass2 || errorNotSamePass}
                    />

                    <div className="login__form-element">
                        <Button className="m-3 px-3" variant="dark" type="submit">Зарегистрироваться</Button>

                        <button
                            onClick={onClickGoTo}
                            className="login__additional-button fs-6"
                        >Войти</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    registrationError: userGetters.getRegistrationError(state)
});

const mapDispatchToProps = (dispatch) => ({
    registration(nickname, password) {
        dispatch(userThunkCreators.registration(nickname, password));
    },
    deleteRegistrationError() {
        dispatch(userActionCreator.changeRegistrationError(""))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
