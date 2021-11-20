import React, { useEffect, useState } from "react";
import "./header.css";
import "./authorization.css";
import Login from "../Login/Login";
import { loginActionCreators } from "../../bll/reducers/reducerLogin";
import { connect } from "react-redux";
import { userGetters, userThunkCreators } from "../../bll/reducers/reducerUser";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = (props) => {

    useEffect(() => {
        localStorage.getItem("token") ? props.login(localStorage.getItem("token")) : null
    }, []);

    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [disabledMenu, setDisabledMenu] = useState(false);

    const showLogout = () => {
        setIsLogoutOpen(!isLogoutOpen);
    }

    const onClickLogout = () => {
        setIsLogoutOpen(false);
        setDisabledMenu(true)
        props.logout();
    }  

    const openLogin = () => {
        props.toggleOpenLogin();

    }

    return (
        <header className="header">
            <Login setDisabledMenu={setDisabledMenu} />
            <Navbar bg="light" variant="light" className="rounded mb-auto d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
                <Navbar.Brand className="ms-3">
                    <Link to="/home" className="nav-link"><p className="header__title text-dark fs-4 mb-0">Behind The Scenes</p></Link>
                </Navbar.Brand>

                <Nav className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 fs-5">
                    <Link to="/scripts" className="nav-link">Сценарии</Link>
                    <Link to="/actors" className="nav-link">Актёры</Link>
                    <NavDropdown title="Расписание">
                        <Link to="/plays/now" className="dropdown-item">Пьесы</Link>
                        <Link to="/sessisons" className="dropdown-item">Сессии</Link>
                    </NavDropdown>

                </Nav>
                <Nav>
                    <div className="mx-auto px-5 text-dark fs-5">
                        {
                            props.nickname
                                ?
                                <button id="authorization-wrap" onClick={showLogout}
                                    disabled={ disabledMenu }
                                    className="header__user">
                                    {props.nickname}
                                </button>

                                :
                                <div id="authorization-wrap">
                                    <button
                                        onClick={openLogin}
                                        className="authorization-button"
                                    >Войти</button>
                                </div>
                        }
                        <div onClick={onClickLogout} className={isLogoutOpen ? `logout-menu border border-end-0 bg-light rounded-bottom border-top-0 logout-active`
                            : `logout-menu bg-light border border-end-0 rounded-bottom border-top-0`}>
                            <button className="header__user">Выйти</button>
                        </div>
                    </div>
                </Nav>
            </Navbar>
        </header>
    );
}

const mapStateToProps = (state) => ({
    nickname: userGetters.getNickname(state)
});

const mapDispatchToProps = (dispatch) => ({
    toggleOpenLogin() {
        dispatch(loginActionCreators.toggleOpen());
    },
    login(authorization) {
        dispatch(userThunkCreators.getNickname(authorization))
    },
    logout(){
        dispatch(userThunkCreators.logout())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);