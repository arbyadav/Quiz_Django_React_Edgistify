import React, { Fragment } from 'react';
import axios from 'axios';
import Question from './Question';
import { Redirect } from 'react-router-dom';
import Countdown from "react-countdown-now";
const API_URL = 'http://127.0.0.1:8000/api/quizzes/'

class QuizDetailView extends React.Component {

    state = {
        quiz: null,
        arrayLength: 0,
        activeQuestion: 0,
        activeOption: null
    }
    config = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Token ${this.props.token}`
            }
        }
        return config;
    };

    componentDidMount() {
        const quizSlug = this.props.match.params.slug;

        axios.get(`${API_URL}${quizSlug}/`, this.config())
            .then(res => {
                this.setState({
                    quiz: res.data.quiz,
                    arrayLength: res.data.quiz.question_set.length
                });
                console.log(res.data)
            })
    };

    optionOnChange = (id) => {
        this.setState({
            activeOption: id
        })
    };

    sendResponse = (quiztaker, question, answer) => {
        const body = JSON.stringify({ quiztaker, question, answer });
        axios
            .post(`http://127.0.0.1:8000/api/response/`, body, this.config())
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    };

    submit = (quiztaker, question, answer) => {
        const quizSlug = this.props.match.params.slug;
        const body = JSON.stringify({ quiztaker, question, answer });

        axios
            .post(`http://127.0.0.1:8000/api/quizzes/${quizSlug}/`, body, this.config())
            .then(res => {
                this.setState({
                    quiz: res.data.quiz
                })
            })
            .catch(err => {
                console.log(err.response.data);
            });
    };

    _next = () => {

        let x = document.getElementById(this.state.activeQuestion.toString() + " question");
        let question = parseInt(x.dataset.id);
        let answer = this.state.activeOption
        if (answer !== null && this.state.activeOption !== this.state.arrayLength - 1) {
            this.sendResponse(this.state.quiz.quiztakers_set.id, question, answer);
        }

        if (this.state.activeQuestion !== this.state.arrayLength - 1) {
            this.setState({
                activeQuestion: this.state.activeQuestion + 1,
                activeOption: null
            })
        } else {
            this.submit(this.state.quiz.quiztakers_set.id, question, answer);
        }
    };
    _prev = () => {
        if (this.state.activeQuestion !== 0) {
            let x = document.getElementById(this.state.activeQuestion.toString() + " question");
            let question = parseInt(x.dataset.id);
            let answer = this.state.activeOption
            if (answer !== null) {
                this.sendResponse(this.state.quiz.quiztakers_set.id, question, answer);
            }


            this.setState({
                activeQuestion: this.state.activeQuestion - 1,
                answer: null
            })
        }
    };

    render() {
        if (this.state.quiz == null) {
            return <div />
        }
        if (this.state.quiz.quiztakers_set.completed === true) {
            return <Redirect to="/quizzes" />
        }
        let label = this.state.activeQuestion === this.state.arrayLength - 1 ? "Submit" : "Next"

        return (
            <Fragment>
                <div className="container"> <h2><Countdown date={Date.now() + 300000} /></h2>
                    <div className="row">
                        {this.state.quiz.question_set.map((question, index) => {
                            let visibility = this.state.activeQuestion === index ? "d-block" : "d-none"
                            return <div key={index} className={`col-lg-5 col-md-6 col-sm-8 col-12 mx-auto ${visibility}`}><div className="card"><form><Question ooc={this.optionOnChange} question={question} id={index} /></form></div></div>
                        }
                        )
                        }
                    </div>
                </div>
                <button onClick={() => this._prev()}>Previous</button><button onClick={() => this._next()}>{label}</button>
            </Fragment>
        )
    }
}

export default QuizDetailView;

