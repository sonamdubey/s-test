import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducer';
import './LoginForm.css';
import Carousel from '../Carousel';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let {username, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
          <div className={isLoginSuccess ? 'hide' : ''}>
        <div className="form-group-collection">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" onChange={e => this.setState({username: e.target.value})} value={username}/>
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" onChange={e => this.setState({password: e.target.value})} value={password}/>
          </div>
        </div>

        <input type="submit" value="Login" />
        </div>
        <div className="message">
          { isLoginPending && <div>Please wait...</div> }
          { isLoginSuccess && <Carousel /> }
          { loginError && <div>{loginError.message}</div> }
        </div>
      </form>
    )
  }

  onSubmit(e) {
    e.preventDefault();
    let { username, password } = this.state;
    this.props.login(username, password);
    this.setState({
      username: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);