import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
class QuizItem extends React.Component {

    render() {
        let score = "";
        let answered = "";
        let questioned = "";
        let label = (<Link to={`/quizzes/${this.props.quiz.slug}`} className="btn btn-primary d-block" style={{ width: "auto" }}>Start Quiz</Link>);
        let label1 = "";
        let button = "";
        if (this.props.quiz.quiztakers_set) {
            if (this.props.quiz.quiztakers_set.completed) {
                answered = this.props.quiz.quiztakers_set.correct_answers
                questioned = this.props.quiz.questions_count
                score = (this.props.quiz.quiztakers_set.correct_answers / this.props.quiz.questions_count) * 100
                button = this.props.quiz.quiztakers_set.completed ? (<button onClick={() => this.props.reset(this.props.quiz.slug)}>Reset Quiz</button>) : ""
                label1 = (<h5>{answered} out of {questioned}</h5>)
                label = (<h5>Score: {score}%</h5>)

            }
        }

        return (
            <Fragment>
                <div className="card">
                    <div className="card-body text-left">
                        <div className="card-title d-inline-block mb-0"><h1>{this.props.quiz.name}</h1></div>
                        <div className="card-text d-inline-block ml-3">Description: {this.props.quiz.description} <span className="ml-3">Questions Count: {this.props.quiz.questions_count}</span></div>
                        {label1}
                        {label}
                        {button}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default QuizItem;
