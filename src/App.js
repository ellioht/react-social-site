import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import View from "./View";
import Add from "./Add";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function App() {
    const [todos, changeTodos] = useState([
        // { id: 1, task: "make static data", completed: false },
        // { id: 2, task: "make dynamic data", completed: false },
    ]);

    const updateTodoItems = (newTodo) => {
        localStorage.setItem("list", JSON.stringify([...todos, newTodo]));
        changeTodos([...todos, newTodo]);
    };

    useEffect(() => {
        const list = localStorage.getItem("list");
        changeTodos(JSON.parse(list) || []);
    }, []);

    return (
        <div>
            <HashRouter>
                <Navbar bg="dark" expand="lg">
                    <Container>
                        <Nav className="me-auto">
                            <Link to="/">Home</Link>
                            <Link to="/add">Add todo</Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Container>
                    <Routes>
                        <Route path="/" element={<View todos={todos} />} />
                        <Route
                            path="/add"
                            element={
                                <Add
                                    onSubmit={(newTodo) => {
                                        updateTodoItems(newTodo);
                                    }}
                                />
                            }
                        />
                    </Routes>
                </Container>
            </HashRouter>
        </div>
    );
}
export default App;
