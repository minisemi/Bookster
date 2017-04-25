// src/components/Layout.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav'

export default class Layout extends Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Nav/>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            This is a demo app to showcase universal rendering and routing with <strong>React</strong> and <strong>Express</strong>.
          </p>
        </footer>
      </div>
    );
  }
}