import superagent from 'superagent'
import { API_HOST } from './config'

class Api {


  requestLogin = (email, password) => (
    superagent
      .post(`${API_HOST}/auth/sessions`)
      .set('Content-Type', 'application/json')
      .send({ email, password })
  )


  signUp = (email, password, username, interests) => (

    superagent
      .post(`${API_HOST}/auth/users`)
      .set('Content-Type', 'application/json')
      .send({ email, password, username, interests })
  )

  requestQuestion = (currentLevel, isCorrect) => {
    if (currentLevel !== undefined && isCorrect !== undefined) {
      return superagent
        .get(`${API_HOST}/questions/nextQuestion?currentLevel=${currentLevel}&isCorrect=${isCorrect}`)
        .set('Content-Type', 'application/json')
    }
    else {
      return superagent
        .get(`${API_HOST}/questions/nextQuestion`)
        .set('Content-Type', 'application/json')
    }
  }

  getCurrentUser = (token) => {
    return superagent
      .get(`${API_HOST}/auth/me`)
      .set('Authorization', `token ${token}`)
  }

}



export default new Api();
