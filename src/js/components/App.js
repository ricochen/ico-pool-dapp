import React from 'react'
import Crowdsale from './Crowdsale.js'
import Pool from './Pool.js'
// import './App.css'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Crowdsale web3={this.props.web3} />
                <Pool web3={this.props.web3} />
            </div>
        )
    }
}

export default App