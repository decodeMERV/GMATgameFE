import superagent from 'superagent'
import { API_HOST } from './config'

class Api {


  requestLogin = (email, password) => (
    superagent
      .post(`${API_HOST}/auth/sessions`)
      .set('Content-Type', 'application/json')
      .send({ email, password })
  )


  requestLogout = (token) => (
    superagent
      .delete(`${API_HOST}/auth/sessions`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `token ${token}`)
  )

  signUp = (email, password, username, interests) => (

    superagent
      .post(`${API_HOST}/auth/users`)
      .set('Content-Type', 'application/json')
      .send({ email, password, username, interests })
  )

  requestQuestion = (currentLevel, isCorrect, token) => {
    if (currentLevel !== undefined && isCorrect !== undefined) {
      return superagent
        .get(`${API_HOST}/questions/nextQuestion?currentLevel=${currentLevel}&isCorrect=${isCorrect}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `token ${token}`)
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

  recordQuestion = (username,questionId,isCorrect,category,answer,level,score,time,token) => (

    superagent
      .post(`${API_HOST}/record/recorder`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `token ${token}`)
      .send({ username, questionId, isCorrect, category, answer, level, score, time})

  )

  getLeader = () => (
    superagent.get(`${API_HOST}/record/leaders`)
      .set('Content-Type', 'application/json')
      .send()
  )

  createQuestion = (insertQuesObject, token) => {
    return superagent
      .post(`${API_HOST}/questions`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `token ${token}`)
      .send(insertQuesObject)
  }
  editProfile = (username, email, interests, token) => (
    superagent
    .patch(`${API_HOST}/auth/me`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `token ${token}`)
    .send({ username, email, interests, token})
  )

  getArrayOfQuestions = (queryQuestionsObj, token) => {
    return superagent
      .get(`${API_HOST}/questions/?rowOffset=${queryQuestionsObj.rowOffset}&limit=${queryQuestionsObj.limit}&categoryId=${queryQuestionsObj.catId}&level=${queryQuestionsObj.levelDifficulty}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `token ${token}`)
  }

  deleteThisQuestion = (deleteQuesId, token) => {
    return superagent
      .del(`${API_HOST}/questions`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `token ${token}`)
      .send({id : deleteQuesId})
  }

}



export default new Api();
