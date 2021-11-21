import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Home.css";
import books from "../../resources/imgs/old-books.jpg";
import people from "../../resources/imgs/people.jpg";
import numbers from "../../resources/imgs/numbers.jpg";

const Home = (props) => {

    return (
        <>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Управление театром</h1>
                        <p className="lead text-muted">Приложение для руководства театром с удобным интерфейсом, в котором вы сможете найти всю необходимую информацию! </p>
                    </div>
                </div>
            </section>
            <div className="album py-5 bg-light rounded">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            <Link to="/scripts" className="text-decoration-none">
                                <div className="card shadow-sm">
                                    <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={books} role="img" aria-label="photo" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    </img>
                                    <div className="card-body">
                                        <p className="card-text text-dark">Сценарии</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted me-ms-auto">Сценарии, записанные в базу театра</small>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/actors" className="text-decoration-none">
                                <div className="card shadow-sm">
                                    <div className="img-handler">
                                        <img className="bd-placeholder-img card-img-top" width="100%" src={people} role="img" aria-label="photo" preserveAspectRatio="xMidYMid slice" focusable="false">
                                        </img></div>
                                    <div className="card-body">
                                        <p className="card-text text-dark">Актёры</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted me-ms-auto">Весь штат театра по клику!</small>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/plays/now" className="text-decoration-none">
                                <div className="card shadow-sm">
                                    <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={numbers} role="img" aria-label="photo" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    </img>
                                    <div className="card-body">
                                        <p className="card-text text-dark">Расписание</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted me-ms-auto">Выступления в формате календаря</small>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(Home);
