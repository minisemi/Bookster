import React from 'react';
import Popup from 'react-popup';
import ReactDom from 'react-dom';



export default class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue
        };

        this.onChange = (e) => this._onChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state.value);
        }
    }

    _onChange(e) {
        let value = e.target.value;

        this.setState({value: value});
    }

    render() {
        return ;
    }
}

/** Prompt plugin */
Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null;
    let promptChange = function (value) {
        promptValue = value;
    };

        this.create({
        title: 'What\'s your name?',
        content: 'content',
        buttons: {
            left: [{
            text: 'Cancel',
            className: 'danger',
            action: function () {
                Popup.alert('You pressed the Cancel btn');

                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }],
        right: [{
            text: 'Alt',
            action: function () {
                Popup.alert('You pressed the Alt btn');

                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }, {
            text: 'Save',
            className: 'success',
            action: function () {
                Popup.alert('You pressed the Save btn');

                /** Close this popup. Close will always close the current visible one, if one is visible */
                Popup.close();
            }
        }]
        }
    });
});

/** Call the plugin */
Popup.plugins().prompt('', 'Type your name', function (value) {
    Popup.alert('You typed: ' + value);
});


// GLobal Plugin
Popup.registerPlugin('popover', function (content, target) {
    this.create({
        content: content,
        className: 'popover',
        noOverlay: true,
        position: function (box) {
            let bodyRect      = document.body.getBoundingClientRect();
            let btnRect       = target.getBoundingClientRect();
            let btnOffsetTop  = btnRect.top - bodyRect.top;
            let btnOffsetLeft = btnRect.left - bodyRect.left;
            let scroll        = document.documentElement.scrollTop || document.body.scrollTop;

            box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
            box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
            box.style.margin = 0;
            box.style.opacity = 1;
        }
    });
});

//Popup.plugins().popover('This popup will be displayed right above this button.', element);

