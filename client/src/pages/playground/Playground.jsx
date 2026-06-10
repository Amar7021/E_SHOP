import { Component } from "react";

export default class Playground extends Component {
    constructor(props) {
        super(props)
        this.state = { count: 0, post: 1 }
    }

    static defaultProps = {
        name: "John"
    }

    fetchProducts = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.state.post}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const result = await response.json()
            console.log({ result })
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    componentDidMount() {
        this.fetchProducts()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.post !== prevState.post) {
            this.fetchProducts()
        }
    }

    componentWillUnmount() {
        console.log("Component is unmounted")
    }

    increment = (increaseCount = 1) => {
        this.setState((prev) => ({ count: prev.count + increaseCount }))
    }

    render() {
        return <div>
            <h2>Hello: {this.props.name}</h2>
            <h2>Count: {this.state.count}</h2>
            <button type="button" onClick={() => this.increment()}>Increment by 1</button>
            <br />
            <button type="button" onClick={() => this.increment(2)}>Increment by 2</button>
            <br />
            <button type="button" onClick={() => this.setState(() => ({ count: 0 }))}>Reset</button>
            <br />
            <button type="button" onClick={() => this.setState((prev) => ({ ...prev, post: prev.post + 1 }))}>Set Posts</button>
        </div>
    }
}