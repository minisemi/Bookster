// src/components/Layout.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav'
import Footer from './Footer';
import '../static/Layout.css';


export default class Layout extends Component {
  render() {
    return (
      <div>
          <Nav/>
        <div className="marginToFooter">{this.props.children}</div>
        <Footer/>
      </div>
    );
  }
}