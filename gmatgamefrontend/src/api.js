import superagent from 'superagent'
import { API_HOST } from './config'

class Api {


  requestLogin = (email, password) => (
    superagent
      .post(`${API_HOST}/auth/sessions`)
      .set('Content-Type', 'application/json')
      .send({ email, password })
  )


  signup = (email, password, username, interests) => (

    superagent
      .post(`${API_HOST}/auth/sessions`)
      .set('Content-Type', 'application/json')
      .send({ email, password, username, interests })
  )

  requestQuestion = (currentLevel, isCorrect) => {
    return superagent
      .get(`${API_HOST}/nextQuestion?=${currentLevel}&isCorrect=${isCorrect}`)
      .set('Content-Type', 'application/json')
  }

}



export default new Api();
