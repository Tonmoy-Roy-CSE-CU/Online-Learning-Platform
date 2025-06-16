import React, { Component } from 'react';

class ViewTestanalysis extends Component {
    state = {
        testpaper: null,
        answers: null,
        result: null,
        loading: true,
        error: null
    }

    componentDidMount() {
        const url = new URL(window.location.href); 
        const params = new URLSearchParams(url.search);
        const testid = params.get('id');
        console.log(testid);
        
        const user = {
            testid: testid,
            email: JSON.parse(localStorage.getItem("jwt")).user.id
        };
        
        console.log(user);
        
        // First fetch request to get test paper data
        fetch("http://localhost:8082/viewTestanalysis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if (!res.data || res.data.length === 0) {
                this.setState({ 
                    loading: false,
                    error: "No test paper data found." 
                });
                return;
            }
            
            this.setState({ testpaper: res.data });
            console.log("Test paper data:", res.data);
            
            // Second fetch request to get student test answers
            return fetch("http://localhost:8082/studenttestparticular", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
        })
        .then(res => res ? res.json() : null)
        .then(res => {
            if (!res || !res.data || res.data.length === 0) {
                this.setState({ 
                    loading: false,
                    error: "No student test data found." 
                });
                return;
            }
            
            const studentData = res.data[0];
            if (!studentData || !studentData.answers) {
                this.setState({ 
                    loading: false,
                    error: "Invalid student test data format." 
                });
                return;
            }
            
            this.setState({
                answers: studentData.answers.split("*"),
                result: studentData.marks,
                loading: false
            });
            console.log("Student answers:", studentData.answers.split("*"));
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            this.setState({ 
                loading: false,
                error: "An error occurred while fetching data. Please try again." 
            });
        });
    }

    render() {
        const { testpaper, answers, loading, error, result } = this.state;
        
        if (loading) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
        
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row mb-4">
                    <div className="col text-center">
                        <h1 style={{ color: "#0e8dca" }}>TEST RESULT</h1>
                        {result !== null && (
                            <h3 className="mt-3">Your Score: {result}</h3>
                        )}
                    </div>
                </div>
                
                {testpaper && answers && testpaper.length > 0 ? (
                    <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                        <table className="table dataTable my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Question</th>
                                    <th>Correct Answer</th>
                                    <th>Your Answer</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testpaper.map((t, index) => {
                                    const userAnswer = index < answers.length ? answers[index] : "-";
                                    const isCorrect = parseInt(t.answer) === parseInt(userAnswer);
                                    
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{t.question}</td>
                                            <td>{t.answer}</td>
                                            <td>{userAnswer}</td>
                                            <td>
                                                {isCorrect ? (
                                                    <span className="badge badge-success">Correct</span>
                                                ) : (
                                                    <span className="badge badge-danger">Incorrect</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="alert alert-info" role="alert">
                        No test results available to display.
                    </div>
                )}
            </div>
        );
    }
}

export default ViewTestanalysis;