# Angular / React Ivy Proof of Concept

This is a simple proof of concept application that demonstrates how Ivy can used to bridge Angular components for use within React applications.

<img width="300" src="https://github.com/ashh640/angular-react-ivy/blob/master/Clip.gif?raw=true">

This is a very simple example with limited support for more advanced features such as content projection etc..

Currently an Angular component can be converted to a React component by calling the following function:

```typescript
const ProgressBar = createReactComponent<ProgressBarProps>('app-progress-bar', ProgressBarComponent);
```

Inputs and event emitters will automatically be hooked up to props with the same name.

The application code is as follows:

```typescript
class App extends Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = { value: 50 };
    }

    render(): JSX.Element[] {
        return [
            <p>Angular Progress Bar:</p>,

            <ProgressBar
                value={this.state.value}
                valueChange={value => this.setState({ value })}>
            </ProgressBar>,

            <p>React Input:</p>,

            <input
                value={this.state.value}
                onChange={event => this.setState({ value: +event.target.value })}>
            </input>
        ];
    }
}
```

***Not following many React best practices, just for illustrative purposes***


### Instructions

1. Clone the repository
2. Run `npm install`
3. Run `ng serve` or `npm start` (if Angular CLI is not installed globally)
