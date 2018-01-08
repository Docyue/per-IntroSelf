class ChildCmp extends React.Component {
  render() {
    return <div>{this.props.childMessage}</div>
  }
}

class ExampleApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'no message'
    };
  }

  componentWillMount() {
    // ...
  }

  componentDidMount() {
    setTimeout ((=>{
      this.setState({
        message: 'timtout state message'
      })
    }))
  }

  shouldComponentUpdate(nextProps, nextStates, nextContext) {
    return true;
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    // ...
  }

  compontentWillReceiveProps(nextProps) {
    // ...
  }

  componentWillUnmount() {
    // ...
  }

  onClickHandler() {
    this.setState({message: 'click state message'})
  }

  render() {
    return <div>
      <button onClick={this.onClickHandler.bind(this)}>
        set setate button</button>
      <ChildCmp childMessage={this.state.message}/>
    </div>
  }
}
ReactDOM.render(
  <ExampleApplication hello={'world'} />,
  document.getElementById('container'),
  function () {}
)
