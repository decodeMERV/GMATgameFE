import React, {Component} from 'react';
import './AdminDashboard.css';
import DescriptiveTextBox from '../elements/DescriptiveTextBox';
import DeleteButton from '../elements/DeleteButton';
import api from '../api';
import auth from '../auth';
import Dropdown from "../elements/Dropdown";

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
      rowOffset: 0
    }
    this.createQuesEle = {}
    this.showRowsEle = {}
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
      if ( ref.match(/^answer[ABCDE]|title/) ){
        questionObj[ref] = (this.refs[ref].value);
      }

      if (!this.refs[ref].value) { //Check if form is empty
        this.setState({error: "Fill in the form!"});
        return;
      }
    }

    for (var dropdown in this.createQuesEle){
      questionObj[dropdown] = (this.createQuesEle[dropdown].value);
    }

    api.createQuestion(questionObj, auth.getToken())
      .then( (res) => {
        this.setState({successMSG: res.body.message})
      })
      .catch( (error) => {
        this.setState({error: "Error posting to questions table" + error})
      })
  }

  fetchLeQuestions = (rowOffset, limitRows, categoryId, level ) => {
    var arrayQuesObj = {};
    arrayQuesObj.rowOffset = rowOffset || 0;
    arrayQuesObj.limit = limitRows || 10;
    arrayQuesObj.catId = categoryId || undefined;
    arrayQuesObj.levelDifficulty = level || undefined;

    api.getArrayOfQuestions(arrayQuesObj, auth.getToken())
      .then(res => {
        if (res.body.length > 0) { //in case we don't get an array of rows back, moreover in case the user selects on the placeholder option
          this.setState({arrayQues: res.body, rowOffset: this.state.rowOffset + Number(this.refs.limitQuestions.value) });
        }
      })
  }

  showDiffQuestions = () => {
    this.setState({ rowOffset : 0}, //To reset the previous search we start at offset 0
      () => {
        this.fetchLeQuestions(this.state.rowOffset, this.refs.limitQuestions.value,
          (this.refs.categoryIdShowQuestions.value === "Category" ? undefined : this.refs.categoryIdShowQuestions.value ),
          (this.refs.levelShowQuestions.value === "Level" ? undefined : this.refs.levelShowQuestions.value))
      });
  }

  nextPage = () => {
        this.fetchLeQuestions(this.state.rowOffset, this.refs.limitQuestions.value,
          (this.refs.categoryIdShowQuestions.value === "Category" ? undefined : this.refs.categoryIdShowQuestions.value ),
          (this.refs.levelShowQuestions.value === "Level" ? undefined : this.refs.levelShowQuestions.value)) //Don't need to add to this.state.rowOffset in this function, as it gets added during the fetchLeQuestions
  }

  prevPage = () => {
    if (this.state.rowOffset - Number(this.refs.limitQuestions.value) < 1) { return }
    this.setState({ rowOffset : this.state.rowOffset - Number(this.refs.limitQuestions.value)*2 }, //We need multiply it by two as the offset goes up in fetchLeQuestions
      () => {
        this.fetchLeQuestions(this.state.rowOffset, this.refs.limitQuestions.value,
          (this.refs.categoryIdShowQuestions.value === "Category" ? undefined : this.refs.categoryIdShowQuestions.value ),
          (this.refs.levelShowQuestions.value === "Level" ? undefined : this.refs.levelShowQuestions.value))
      });
  }

  componentDidMount() {
    this.fetchLeQuestions();
  }

  deleteQuestion = (questionId, arrayIndex) => () => {
      api.deleteThisQuestion(questionId, auth.getToken())
        .then( () => { //Note here how I chose not to refetch the data to lessen server load, instead make it disappear on front-end - Vincent Lau
          this.setState({ arrayQues : this.state.arrayQues.slice(0, arrayIndex).concat( this.state.arrayQues.slice(arrayIndex + 1) ) }) // Slice out the deleted item
        })
  }

  render () {
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
        {/*<select ref="correctAnswer" onChange={this.handleUserInput}>*/}
          {/*{MultipleChoiceOptions.map( (letter) => {*/}
            {/*return <option value={letter} key={letter}>{"Answer " + letter}</option>*/}
          {/*})}*/}
        {/*</select>*/}
        <Dropdown innerRef={ (ele) => {this.createQuesEle.correctAnswer = ele} } onChange={this.handleUserInput} passedArray={MultipleChoiceOptions} useItemValueOrIndex={true} textBefore={"Answer "} showItem={true} textAfter={false}/>
        {/*<select ref="level" onChange={this.handleUserInput}>*/}
          {/*{GMATLevels.map( (level) => {*/}
            {/*return <option value={level} key={level}>{"level " + level}</option>*/}
          {/*})}*/}
        {/*</select>*/}
        <Dropdown innerRef={ (ele) => {this.createQuesEle.level = ele} } onChange={this.handleUserInput} passedArray={GMATLevels} useItemValueOrIndex={true} textBefore={"Level "} showItem={true} textAfter={false}/>
        {/*<select ref="categoryId" onChange={this.handleUserInput}>*/}
          {/*{GMATCategories.map( (category, index) => {*/}
            {/*return <option value={index + 1} key={category}>{category}</option>*/}
          {/*})}*/}
        {/*</select>*/}
        <Dropdown innerRef={ (ele) => {this.createQuesEle.categoryId = ele} } onChange={this.handleUserInput} passedArray={GMATCategories} useItemValueOrIndex={false} textBefore={false} showItem={true} textAfter={false}/>
        <DescriptiveTextBox theText="Create" onClick={this.processCreateQuestion}/>
        <h2>Questions</h2>
        <select ref="levelShowQuestions" onChange={this.showDiffQuestions}>
          <option>Level</option>
          {GMATLevels.map((level) => {
            return <option value={level} key={level}>{"level " + level}</option>
          })}
        </select>
        {/*<Dropdown innerRef={ (ele) => {this.eleme} } >*/}
          {/*<option>Level</option>*/}
        {/*</Dropdown>*/}
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
                  <th></th>
                </tr>
                {this.state.arrayQues.map((question, i) => {
                  return (
                    <tr key={question.id}>
                      <td>{question.id}</td>
                      <td>{question.title.substring(0, 21)}
                          {question.title.length > 20 ? "..." : null}</td>
                      <td>{question.categoryName} </td>
                      <td>{question.level} </td>
                      <td> <DeleteButton onClick={this.deleteQuestion(question.id, i)}/> </td>
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