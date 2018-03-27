import React, { Component } from 'react';
import Nav from '../../containers/NavContainer'
import Footer from './Footer';
import '../../static/Layout.css';


export default class Layout extends Component {

    render() {
        return (
            <div>
                <Nav />
                <div className="marginToFooter">{this.props.children}</div>
                <Footer/>
            </div>
        );
    }
}