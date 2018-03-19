import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer(Moment);

export default class FormInput extends Component {
    render () {
        const {
            feedbackIcon,
            input,
            type,
            child,
            meta: { error, warning, touched },
            ...props
        } = this.props;

        let message;
        const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

        if ( touched && ( error || warning ) ) {
            message = <span className="help-block" style={{color: "#a94442"}}>{ error || warning }</span>;
        }

        let component;

        switch (child) {
            case 'editText':
                component =
                    <FormGroup validationState={ validationState }>
                <FormControl { ...input }
                    type={ type }
                    { ...props } />
                { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> : null }
                { message }
            </FormGroup>
                    ;
                break;
            case 'dateTimePicker':
                component =
                    <div>
                    <DateTimePicker
                    time={false}
                    onChange={input.onChange}
                    format="YYYY-MM-DD"
                    value={!input.value ? null : new Date(input.value)}
                    className={message ? "datePicker" : null}
                    { ...props }
                />
                { message }</div>;
                break;
        }

        return (
                 component
        );
    }
}
