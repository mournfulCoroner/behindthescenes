import React from "react";
import { withRouter } from "react-router-dom";
import "./Home.css";

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
                            <div className="card shadow-sm">
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="photo" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">
                                        </text></svg>
                                <div className="card-body">
                                    <p className="card-text text-dark">Сценарии</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted me-ms-auto">Сценарии, записанные в базу театра</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                        <div className="card shadow-sm">
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="photo" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">
                                        </text></svg>
                                <div className="card-body">
                                    <p className="card-text text-dark">Актёры</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted me-ms-auto">Весь штат театра по клику!</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                        <div className="card shadow-sm">
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="photo" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">
                                        </text></svg>
                                <div className="card-body">
                                    <p className="card-text text-dark">Расписание</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted me-ms-auto">Выступления в формате календаря</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(Home);
