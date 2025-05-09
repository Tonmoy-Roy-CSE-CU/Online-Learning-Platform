import React, { Component } from 'react';

export default class Ssetting extends Component
{
    constructor()
    {
        super();
        let u="Name";
        let email="email"
      try{
        u =  JSON.parse(localStorage.getItem("jwt")).user.name;
        email=JSON.parse(localStorage.getItem("jwt")).user.id;
      }catch(e){
          u=""
      }
        this.state={
            username:u,
            eid:email,
            phone:'',
            flag1:false,
            skills:[],
            ten:"",
            twel:"",
            grad:"",
            pic:""
        }
    }
    arrayBufferToBase64=(buffer)=> {
        if (!buffer) return '';
        
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
    changePhoto = () => {
        const fileInput = document.getElementById("pict");
        if (!fileInput.files || !fileInput.files[0]) {
            alert("Please select a file first");
            return;
        }
        
        // Create a FormData object to handle file upload properly
        const formData = new FormData();
        formData.append('photo', fileInput.files[0]);
        
        fetch(`http://localhost:8082/setpic?semail=${this.state.eid}`, {
            method: "POST",
            // Don't set Content-Type header when sending FormData
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Server returned ${res.status}: ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            if (data && data.buff && data.buff.data) {
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = this.arrayBufferToBase64(data.buff.data);
                this.setState({ pic: (base64Flag + imageStr) }, () => { 
                    console.log("Photo updated successfully");
                    alert("Profile picture updated successfully");
                });
            } else {
                console.log("No photo data returned from server");
                alert("Failed to update profile picture. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error changing photo:", error);
            alert("Error changing photo. Please try again.");
        });
    }
    add=()=>{
        const user={
            email:JSON.parse(localStorage.getItem("jwt")).user.id,
            name:document.getElementById("skill").value,
            val:document.getElementById("val").value
          }
          fetch("http://localhost:8082/addskill", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
            })
          .then(res=> res.json())
            .then(res => {
              if(res.code===1)
              {
              alert("skill added!!!");
              document.getElementById("skill").value="";
              document.getElementById("val").value="";
              }
            })
            .catch(error => {
                console.error("Error adding skill:", error);
                alert("Error adding skill. Please try again.");
            });
    }
    pass=e=>{
         var obj={
          email:JSON.parse(localStorage.getItem("jwt")).user.id,    
          oldp:e,
        };
         fetch("http://localhost:8082/checkpass1",{
          method:"POST",
          headers:{
           Accept: "application/json",
             "Content-Type":"application/json",
             },
          body:JSON.stringify(obj)
       })
       .then(res => res.json())
          .then(res => {
            if(res.pass === 1)
            {
                console.log("matched")
            this.setState({flag1:true})
            }
        else 
        {
         alert("Incorrect Password Entered")
        }
       })
       .catch(error => {
           console.error("Error checking password:", error);
           alert("Error checking password. Please try again.");
       });  
    }
    changepass=()=>{
        var e=document.getElementById("npass01").value;
        var f=document.getElementById("npass02").value;
        console.log(e);
        console.log(f)
        var obj={
        email:JSON.parse(localStorage.getItem("jwt")).user.id,  
        npass1:e,
        npass2:f,
       };
        fetch("http://localhost:8082/changepass1",{
         method:"POST",
         headers:{
          Accept: "application/json",
            "Content-Type":"application/json",
            },
         body:JSON.stringify(obj)
      })
      .then(res => res.json())
         .then(res => {
           if(res.pass === 1)
           {
            alert("Password Changed");
            window.location="http://localhost:3000/studentDashboard";        
           }
           else if(res.pass===2)
           {
               alert("Password do not match");
               window.location="http://localhost:3000/studentDashboard";    
           }
       else 
       {
        alert("Password Not Entered")
       }
      })
      .catch(error => {
          console.error("Error changing password:", error);
          alert("Error changing password. Please try again.");
      });  
    }
    componentDidMount()
    {
        // First fetch - getting phone number
        fetch(`http://localhost:8082/phone1?tId=${this.state.eid}`)
            .then(res => res.json())
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({ phone: res.spno });
            })
            .catch(error => {
                console.error("Error fetching phone number:", error);
            });

