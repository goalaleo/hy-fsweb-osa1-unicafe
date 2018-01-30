import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }

  giveRating = (rating) => () => this.setState({[rating]: this.state[rating] + 1})

  debugger

  totalScore = () => this.state.good - this.state.bad
  totalVotes = () => this.state.good + this.state.neutral + this.state.bad
  average = () => this.totalScore()/this.totalVotes()
  percentagePositive = () => (this.state.good/this.totalVotes())*100 + "%"
  doNothing = (value) => () => value


  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
        <Button handleClick={this.giveRating("good")} text="hyvä" />
        <Button handleClick={this.giveRating("neutral")} text="neutraali" />
        <Button handleClick={this.giveRating("bad")} text="huono" />
        <Statistics
          good={this.state.good}
          neutral={this.state.neutral}
          bad={this.state.bad}
          totalScore={this.totalScore}
          totalVotes={this.totalVotes}
          average={this.average}
          doNothing={this.doNothing}
          percentagePositive={this.percentagePositive}
        />
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad, average, totalVotes, totalScore, doNothing, percentagePositive}) => {
  if ((good + neutral + bad) !== 0) {
    return (
      <div>
        <h1>statistiikka</h1>
        <table>
          <tbody>
            <Statistic text="hyvä" calculation={doNothing(good)} />
            <Statistic text="neutraali" calculation={doNothing(neutral)} />
            <Statistic text="huono" calculation={doNothing(bad)} />
            <Statistic text="keskiarvo" calculation={average} />
            <Statistic text="positiivisia" calculation={percentagePositive} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>ei yhtään palautetta annettu</div>
    )
  }
}

const Statistic = ({text, calculation}) => (
  <tr>
    <td>{text}</td>
    <td>{calculation()}</td>
  </tr>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
