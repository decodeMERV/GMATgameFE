import superagent from 'superagent'
import { API_HOST } from './config'

class Api {
  requestQuestion = (currentLevel, isCorrect) => {
    return superagent
      .get(`${API_HOST}/nextQuestion?=${currentLevel}&isCorrect=${isCorrect}`)
      .set('Content-Type', 'application/json')
  }
}

export default new Api();
