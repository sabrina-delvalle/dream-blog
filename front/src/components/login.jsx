import React, { Component} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css'
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';


class Login extends Component {
    constructor(props){
        super(props);
        this.state ={ username: '', password: '', logged: true }; 
        
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
      } 

    handleUsername(event) {
        this.setState({username: event.target.value})
    }

    handlePassword(event) {
        this.setState({password: event.target.value})
    }

  async handleSubmit(event){
    event.preventDefault();
    //console.log('username: ' + this.state.username + '\npassword: ' + this.state.password)
    //console.log(this.state)
    //console.log(JSON.stringify(this.state))
/*     axios.get('/login', {withCredentials: true}).then((res) => {
      console.log('axios', res.data)
    }) */

/*     fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.text())
      .then(data => {
        console.log('data response', data)
          if (data === 'invalid user or password') {
            console.log('wrong user or password, please try again')
            this.setState({logged: false})
          }else{
            document.cookie=`token=; max-age=0`
            document.cookie= `token=${data}`; 
            console.log(document.cookie.split('=')[1])
            this.props.navigate('/') 
          }
      }) */

  const userInfo = {
    username: this.state.username,
    password: this.state.password
  }
    console.log('user ', userInfo)
    console.log('user ', JSON.stringify(userInfo))

    const formData = new FormData();
    formData.append('username', this.state.username)
    formData.append('password', this.state.password)


      
  axios.post('http://localhost:5000/login', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'plain/text'
    }
  })
      .then((res) => {
      console.log('axios ', res.data)
      if (res.data === 'invalid user or password') {
        console.log('wrong user or password, please try again')
        this.setState({logged: false})
        this.setState({password: ''})
      } else {
        console.log('local storageee: ', res.data)
        localStorage.setItem('username', JSON.stringify(res.data.name))
        localStorage.setItem('userlastname', JSON.stringify(res.data.lastname))
        localStorage.setItem('image', JSON.stringify(res.data.image))
        //this.props.navigate('/')
        document.location.replace('/')
      }
  })

      /* fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text"
        },
        body: JSON.stringify(this.state)
      })
        .then(response => response.text())
        .then(data => {
          console.log('data response', data)
            if (data === 'invalid user or password') {
              console.log('wrong user or password, please try again')
              this.setState({logged: false})
            }else{
              document.cookie=`token=; max-age=0`  // delete
              document.cookie= `token=${data}`;   //too
              console.log(document.cookie.split('=')[1])  //too
              this.props.navigate('/') 
            }
        }) */
        
}

  render() {
    let logged = this.state.logged;
    return (
    <div className='centerForm-login-section'>
          <form onSubmit={this.handleSubmit} className='centerForm-login'>
          <h1 className='center' > Login </h1>            
            <label className='blocks-login' name="username"> Username </label>             
              <input type='text' value={this.state.username} onChange={this.handleUsername} className='input-1-log' name="username"/>
            <label className='blocks-login' name="password"> Password </label>             
              <input type='password' value={this.state.password} onChange={this.handlePassword} className='input-1-log' name="password" placeholder='*******'/>
            {
              logged ? <p></p> : <p className="wrongPassword" >wrong user or password, please try again</p>
            }
            <input type="submit" value="OK" className='submit' />
          </form>
          <div>
            <p style={{color: '#86959a'}}>OR</p>
            <div className='ssrr-login'>
              <a href='/'><img src={instagram} alt='fb' width='27px' className='ssrr-img-login'></img></a>
              <a href='/'><img src={facebook} alt='fb' width='27px' className='ssrr-img-login'></img></a>
              <a href='/'><img src={twitter} alt='fb' width='27px' className='ssrr-img-login'></img></a>
            </div>
          </div>
    </div>
    )
  }
}

export function LoginSession (props){
  const navigate = useNavigate();
  return (
    <Login navigate={navigate}/>
  )
}
