import React from 'react';

class Answer extends React.Component {
    render() {
        return (
            <div>
                <input onClick={() => this.props.ooc(this.props.answer.id)} type="radio" name={this.props.answer.question} />
                <label htmlFor={this.props.id}>{this.props.answer.text}</label>
            </div>
        )
    }
}

export default Answer;