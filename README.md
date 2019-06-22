# Angular / React Ivy Proof of Concept

This is a simple proof of concept application that demonstrates how Ivy can used to bridge Angular components for use within React applications.

This is a very simple example with limited support for more advanced features such as content projection etc..

Currently an Angular component can be converted to a React component by calling the following function:

```typescript
const ProgressBar = createReactComponent<ProgressBarProps>('app-progress-bar', ProgressBarComponent);
```

Inputs and event emitters will automatically be hooked up to props with the same name.


### Instructions

1. Clone the repository
2. Run `npm install`
3. Run `ng serve` or `npm start` (if Angular CLI is not installed globally)
