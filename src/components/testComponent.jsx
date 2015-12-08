const React = require('react')

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Test';
    }
    render() {
        return <div>Test test world</div>
    }
}

export default Test;
