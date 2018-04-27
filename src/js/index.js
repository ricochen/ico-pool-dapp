import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import Web3 from 'web3'

import truffleConfig from '../../truffle.js'

const web3Location = `http://${truffleConfig.networks.development.host}:${truffleConfig.networks.development.port}`

window.addEventListener('load', function () {
    let web3Provided;

    if (typeof web3 !== 'undefined') {
        web3Provided = new Web3(web3.currentProvider);
        console.log('Injected web3 detected.');
    } else {
        web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location));
        console.log('No web3 instance injected, using Local web3.');
    }

    ReactDOM.render(
        <App web3={web3Provided} />,
        document.querySelector('#root')
    );
});