import React, { Component } from "react";
import img from '../images/test1.svg';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: ""
    };
  }

  handleChange = (e) => {
    this.setState({ feedback: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    // Process your feedback data here if needed
    // const { feedback } = this.state;
    // Example: saveFeedbackToAPI(feedback);
    
    // Direct browser navigation to home page - this will work regardless of router setup
    window.location.href = '/';
    
    // Alternative approaches if the above doesn't work:
    // window.location.replace('/');
    // or
    // window.location = '/';
  }

  render() {
    return (
      <div>
        <div className="container5" style={{width:"60%", marginTop:"5%"}}>
          <div className="row">
            <div className="col-12">
              <img src={img} style={{height:"100%", width:"100%"}} alt="Feedback" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <br/><br/>
              <center><h1>Submit Test Feedback</h1></center>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <textarea 
                    className="form-control" 
                    placeholder="Enter Feedback"
                    value={this.state.feedback}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
                <br/>
                <div className="row">
                  <div className="col-12">
                    <center>
                      <button 
                        type="submit" 
                        id="button2" 
                        style={{marginLeft:"3%"}}
                      >
                        Submit
                      </button>
                    </center>
                  </div>
                </div>
              </form>
            </div>                      
          </div>
          <br/>
        </div>
        <br/><br/>
      </div>
    );
  }
}

export default Feedback;