import React, { Fragment } from 'react';
import axios from 'axios';
import './quiz-list.css';
import QuizItem from './QuizItem';

const API_URL = 'http://127.0.0.1:8000/api/quizzes/'

class QuizListView extends React.Component {
    state = {
        quizzes: null,
        redirect: false
    };

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




    resetQuiz = (slug, id, e) => {
        axios
            .post(`http://127.0.0.1:8000/api/quizresult/${slug}/`, null, this.config())
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            });


        let new_state = this.state.quizzes

        var result = new_state.find((obj, index) => {
            if (obj.slug === slug) {
                new_state[index].quiztakers_set.completed = false
            }
        })


        this.setState({
            quizzes: new_state
        })
    };


    componentDidMount() {
        axios.get(`${API_URL}`, this.config())
            .then(res => {
                this.setState({
                    quizzes: res.data
                });
                console.log(res.data);
            })
    };

    // onLogout = (e) => {
    //     axios.post('http://127.0.0.1:8000/api/auth/logout/', this.props.token)
    //         .then(res => {
    //             console.log(res.data)
    //             if (!res.data.token) {
    //                 this.removeCookie("atn", res.data.token, 365)
    //                 this.props.setAuthenticated = false;
    //                 componentDidMount(){
    //                     window.addEventListener(
    //                         "beforeunload",
    //                         cookies.remove('userInfo')
    //                     );
    //                 }
    //                 return <Redirect to="/login" />
    //             }
    //         })

    // };


    render() {
        if (!this.state.quizzes) {
            return <div></div>
        }
        return (
            <Fragment>

                <nav className="navbar fixed-top navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1"><a href='/' >Quiz Application</a> |
                    <a href='http://127.0.0.1:8000/admin/'> Admin</a> |
                    <a href='http://127.0.0.1:8000/api/auth/logout/'> Logout</a></span>
                </nav>

                <main role="main" className="container">
                    {this.state.quizzes.map((quiz, index) => {
                        return <QuizItem key={index} reset={this.resetQuiz} quiz={quiz} />
                    }
                    )
                    }
                </main>
            </Fragment >
        );
    }
}

export default QuizListView;
