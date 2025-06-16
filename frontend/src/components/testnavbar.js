import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TestNavbar extends Component {
  constructor() {
    super();
    this.state = {
      name: this.getUserName(),
      progress: 20
    };
  }

  getUserName = () => {
    try {
      const user = JSON.parse(localStorage.getItem("jwt"))?.user;
      return user?.name || "Guest";
    } catch (e) {
      return "Guest";
    }
  };

  render() {
    return (
      <nav className="navbar navbar-expand navbar-light p-2 mb-3 topbar static-top shadow"
           style={{ backgroundImage: "linear-gradient(90deg, #0077CC 15%, #1E3A8A 100%)" }}>
       
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <h4 className="text-gray-100 font-weight-bold mb-1">Test Progress</h4>
              <div className="progress rounded-lg" style={{ width: "25vw", height: "10px", backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <div className="progress-bar bg-success" role="progressbar" 
                     style={{ width: `${this.state.progress}%` }}
                     aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="d-flex justify-content-end">
                <span className="text-white font-weight-bold mt-1">{this.state.progress}% Submitted</span>
              </div>
            </li>
          </ul>
          
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-3">
              <a className="btn btn-danger btn-sm rounded-pill px-3 py-2 font-weight-bold" 
                 href="#logout" data-toggle="modal" data-target="#logoutModal"
                 style={{ textDecoration: "none", color: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                <i className="fas fa-sign-out-alt mr-1"></i> End Test
              </a>
            </li>
            
            <li className="nav-item d-flex align-items-center">
              <div className="mr-3 text-right">
                <span className="d-block text-white font-weight-bold">
                  {this.state.name}
                </span>
                <small className="text-gray-200">Test Candidate</small>
              </div>
              <div className="position-relative">
                <img className="img-profile rounded-circle border border-white"
                     src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                     style={{ width: "40px", height: "40px", objectFit: "cover" }}
                     alt="User profile" />
              </div>
            </li>
          </ul>
        </div>
        
        {/* Logout Modal */}
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog"
             aria-labelledby="logoutModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title font-weight-bold" id="logoutModalLabel">
                  Finish Test Confirmation
                </h5>
                <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body py-4">
                <div className="text-center mb-3">
                  <i className="fas fa-exclamation-triangle text-warning fa-3x mb-3"></i>
                  <p className="lead">Do you really want to finish the test?</p>
                  <p className="text-muted">You won't be able to return once submitted.</p>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-outline-secondary px-4" data-dismiss="modal">
                  Cancel
                </button>
                <Link to="/feedback" className="btn btn-primary px-4">
                  Yes, Submit Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}