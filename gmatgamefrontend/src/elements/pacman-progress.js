var PacmanProgress = require('react-pacman-progress');
var React = require('react');

var App = React.createClass({
  getInitialState() {
    return {currentIndex: 0};
  },
  render() {
    var slides = [
      {color: '#c0ffee'},
      {color: '#deface'},
      {color: '#0ff1ce'}
    ]
    return (
      <div className="container" onCLick={this.handleClick}>
        {
          slides.map(function(slide, i) {
            return <div style={{backgroundColor: slide.color, width: 300, height: 300}} />;
          }.bind(this))
        }
        <PacmanProgress items={slides.length} currentIndex={this.state.currentIndex} />
      </div>
    );
  },

  handleClick: function() {
    this.setState({currentIndex: this.state.currentIndex + 1});
  }
});

module.exports = App;
