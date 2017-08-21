import React, {Component} from 'react';
import './AdminDashboard.css';
import DescriptiveTextBox from '../elements/DescriptiveTextBox';
import api from '../api';
import auth from '../auth';

const ENTER = 13;
const GMATLevels = ['200', '300', '400'];
const GMATCategories = ['Math', 'Verbal', 'Writing', 'Reasoning', 'Data'];
const MultipleChoiceOptions = ['A', 'B', 'C', 'D', 'E'];
const GMATQuestionLimit = ['10', '25', '50'];

export default class AdminDashboard extends Component {
  constructor(){
    super();
    this.state={
      error : null,
      successMSG: null,
      page: 1
    }
  }

  handleUserInput = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null })
    }
    if (this.state && this.state.successMSG) {
      this.setState({ successMSG: null })
    }
    if (e.keyCode===ENTER) {
      this.processCreateQuestion()
    }
  }

  processCreateQuestion = () => {
    var questionObj = {};

    for (var ref in this.refs){
      questionObj[ref] = (this.refs[ref].value); //minor inefficiency here as we are attaching a few too many refs
      if (!this.refs[ref].value) { //Check if form is empty
        this.setState({error: "Fill in the form!"})
        return;
      }
    }

    api.createQuestion(questionObj, auth.getToken())
      .then( (res) => {
        this.setState({successMSG: res.body.message})
      })
      .catch( (error) => {
        console.log("error posting to questions table", error);
        this.setState({error: "Error posting to questions table" + error})
      })
  }

  fetchLeQuestions = (fromThisId, limitRows, categoryId, level) => {
    console.log("FETCHING LE QUESTIONS");
    var arrayQuesObj = {};
    arrayQuesObj.fromId = fromThisId || 1;
    arrayQuesObj.limit = limitRows || 10;
    arrayQuesObj.catId = categoryId || undefined;
    arrayQuesObj.levelDifficulty = level || undefined;
    console.log(arrayQuesObj);

    api.getArrayOfQuestions(arrayQuesObj, auth.getToken())
      .then(res => {
        console.log(res.body);
        if (res.body.length > 0) { //in case we don't get an array of rows back, moreover in case the user selects on the placeholder option
          this.setState({arrayQues: res.body, page: res.body[res.body.length - 1].id});
        }
      })
  }

  showDiffQuestions = () => {
    this.setState({ page : 1}, //To reset the previous search we start at id = 1
      () => {
        this.fetchLeQuestions(this.state.page, this.refs.limitQuestions.value,
          (this.refs.categoryIdShowQuestions.value === "Category" ? undefined : this.refs.categoryIdShowQuestions.value ),
          (this.refs.levelShowQuestions.value === "Level" ? undefined : this.refs.levelShowQuestions.value))
      });
  }

  //Instead of using componentDidUpdate we can pass a second callback param to setState which will execute after the state has been updated(which is async)
  nextPage = () => {
        this.fetchLeQuestions(this.state.page, this.refs.limitQuestions.value,
          (this.refs.categoryIdShowQuestions.value === "Category" ? undefined : this.refs.categoryIdShowQuestions.value ),
          (this.refs.levelShowQuestions.value === "Level" ? undefined : this.refs.levelShowQuestions.value)) //TODO: Ask how come I need to wrap this in a function instead of just this.fetchLeQuestions?
  }

  prevPage = () => {
    if (this.state.page - Number(this.refs.limitQuestions.value) < 1) { return }
    this.setState({ page : this.state.page - Number(this.refs.limitQuestions.value)},
      () => {
        console.log("Page ", this.state.page);
        this.fetchLeQuestions(this.state.page, this.refs.limitQuestions.value,
          (this.refs.categoryIdShowQuestions.value === "Category" ? undefined : this.refs.categoryIdShowQuestions.value ),
          (this.refs.levelShowQuestions.value === "Level" ? undefined : this.refs.levelShowQuestions.value))
      });
  }

  componentDidMount() {
    this.fetchLeQuestions();
  }

  render () {
    console.log("RENDERED ADMIN");
    return (
      <div>
        {(this.state.successMSG !== null) ?
          <DescriptiveTextBox theText={this.state.successMSG} bgColor="green"/>
          :
          null}
        {(this.state.error !== null) ?
          <DescriptiveTextBox theText={this.state.error} bgColor="red"/>
          :
          null}
        <input ref="title" type="text" onKeyUp={this.handleUserInput} placeholder={"Question"}/>
        {MultipleChoiceOptions.map( (letter) => {
          return <input type="text" onKeyUp={this.handleUserInput} placeholder={"Answer" + letter} ref={"answer"+letter} key={letter}/>
        })}
        <select ref="correctAnswer" onChange={this.handleUserInput}>
          {MultipleChoiceOptions.map( (letter) => {
            return <option value={letter} key={letter}>{"Answer " + letter}</option>
          })}
        </select>
        <select ref="level" onChange={this.handleUserInput}>
          {GMATLevels.map( (level) => {
            return <option value={level} key={level}>{"level " + level}</option>
          })}
        </select>
        <select ref="categoryId" onChange={this.handleUserInput}>
          {GMATCategories.map( (category, index) => {
            return <option value={index + 1} key={category}>{category}</option>
          })}
        </select>
        <DescriptiveTextBox theText="Create" onClick={this.processCreateQuestion}/>
        <h2>Questions</h2>
        <select ref="levelShowQuestions" onChange={this.showDiffQuestions}>
          <option>Level</option>
          {GMATLevels.map((level) => {
            return <option value={level} key={level}>{"level " + level}</option>
          })}
        </select>
        <select ref="categoryIdShowQuestions" onChange={this.showDiffQuestions}>
          <option>Category</option>
          {GMATCategories.map((category, index) => {
            return <option value={index + 1} key={category}>{category}</option>
          })}
        </select>
        <select ref="limitQuestions" onChange={this.showDiffQuestions}>
          {GMATQuestionLimit.map((numberOfRows) => {
            return <option value={numberOfRows} key={numberOfRows}>{numberOfRows + " Per Page"}</option>
          })}
        </select>
        <button onClick={this.prevPage}>{"<"}</button>
        <button onClick={this.nextPage}>{">"}</button>
        {
          Array.isArray(this.state.arrayQues) && this.state.arrayQues.length > 0 ?
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Level</th>
                </tr>
                {this.state.arrayQues.map((question) => {
                  return (
                    <tr key={question.id}>
                      <td>{question.id}</td>
                      <td>{question.title.substring(0, 36)}
                          {question.title.length > 35 ? "..." : null}</td>
                      <td>{question.categoryName} </td>
                      <td>{question.level} </td>
                    </tr>)
                })}
              </tbody>
            </table>
            :
            null
        }
      </div>
    );
  }
}