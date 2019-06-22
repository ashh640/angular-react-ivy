import React, { Component } from 'react';
import { render } from 'react-dom';
import { createReactComponent } from './app/adapter/adapter';
import { ProgressBarComponent } from './app/progress-bar/progress-bar.component';

export interface ProgressBarProps {
    value: number;
    valueChange: (value: number) => void;
}

export interface AppState {
    value: number;
}

export interface AppProps {}

const ProgressBar = createReactComponent<ProgressBarProps>('app-progress-bar', ProgressBarComponent);

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

render(<App />, document.querySelector('#root'));
