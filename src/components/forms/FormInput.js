import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class FormInput extends Component {
    render () {
        const {
            feedbackIcon,
            input,
            type,
            meta: { error, warning, touched },
            ...props
        } = this.props;

        let message;
        const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

        if ( touched && ( error || warning ) ) {
            message = <span className="help-block">{ error || warning }</span>;
        }

        return (
            <FormGroup validationState={ validationState }>
                <FormControl { ...input }
                             type={ type }
                             { ...props } />
                { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> : null }
                { message }
            </FormGroup>
        );
    }
}
