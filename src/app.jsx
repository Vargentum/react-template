const React = require('react')
const ReactDOM = require('react-dom')
const Test = require('./components/testComponent.jsx')


class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
    }
    render() {
        return 
        <div>
          App
          <Test>fds</Test>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById("app"))
