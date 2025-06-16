import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Mocktest extends Component {
    state = {
        arr: []  // Modern state initialization
    }

    componentDidMount() {
        this.getdata();
    }

    getdata = () => {
        fetch("http://localhost:8082/getmocktest")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(({ code = [] }) => {  // Destructure with default
                this.setState({ arr: Array.isArray(code) ? code : [] });
            })
            .catch(err => {
                console.error("Fetch failed:", err);
                this.setState({ arr: [] });
            });
    }

    render() {
        const { arr } = this.state;
        
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h3 className="my-3" style={{ color: "#108092" }}>
                            Practice Mock Tests
                        </h3>
                        <h6 className="subtitle font-weight-normal">
                            Prepare for upcoming placements with our industry-ready tests
                        </h6>
                    </div>
                </div>
                
                <div className="row">
                    {arr.length > 0 ? (
                        arr.map(({ testid, image, testname, about }) => (
                            <div key={testid} className="col-12 col-lg-4 p-3">
                                <div className="card h-100 shadow-sm">
                                    <img 
                                        className="card-img-top img-fluid"
                                        src={image || '/placeholder-image.jpg'}
                                        alt={testname}
                                        style={{ height: "250px", objectFit: 'cover' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h3 className="card-title text-secondary">
                                            {testname}
                                        </h3>
                                        <p className="flex-grow-1">{about}</p>
                                        <Link 
                                            to="/mcq1" 
                                            className="btn btn-outline-success align-self-start"
                                            onClick={() => this.props.settest(testid)}
                                        >
                                            Take Test
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <div className="alert alert-info">
                                No mock tests currently available. Check back later!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Mocktest;