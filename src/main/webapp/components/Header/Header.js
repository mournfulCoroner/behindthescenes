import React from "react";
import "./header.css";
import "./authorization.css";
import { loginActionCreators } from "../../bll/reducers/reducerLogin";
import { connect } from "react-redux";
import { userGetters } from "../../bll/reducers/reducerUser";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = (props) => {
    return (
        <header className="header">
            <Navbar bg="light" variant="light" className="rounded mb-auto d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
                <Navbar.Brand className="ms-3">
                    <Link to="/home" className="nav-link"><p className="header__title text-dark fs-4">Behind The Scenes</p></Link>
                </Navbar.Brand>

                <Nav className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 fs-5">
                    <Link to="/scripts" className="nav-link">Сценарии</Link>
                    <Link to="/actors" className="nav-link">Актёры</Link>
                    <NavDropdown title="Расписание">
                        <Link to="/plays" className="dropdown-item">Пьесы</Link>
                        <Link to="/sessisons" className="dropdown-item">Сессии</Link>
                    </NavDropdown>
                    
                </Nav>
                <Nav>
                <div className="mx-auto px-5 text-dark fs-5">
                    {
                        props.nickname
                            ? <Link
                                to={`/user/${props.nickname}`}
                                style={{ textDecoration: "none" }}
                            >

                                <div id="authorization-wrap">
                                    {props.nickname}
                                </div>
                            </Link>
                            :
                            <div id="authorization-wrap">
                                <button
                                    onClick={props.toggleOpenLogin}
                                    className="authorization-button"
                                >Войти</button>
                            </div>
                    }
                </div>
                </Nav>
            </Navbar>
        </header>
    );
}

const mapStateToProps = (state) => ({
    nickname: userGetters.getNickname(state),
    avatar: userGetters.getAvatar(state)
});

const mapDispatchToProps = (dispatch) => ({
    toggleOpenLogin() {
        dispatch(loginActionCreators.toggleOpen());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);