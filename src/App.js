import "./App.css"
import React, { Component } from 'react'
import Navbar from "./components/Navbar"
import News from "./components/News"
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route exact path = "/" element  = {<News key={"Top Headlines"} title="Top Headlines"  country='in'/>} />
          <Route exact path = "/business"  element = {<News key={"Business"} title="Business"  country='in' cat="business"/>} />
          <Route exact path = "/entertainment"  element = {<News key={"Entertainment"} title="Entertainment"  country='in' cat="entertainment"/>} />
          <Route exact path = "/general"  element = {<News key={"General"} title="General News"  country='in' cat="general"/>} />
          <Route exact path = "/health"  element = {<News key={"Health"} title="Health"  country='in' cat="health"/>} />
          <Route exact path = "/science"  element = {<News key={"Science"} title="Science"  country='in' cat="science"/>} />
          <Route exact path = "/sports"  element = {<News key={"Sports"} title="Sports"  country='in' cat="sports"/>} />
          <Route exact path = "/technology"  element = {<News key={"Technology"} title="Technology"  country='in' cat="technology"/>} />
        </Routes>
      </div>
      </BrowserRouter>
    )
  }
}