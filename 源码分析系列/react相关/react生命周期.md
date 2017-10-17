创建一个React组件

官网说了，React中有一个React.Component类，这是一个抽象类，我们很少会直接用到它，通常我们写一个子类去继承它，并且在我们的类中至少定义一个render()方法。

    class Greeting extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }

上面这个是ES6的写法，当然如果没有用ES6,那么可以向下面这样去写：

    var Greeting = React.createClass({
      render: function() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    });

组件生命周期
------------------------------------------------------------------------
每个组件都有几个生命周期函数，以will为前缀的函数是在发生某些事之前调用，以did为前缀的是在发生某些事之后调用

#### Mounting
如下这些方法在组件实例被创建和被插入到dom中时被调用。

------ constructor()  
constructor在组件被mounted之前调用，我们的组件继自React.Component,constructor函数中我们在其他操作前应该先调用super(props)，否则this.props将会是undefined。

constructor初始化state的好地方。如果我们不需要初始化state，也不需要bind任何方法，那么在我们的组件中不需要实现constructor函数。

(注意下面这种情况，很容易产生bug，我们通常的做法是提升state到父组件，而不是使劲的同步state和props)

  constructor(props) {
    super(props);
    this.state = {
      color: props.initialColor
    };
  }

------ componentWillMount()  
此方法在mounting之前被立即调用，它在render()之前调用，因此在此方法中setState不会触发重新渲染。此方法是服务器渲染中调用的唯一的生命周期钩子，通常我们建议使用constructor()。

------ render()  
render()方法是react组件必须的，它检查this.props和this.state并且返回一个React元素，我们也可以返回null或false，代表我们不想有任何的渲染。

render()方法应该是一个纯方法，即它不会修改组件的state，在每一次调用时返回同样的结果。它不直接和浏览器交互，如果我们想要交互，应该在componentDidMount()或者其他的生命周期函数里面。

------ componentDidMount()  
此方法在组件被mounted之后立即被调用，初始化dom节点应该在此方法中，如果需要从远端健在数据，这里是实例化网络请求的好地方，此方法中setState会触发组件重新渲染。

#### Updating
props和state的改变产生更新。在重新渲染组建时，如下的方法被调用

------ componentWillReceiveProps()  
一个已经mounted的组件接收一个新的props之前componentWillReceiveProps()被调用，如果我们需要更新state来响应prop的更改，我们可以在此方法中比较this.props和nextProps并使用this.setState来更改state。

注意，即使props没有改变，React也可以调用这个方法，因此如果你只想处理改变，请确保比较当前值和下一个值。当父组件导致你的组件重新渲染时，可能会发生这种情况。

React在组件mounting期间不会调用此方法，只有在一些组件的props可能被更新的时候才会调用。调用this.setState通常不会触发componentWillReceiveProps。

------ shouldComponentUpdate()
使用此方法让React知道组件的输出是否不受当前state或props更改的影响。默认行为是在每次state更改时重新渲染组件，在大多数情况下，我们应该默认改行为。

当接收到新的props或state时，shouldComponentUpdate()在渲染之前被调用。默认返回true，对于初始渲染或使用forceUpdate()时，不调用此方法。返回false不会阻止子组件的state更改时，该子组件重新渲染。

如果shouldComponentUpdate()返回false，那么componentWillUpdate()，render()和componentDidUpdate()将不会被调用。在将来，React可将shouldComponentUpdate()作为提示而不是strict指令，返回仍然可能导致组件重新渲染。

------ componentWillUpdate()  
当接收新的props或state时，componentWillUpdate()在组件渲染之前被立即调用。使用此函数作为在更新发生之前执行准备的机会。初始渲染不会调用此方法。

注意：这里不能调用this.setState()(如果调用会怎么样？好奇心很重呀，试了一下，会产生死循环，一直更新。。。)。如果我们需要更新state以响应props的更改，我们应该用componentWillReceiveProps()

------ render()  
render()方法是react组件必须的，它检查this.props和this.state并且返回一个React元素，我们也可以返回null或false，代表我们不想有任何的渲染。

render()方法应该是一个纯方法，即它不会修改组件的state，在每一次调用时返回同样的结果。它不直接和浏览器交互，如果我们想要交互，应该在componentDidMount()或者其他的生命周期函数里面。

------ componentDidUpdate()
此函数在更新后立即被调用。初始渲染不调用此方法。

当组件已经更新时，使用此操作作为DOM操作的机会。这也是一个好的地方做网络请求，只要你比较当前的props和以前的props(例如：如果props没有改变，可能不需要网络请求)。

#### Unmounting
当从dom中移除组件时，这个方法会被调用

------ componentWillUnmount()  
此函数在组件被卸载和销毁之前被立即调用。在此方法中执行一些必要的清理。例如清除计时器，取消网络请求或者清理在componentDidMount中创建的任何DOM元素。

官网说组件生命周期是这样的，但是谁知道对不对呢（当然是对的，但是怀疑的态度还是要有的嘛，主要还是为了加深理解，更好的写React组件）。

可以在http://codepen.io（此处不是打广告，只是自己在用这款而已，当然你也可以用其的，比如：jsfiddle等，总有一款适合你,也可以直接f12(chrome)，打开console）查看上述代码的console结果。  

第一次渲染组件：LifeCycle组件第一次渲染时，打印出（生命周期函数执行）：

    "constructor"
    "componentWillMount"
    "render"
    "componentDidMount"

当组件的props发生改变：当我们点击“改变LifeCycle的props”按钮（组件的props发生改变）时，按理说，这时LifeCycle会调用updating阶段的钩子函数。

    "componentWillReceiveProps"
    "shouldComponentUpdate"
    "componentWillUpdate"
    "render"
    "componentDidUpdate"
当组件的state发生改变：我们在组件内部，点击“改变LifeCycle的state”按钮时（组件的state发生改变），打印如下

    "shouldComponentUpdate"
    "componentWillUpdate"
    "render"
    "componentDidUpdate"
当父组件导致子组件重新渲染：当点击“父组件重新渲染，子组件re-render”按钮时(在父组件中改变与子组件无关的state)，打印结果如下

    "componentWillReceiveProps"
    "shouldComponentUpdate"
    "componentWillUpdate"
    "render"
    "componentDidUpdate"
当组件被卸载和销毁：打印结果如下：

    "componentWillUnmount"


#### 结语  
至此，我们已经很清楚的知道了React组件的生命周期，等到我们写组件的时候就会很清楚的知道代码该往哪里写，哪些地方不能setState等等




知道代码该往哪里写，哪些地方不能setState等等。大家可以在上述代码中按自己的意愿来修改，加深理解。
  文中难免有疏漏，望大家共同交流，批评指正。
