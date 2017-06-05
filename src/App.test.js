import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

//PLEASE DON'T MIND THIS PART
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});
