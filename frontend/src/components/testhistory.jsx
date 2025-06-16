import React, { Component } from "react";
import { Link } from "react-router-dom";

class Testhistory extends Component {
  state = {
    history: [], // Changed from testresult to history for consistency
  };

  componentDidMount() {
    this.setState({ history: this.props.prevTest || [] });
  }

  componentDidUpdate(prevProps) {
    // Update state when props change
    if (prevProps.prevTest !== this.props.prevTest) {
      this.setState({ history: this.props.prevTest || [] });
    }
  }

  funcdate = (str) => {
    if (!str) return "";
    const [datePart, timePart] = str.split("T");
    const time = timePart?.split(".")[0] || "";
    return `${datePart} ${time}`;
  };

  handleDeleteTest = (testid) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      fetch(`http://localhost:8082/deleteTest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testid }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            this.setState((prev) => ({
              history: prev.history.filter((t) => t.testid !== testid),
            }));
          } else {
            alert("Failed to delete test from server.");
          }
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  render() {
    const { history } = this.state;
    const len = history.length;

    return (
      <div className="container-fluid">
        <center>
          <h3 className="text-dark mb-4">Previous Tests Uploaded</h3>
        </center>
        <div className="card shadow">
          <div className="card-header py-3">
            <p className="text-primary m-0 font-weight-bold">Test Info</p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-nowrap">
                <div
                  id="dataTable_length"
                  className="dataTables_length"
                  aria-controls="dataTable"
                >
                  <label>
                    Show&nbsp;
                    <select className="form-control form-control-sm custom-select custom-select-sm">
                      <option value="10" selected="">
                        10
                      </option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    &nbsp;
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="text-md-right dataTables_filter"
                  id="dataTable_filter"
                >
                  <label>
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      aria-controls="dataTable"
                      placeholder="Search"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div
              className="table-responsive table mt-2"
              id="dataTable"
              role="grid"
              aria-describedby="dataTable_info"
            >
              <table className="table dataTable my-0" id="dataTable">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>TeacherId</th>
                    <th>Email-Id</th>
                    <th>Test Id</th>
                    <th>Test Name</th>
                    <th>Date</th>
                    <th>Url</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((t, index) => (
                    <tr key={t.testid || index}>
                      <td>{index + 1}</td>
                      <td>{t.tid}</td>
                      <td>{t.temail}</td>
                      <td>{t.testid}</td>
                      <td>{t.testName}</td>
                      <td>{this.funcdate(t.Date)}</td>
                      <td>{t.url}</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            className="btn btn-primary btn-sm mr-2"
                            to="/viewteachtest"
                            onClick={() => this.props.showT(t.testid)}
                          >
                            <span>View</span>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => this.handleDeleteTest(t.testid)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <strong>S.No</strong>
                    </td>
                    <td>
                      <strong>TeacherId</strong>
                    </td>
                    <td>
                      <strong>Email-Id</strong>
                    </td>
                    <td>
                      <strong>Test Id</strong>
                    </td>
                    <td>
                      <strong>Test Name</strong>
                    </td>
                    <td>
                      <strong>Date</strong>
                    </td>
                    <td>
                      <strong>Url</strong>
                    </td>
                    <td>
                      <strong>Actions</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="row">
              <div className="col-md-6 align-self-center">
                {len >= 10 ? (
                  <p
                    id="dataTable_info"
                    className="dataTables_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to 10 of {len}
                  </p>
                ) : (
                  <p
                    id="dataTable_info"
                    className="dataTables_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to {len} of {len}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Testhistory;