        // Second fetch - getting skills
        fetch(`http://localhost:8082/getskill?semail=${this.state.eid}`)
            .then(res => res.json())
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({ skills: res });
            })
            .catch(error => {
                console.error("Error fetching skills:", error);
                this.setState({ skills: [] });
            });

        // Third fetch - getting education details
        fetch(`http://localhost:8082/getedu?semail=${this.state.eid}`)
            .then(res => res.json())
            .then(res => {
                console.log(JSON.stringify(res));
                this.setState({ ten: res.ten, twel: res.twel, grad: res.grad });
            })
            .catch(error => {
                console.error("Error fetching education details:", error);
            });

        // Fourth fetch - getting photo
        fetch(`http://localhost:8082/getphoto?semail=${this.state.eid}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.buff && data.buff.data) {
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = this.arrayBufferToBase64(data.buff.data);
                    this.setState({ pic: (base64Flag + imageStr) });
                } else {
                    // Set default image if no photo data is available
                    this.setState({ pic: "/default-avatar.png" }); // Replace with path to your default image
                    console.log("No profile photo data available");
                }
            })
            .catch(error => {
                console.error("Error fetching profile photo:", error);
                this.setState({ pic: "/default-avatar.png" }); // Replace with path to your default image
            });
    }
    setEdu=(e)=>
    {
        e.preventDefault();
        var obj={
            tenth:document.getElementById("ten").value,
            twelth:document.getElementById("twel").value,
            gradu:document.getElementById("grad").value
        }
        fetch(` http://localhost:8082/saveedu?semail=${this.state.eid}`,{
         method:"PUT",
         headers:{
            "Content-Type":"application/json",
            },
         body:JSON.stringify(obj)
      })
      .then(res => {
         if(res.ok){return res.json();}
      })
      .then(res=>{
          this.setState({ten:obj.tenth,twel:obj.twelth,grad:obj.gradu},()=>{
              alert("Education updated")
          });
      })
      .catch(error => {
          console.error("Error updating education:", error);
          alert("Error updating education. Please try again.");
      });
    }
    saveSettings=(e)=>
    {
        e.preventDefault();
        var obj={
            name:document.getElementById("uname").value,
           email:document.getElementById("uemail").value,
            ph_num:document.getElementById("uph_no").value
        }
        fetch(' http://localhost:8082/savesetting1',{
         method:"PUT",
         headers:{
            "Content-Type":"application/json",
            },
         body:JSON.stringify(obj)
      })
      .then(res => {
         if(res.ok){return res.json();}
      })
      .then(res=>{
          var n=JSON.parse(localStorage.getItem("jwt")).user.name;
          var i=JSON.parse(localStorage.getItem("jwt")).user.id;
          var tok=JSON.parse(localStorage.getItem("jwt")).token;
          var ljwt={
              token:tok,
              user:{id:i,name:obj.name}
            };
        localStorage.removeItem("jwt");
        localStorage.setItem("jwt",JSON.stringify(ljwt));
        this.setState({username:JSON.parse(localStorage.getItem("jwt")).user.name,phone:obj.ph_num});
        console.log(this.state.username+" "+this.state.phone);
          alert(JSON.stringify(res))
      })
      .catch(error => {
          console.error("Error saving settings:", error);
          alert("Error saving settings. Please try again.");
      });
    }
    render(){
        var col=["red","blue","green","yellow"];
        return(
            <div id="wrapper">
                <div class="container-fluid">
                <center><h3 class="mb-4" style={{color:"#206188",fontWeight:"800"}}>Edit Profile</h3></center>
                <div class="row mb-3">
                    <div class="col-lg-4">
                        <div class="card mb-3">
                            <div class="card-body text-center shadow"><img class="rounded-circle mb-3 mt-4" src={this.state.pic} width="160" height="160"/>
                                <div class="mb-3"><button class="btn btn-primary btn-sm"   type="button" data-toggle="modal" data-target="#picModal" rel="nofollow">Change Photo</button></div>
                            </div>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="text-primary font-weight-bold m-0">Skills</h6>
                            </div>
                            <div class="card-body">
                            <input class="form-control" type="text" id="skill" placeholder="Add skill"/>
                            <input class="form-control" type="text" id="val" placeholder="Add skill Percenntage"/>
                            <a className="btn btn-danger btn-icon-split mr-2" role="button" onClick={()=>this.add()}><span className="text-white-50 icon"><i className="fa fa-plus"></i></span><span className="text-white text">Add</span></a>
                              
                                {this.state.skills.map((skill)=>{
                               return <div><h4 class="small font-weight-bold">{skill.name}<span class="float-right">{skill.percentage}</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: skill.percentage+"%",backgroundColor:"'"+col[Math.floor(Math.random() * col.length)]+"'"}}><span class="sr-only">40%</span></div>
                                </div></div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="row mb-3 d-none">
                            <div class="col">
                                <div class="card text-white bg-primary shadow">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col">
                                                <p class="m-0">Peformance</p>
                                                <p class="m-0"><strong>65.2%</strong></p>
                                            </div>
                                            <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
                                        </div>
                                        <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card text-white bg-success shadow">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col">
                                                <p class="m-0">Peformance</p>
                                                <p class="m-0"><strong>65.2%</strong></p>
                                            </div>
                                            <div class="col-auto"><i class="fas fa-rocket fa-2x"></i></div>
                                        </div>
                                        <p class="text-white-50 small m-0"><i class="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="card shadow mb-3">
                                    <div class="card-header py-3">
                                        <p class="text-primary m-0 font-weight-bold">User Settings</p>
                                    </div>
                                    <div class="card-body">
                                        <form onSubmit={this.saveSettings}>
                                            <div class="form-row">
                                                <div class="col">
                                                    <div class="form-group"><label for="username"><strong>Name</strong></label><input class="form-control" type="text" defaultValue={this.state.username}id="uname" name="username"/></div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group"><label for="email"><strong>Email Address</strong></label><input class="form-control" type="email" value={this.state.eid} id="uemail" name="email"/></div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <div class="col">
                                                    <div class="form-group"><label for="first_name"><strong>Mobile Number</strong></label><input class="form-control" type="text" defaultValue={this.state.phone}id="uph_no" name="phone_num"/></div>
                                                </div>
                                                {/* <div class="col">
                                                    <div class="form-group"><label for="last_name"><strong>Last Name</strong></label><input class="form-control" type="text" placeholder="Doe" name="last_name"/></div>
                                                </div> */}
                                            </div>
                                            <div class="form-group"><button class="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
                                        </form>
                                    </div>
                                </div>
                                <div class="card shadow">
                                    <div class="card-header py-3">
                                        <p class="text-primary m-0 font-weight-bold">Education</p>
                                    </div>
                                    <div class="card-body">
                                        <form onSubmit={this.setEdu}>
                                            <div class="form-group"><label for="ten"><strong>10th</strong></label><input class="form-control" type="text" defaultValue={this.state.ten} id="ten" name="address"/></div>
                                            <div class="form-row">
                                                <div class="col">
                                                    <div class="form-group"><label for="twel"><strong>12th</strong></label><input class="form-control" type="text"id="twel" defaultValue={this.state.twel} name="city"/></div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group"><label for="grad"><strong>Graduation</strong></label><input class="form-control" type="text"id="grad" defaultValue={this.state.grad} name="country"/></div>
                                                </div>
                                            </div>
                                            <div class="form-group"><button class="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button></div>
                                        </form>
                                    </div>
                                </div>
                                <div class="mb-3"><button class="btn btn-primary btn-sm" type="button" data-toggle="modal" data-target="#changeModal" rel="nofollow">Change Password</button></div>
                            </div>
    
                        </div>
                    </div>
                </div>               
            </div>

            <div class="modal fade " id="changeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-info">
                        <h5 class="modal-title text-gray-800" id="exampleModalLabel">CHANGE PASSWORD</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      {this.state.flag1==false?
                        (<div class="modal-body">
                          
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" id="pass01" placeholder="Enter Old Password" required/>
                          </div>
                        </div>):
                        (<div class="modal-body">
                          <div class="input-group mb-3">
                          <input type="password" class="form-control" id="npass01" placeholder="Enter New Password" required/>
                          </div>
                          <div class="input-group mb-3">
                          <input type="password" class="form-control" id="npass02" placeholder="ReEnter New Password" required/>
                          </div>
                          </div>
                        )}
                        {this.state.flag1==false?
                        <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <button class="btn btn-primary" onClick={()=>this.pass(document.getElementById("pass01").value)}>Next</button>
                        </div>:
                          <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <button class="btn btn-primary" onClick={()=>this.changepass(document.getElementById("npass01").value,document.getElementById("npass02").value)}>CHANGE</button>
                       </div>
                        }
                    </div>
                  </div>
                </div>   
                <div class="modal fade " id="picModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header bg-info">
                        <h5 class="modal-title text-gray-800" id="exampleModalLabel">CHANGE PHOTO</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div class="modal-body">
                          
                        <div class="input-group mb-3">
                        <input class="form-control btn-sm"  type="file" name="file" id="pict" accept="image/jpg" required/>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                          <button class="btn btn-primary" onClick={()=>this.changePhoto()}>Change</button>
                        </div>
                    </div>
                  </div>
                </div>         
            </div>
        )
    }
}