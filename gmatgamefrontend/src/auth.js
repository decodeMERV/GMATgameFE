import api from './api';

export default {
  login(email, pass) {
      return api.requestLogin(email, pass)
        .then(res => localStorage.token = res.body.token)
  },

  getToken() {
    return localStorage.token
  },

  logout() {
    return api.requestLogout(localStorage.token)
      .then(res => delete localStorage.token)
  },

  isLoggedIn() {
    return !!localStorage.token
  },

  getCurrentLoggedInUser(token) {
    return api.getCurrentUser(token);
  },

  signUp(email, password, username, interests){
    return api.signUp(email, password, username, interests);
  }

}

