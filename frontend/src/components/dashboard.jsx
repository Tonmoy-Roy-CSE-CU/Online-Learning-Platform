import React, { Component } from "react";
import { Link } from "react-router-dom";
import imgs from '../images/test.svg';
import Calender1 from './calender1';
import { Bar, Doughnut } from "react-chartjs-2";
import './dashboard1.css';

class Dashboard extends Component {
  constructor() {
    super();
    let u = "Name";
    try {
      u = JSON.parse(localStorage.getItem("jwt")).user.name;
    }
    catch (e) {
      u = "";
    }
    this.state = {
      quotess: [],
      name: u,
      list: [],
      data: [],
      resultarray: [0, 0, 0, 0, 0] // Initialize with default values
    }
  }

  getQuote = () => {
    fetch("http://localhost:8082/getquote", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ quotess: res.code })
      })
      .catch(error => {
        console.error("Error fetching quotes:", error);
      });
  }

  getnotice = () => {
    fetch("http://localhost:8082/getnotice1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res.code })
      })
      .catch(error => {
        console.error("Error fetching notices:", error);
      });
  }

  gettodo = () => {
    try {
      const user = {
        email: JSON.parse(localStorage.getItem("jwt")).user.id,
      }
      fetch("http://localhost:8082/gettodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ list: res.code })
        })
        .catch(error => {
          console.error("Error fetching todo list:", error);
        });
    } catch (error) {
      console.error("Error in gettodo method:", error);
    }
  }

  componentDidMount() {
    this.getQuote();
    this.getnotice();
    this.gettodo();
    this.getcurrentresult();
  }

  getcurrentresult = () => {
    try {
      const user = {
        email: JSON.parse(localStorage.getItem("jwt")).user.id,
      }
      fetch("http://localhost:8082/studentcurrentresult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res.data);
          // Check if res.data exists and has at least one element
          if (res && res.data && res.data.length > 0) {
            const resultData = res.data[0];
            this.setState({
              resultarray: [
                resultData.total || 0,
                resultData.avg || 0,
                resultData.max || 0,
                resultData.min || 0,
                0
              ]
            });
          } else {
            console.warn("No result data available");
            this.setState({
              resultarray: [0, 0, 0, 0, 0]
            });
          }
        })
        .catch(error => {
          console.error("Error fetching results:", error);
          this.setState({
            resultarray: [0, 0, 0, 0, 0]
          });
        });
    } catch (error) {
      console.error("Error in getcurrentresult method:", error);
      this.setState({
        resultarray: [0, 0, 0, 0, 0]
      });
    }
  }

  myfunc1 = () => {
    if (this.state.list && this.state.list.length > 0) {
      const doubled = this.state.list.map((number) =>
        <li className="list-group-item" key={number.sno}>
          <div className="row align-items-center no-gutters">
            <div className="col mr-2">
              <h6 className="mb-0"><strong>{number.data}</strong></h6><span className="text-xs">10:30 AM</span></div>
            <div className="col-auto">
              <a className="btn btn-danger btn-circle ml-1" role="button" onClick={() => { this.deleten(number.sno) }}>
                <i className="fas fa-trash text-white"></i>
              </a></div>
          </div>
        </li>
      );
      return doubled;
    } else {
      return <li className="list-group-item">No items in your todo list</li>;
    }
  }

  myfunc2 = () => {
    if (this.state.quotess && this.state.quotess.length > 0) {
      const doubled = this.state.quotess.map((number, index) =>
        <div className="carousel-item" key={index}>
          <img className="d-block w-100" style={{ height: "300px" }} src="https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Slide" />
          <div className="ss">
            <h5 className="my-auto">{number.data}</h5>
          </div>
        </div>
      );
      return doubled;
    } else {
      return null;
    }
  }

  myfunc = () => {
    if (this.state.data && this.state.data.length > 0) {
      const doubled = this.state.data.map((number, index) =>
        <div key={index}>
          <div className="row align-items-center no-gutters">
            <div className="col mr-2">
              <h6 className="mb-0"><strong>{number.data}</strong></h6><span className="text-xs">{number.date}</span></div>
          </div>
          <hr />
        </div>
      );
      return doubled;
    } else {
      return <div>No notices available</div>;
    }
  }

  todolist = e => {
    if (!e || e.trim() === "") {
      alert("Please enter a task");
      return;
    }
    
    try {
      const ttuser = {
        email: JSON.parse(localStorage.getItem("jwt")).user.id,
        data: e
      }
      console.log(ttuser);
      fetch("http://localhost:8082/addtodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ttuser)
      })
        .then(res => res.json())
        .then(res => {
          if (res.code === 0) {
            alert("Item Not Added");
          } else {
            alert(`ITEM ADDED SUCCESSFULLY!!`);
            document.getElementById('todo').value = '';
          }
          this.gettodo();
        })
        .catch(error => {
          console.error("Error adding todo item:", error);
          alert("Error adding todo item");
        });
    } catch (error) {
      console.error("Error in todolist method:", error);
      alert("Error adding todo item");
    }
  }

  deleten = id => {
    console.log(id);
    const user = {
      sno: id
    }
    fetch("http://localhost:8082/deletetodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        if (res.code === 0) {
          alert("Could Not Delete ITEM");
        } else {
          alert(`ITEM DELETED SUCCESSFULLY!!`);
        }
        this.gettodo();
      })
      .catch(error => {
        console.error("Error deleting todo item:", error);
        alert("Error deleting todo item");
      });
  }

  render() {
    const datais = {
      labels: ['Total No. of student', 'average marks', 'Max marks', 'Min marks'],
      datasets: [
        {
          label: 'Details',
          backgroundColor: ['green', 'blue', 'red', 'grey'],
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: this.state.resultarray || [0, 0, 0, 0, 0],
          axisX: {
            minimum: 0,
          }
        },
      ],
    };

    return (
      <div id="page-top">
        <div id="wrapper">
          <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/studentDashboard">
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink"></i>
              </div>
              <div className="sidebar-brand-text mx-3">Let's Learn</div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <Link className="nav-link" to="/studentDashboard">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></Link>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
              <Link className="nav-link collapsed" to="Studenttest">
                <i className="fas fa-fw fa-list-alt"></i>
                <span>Test Results Overview</span>
              </Link>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/Contact">
                <i className="fas fa-fw fa-question-circle"></i>
                <span>Help</span>
              </Link>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
              <Link to="/taketest" className="nav-link collapsed" style={{ color: "white" }}>
                <i className="fas fa-fw fa-question-circle"></i>
                <span>Buyed Series</span>
              </Link>
            </li>

            <hr className="sidebar-divider" />
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/chatapp">
                <i className="fas fa-comment-dots"></i>

                <span>Chat</span>
              </Link>
            </li>


            <li className="nav-item">
              <a className="nav-link" href="charts.html">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Generate Report</span></a>
            </li>


          </ul>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">

              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars"></i>
                </button>
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <ul className="navbar-nav ml-auto">

                  <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-search fa-fw"></i>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                      <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </li>
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-bell fa-fw"></i>
                      <span className="badge badge-danger badge-counter">3+</span>
                    </a>

                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                      <h6 className="dropdown-header">
                        Alerts Center
                      </h6>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">May 8, 2020</div>
                          <span className="font-weight-bold">Practice test to enhance your skill in java is here!</span>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-success">
                            <i className="fas fa-file-alt text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">May 9, 2020</div>
                          Upcoming ADI st tomorrow!!
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="mr-3">
                          <div className="icon-circle bg-warning">
                            <i className="fas fa-file-alt text-white"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">May 10, 2020</div>
                          New Courses added to make you industry ready!!
                        </div>
                      </a>
                      <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                    </div>
                  </li>

                  <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-envelope fa-fw"></i>
                      <span className="badge badge-danger badge-counter">3</span>
                    </a>
                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                      <h6 className="dropdown-header">
                        Message Center
                      </h6>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                          <div className="status-indicator bg-success"></div>
                        </div>
                        <div className="font-weight-bold">
                          <div className="text-truncate">Hi there! Can u send me the solution of Tower Of Hanoi?</div>
                          <div className="small text-gray-500">Shivani Goyal</div>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                          <div className="status-indicator"></div>
                        </div>
                        <div>
                          <div className="text-truncate">Help!!Redux is not getting installed?</div>
                          <div className="small text-gray-500">Shivesh Gupta</div>
                        </div>
                      </a>
                      <a className="dropdown-item d-flex align-items-center" href="#">
                        <div className="dropdown-list-image mr-3">
                          <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                          <div className="status-indicator bg-warning"></div>
                        </div>
                        <div>
                          <div className="text-truncate">When Will some good companies come to campus?</div>
                          <div className="small text-gray-500">Shivika Singla</div>
                        </div>
                      </a>
                      <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                    </div>
                  </li>

                  <div className="topbar-divider d-none d-sm-block"></div>

                  <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.state.name}</span>
                      <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="Profile" />
                    </a>

                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                      <Link className="dropdown-item" to="/sprofile" style={{ color: "black", textDecoration: "none" }}>
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                      </Link>
                      <Link className="dropdown-item" to="/ssetting" style={{ color: "black", textDecoration: "none" }}>
                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                      </Link>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Submissions
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </li>

                </ul>

              </nav>

              <div className="container-fluid">


                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">Student's Dashboard</h1>
                  <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                </div>

                <div className="row">

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Tests Attempted</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">11</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Unattempted Tests</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">No. Of Practice Tests Taken</div>
                            <div className="row no-gutters align-items-center">
                              <div className="col-auto">
                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                              </div>
                              <div className="col">
                                <div className="progress progress-sm mr-2">
                                  <div className="progress-bar bg-info" role="progressbar" style={{ width: "50%", ariaValuenow: "50", ariaValuemin: "0", ariaValuemax: "100" }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Courses</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">1</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-book-open fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">

                  <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">

                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Overall Test Report</h6>
                        <div className="dropdown no-arrow">
                          <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          </a>
                        </div>
                      </div>
                      <div className="card-body">
                        <div>
                          <div>
                            <Bar
                              data={datais}
                              options={{
                                title: {
                                  display: true,
                                  text: "Recent Test Analysis",
                                  fontSize: 20,
                                },
                                legend: {
                                  display: true,
                                  position: "right",
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">

                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Notices & Alerts</h6>
                      </div>
                      <div className="card-body" style={{ height: "360px", overflow: "scroll" }}>
                        {this.myfunc()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">

                  <div className="col-lg-6 mb-4">

                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Calender</h6>
                      </div>
                      <div className="card-body">
                        <center>
                          <Calender1 />
                        </center>
                      </div>
                    </div>

                    <div className="card shadow mb-4" style={{ height: "303px" }}>
                      <div className="card-header py-3">
                        <h6 className="text-primary font-weight-bold m-0">
                          Todo List
                        </h6>
                        <div className="row mt-2 mb-2 p-3" style={{ background: "rgb(0, 140, 186)" }}>
                          <div className="col-12">
                            <input type="text" id="todo" placeholder="Title..." />
                            <a className="btn btn-success btn-circle ml-1" role="button" onClick={() => { this.todolist(document.getElementById('todo').value) }} style={{ float: "right" }} data-toggle="modal" data-target="#modal">
                              <i className="icon ion-android-add text-white"></i></a>
                          </div>
                        </div>
                      </div>
                      <ul className="list-group list-group-flush" style={{ overflow: "scroll", height: "100%" }}>
                        {this.myfunc1()}
                      </ul>
                    </div>

                  </div>

                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Mock Tests</h6>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "25rem" }} src={imgs} alt="" />
                        </div>
                        <p>Take Mock Tests To prepare yourself for your upcoming placements and excell in your college courses. Our Mock tests are designed based on current industry demand to prepare you according to that.</p>
                        <Link to="/mocktest">Take Mock Tests!! &rarr;</Link>
                      </div>
                    </div>

                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary my-auto">Quote For The Day</h6>
                      </div>
                      <div className="card-body">

                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                          <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                          </ol>
                          <div className="carousel-inner">
                            <div className="carousel-item active">
                              <img className="d-block w-100" style={{ height: "300px" }} src="https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="First slide" />
                              <div className="carousel-caption d-none d-md-block">
                              </div>
                            </div>
                            {this.myfunc2()}
                          </div>
                          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                          </a>
                          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
      