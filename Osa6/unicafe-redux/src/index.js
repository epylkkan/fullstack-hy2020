
import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
    
    const good = () => {
        store.dispatch({
            type: 'GOOD'
        })
    }

    const neutral = () => {
        store.dispatch({
            type: 'OK'
        })
    }

    const bad = () => {
        store.dispatch({
            type: 'BAD'
        })
    }

    const reset = () => {
        store.dispatch({
            type: 'ZERO'
        })
    }

    return (
        <div>
            <button onClick={good}>good</button> 
            <button onClick={neutral}>neutral</button> 
            <button onClick={bad}>bad</button>
            <button onClick={reset}>zero all</button>
            <br></br>
            <br></br>
            <div>good {store.getState().good}</div>
            <div>neutral {store.getState().ok}</div>
            <div>bad {store.getState().bad}</div>
            
            <div>all {store.getState().all}</div>
            <div>average {store.getState().average}</div>
            <div>positive {100*store.getState().positive} % </div>
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }

renderApp()
store.subscribe(renderApp)

