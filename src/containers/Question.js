import React, { Fragment } from 'react';
import Answer from './Answer';

class Question extends React.Component {
    render() {
        return (
            <Fragment>
                <h1 id={`${this.props.id} question`} data-id={this.props.question.id}>{this.props.question.label}</h1>
                {this.props.question.answer_set.map((answer, index) => {
                    return <Answer ooc={this.props.ooc} key={index} answer={answer} />
                }
                )
                }
            </Fragment>
        )
    }
}

export default Question;