import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      submitted: [],
    };
    this.addSubmit = this.addSubmit.bind(this);
    this.sendToBack = this.sendToBack.bind(this);
    this.settotrue = this.settotrue.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  componentDidMount() {
    const { user } = JSON.parse(localStorage.getItem("jwt"));
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    // Initialize submitted answers array
    const initialAnswers = new Array(this.props.len).fill(-1);

    fetch("http://localhost:8082/initialResult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        semail: user.id,
        testid: params.get("code"),
        len: this.props.len,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          submitted: res.resType === 0 ? res.arr : initialAnswers,
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        this.setState({ submitted: initialAnswers });
      });
  }

  handleRadioChange(qno, choiceIndex) {
    const newSubmitted = [...this.state.submitted];
    newSubmitted[qno] = choiceIndex;
    this.setState({ submitted: newSubmitted });
  }

  settotrue() {
    console.log("settotrue");
    this.props.setToTrue(true);
  }

  addSubmit(qno) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    fetch(
      `http://localhost:8082/updateRes?semail=${
        JSON.parse(localStorage.getItem("jwt")).user.id
      }&testid=${params.get("code")}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.submitted),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("Result Array Updated!!");
      });
  }

  sendToBack() {
    console.log(this.state.submitted);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const test = {
      res: this.state.submitted,
      testid: params.get("code"),
      semail: JSON.parse(localStorage.getItem("jwt")).user.id,
    };
    fetch("http://localhost:8082/submittedques", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Submitted");
      });
  }

  render() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const { mcq, idx, len, nextMcq } = this.props;
    const { submitted } = this.state;

    return (
      <div className="col-xl-12 mb-4">
        <div className="card-body border-left-primary shadow h-100 py-2">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xm font-weight-bold text-gray-800 mb-1">
                {mcq.ques}
              </div>
              <div className="h5 mb-0 text-gray-800">
                {mcq.choices.map((choice, index) => {
                  // Use a unique name for each question's radio button group
                  const radioName = `question-${idx}`;
                  const radioId = `question-${idx}-choice-${index + 1}`;

                  return (
                    <div className="form-check" key={`${idx}-${index}`}>
                      <h6 className="form-check-label" htmlFor={radioId}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={radioName}
                          id={radioId}
                          value={index + 1}
                          checked={submitted[idx] === index + 1}
                          onChange={() =>
                            this.handleRadioChange(idx, index + 1)
                          }
                        />
                        {choice}
                      </h6>
                      <br />
                    </div>
                  );
                })}
              </div>
              <div className="col-auto">
                {/* Previous Question Button */}
                {idx > 0 && (
                  <Link
                    to={`/mcq?name=${params.get("name")}&id=${params.get(
                      "id"
                    )}&code=${params.get("code")}`}
                    className="btn mt-2 mx-2"
                    onClick={() => nextMcq(idx - 1)}
                    style={{
                      backgroundColor: "rgb(8, 169, 222)",
                      color: "white",
                    }}
                  >
                    Previous Question
                  </Link>
                )}

                {/* Next Question or Finish Test Button */}
                {idx < len - 1 ? (
                  <Link
                    to={`/mcq?name=${params.get("name")}&id=${params.get(
                      "id"
                    )}&code=${params.get("code")}`}
                    className="btn mt-2 mx-2"
                    onClick={() => nextMcq(idx + 1)}
                    style={{
                      backgroundColor: "rgb(8, 169, 222)",
                      color: "white",
                    }}
                  >
                    Next Question
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger mt-2 mx-2"
                    data-toggle="modal"
                    data-target="#logoutModal"
                    onClick={() => {
                      this.addSubmit(idx);
                      this.sendToBack();
                    }}
                  >
                    Finish Test
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-info">
                <h5
                  className="modal-title text-gray-800"
                  id="exampleModalLabel"
                >
                  Do you really want to finish the test?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Yes" below if you are ready to end your test.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <Link
                  to="/feedback"
                  className="btn btn-primary"
                  onClick={() => this.settotrue()}
                >
                  Yes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
