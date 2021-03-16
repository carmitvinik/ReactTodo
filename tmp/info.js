/*
hooks
react new hooks apis give function components the ability to use local coponent state execute 
side effects and more.

react redux now offers a set of hook apis as an alternative to the existing 
connect() Higher order component.

these apis allow to subscribe to the redux store and dispatch actions
without having to wrap components with connect()

these hooks were first added in v 7.1.0

using hooks in a react redux app
================================

with connect() i can start wrapping entire app in <Provider> component
to make the store available throughout the component tree:

const store = createStore(rootReducer)
ReactDom.render(
    <Provider store={store}><App /> </Provider>, 
    document.getElementById('root')
    )
)

from there hooks can be imported from react redux apis.

useSelector()
=============

const result: any = useSelector(selector: Function, equalityFn?:Function)

Allows to extract data from redux store using selector function
&& selector function is pure function

the selector is approximately equivalent to the mapStateToProps arg to 
connect conceptually. the selector will be called with the entire Redux
Store state as its only argument.

The Selector will be run whenever the function conponent renders
(unless its reference hasnt changed since a previous render of the component so
    a cached result can be returned by the hook without re-running the selector).

useSelector() will also subscribe to the redux store and run 
the selector whenever an action is dispatched.

however, there are some differences between the selectors passed to useSelector()
and a mapState function:

[] the selector may return any value as a result, not just an object.
the return value of the selector will be used as the return value 
of the useSelector() hook.
[] When an action is dispatched , useSelector() will do a reference
comparison of the previous selector result value and the current result value.
if they are different, the component will be forced to re-render.
if they ara the same, the component willnt re render.
[] the selector function does not receive an ownProps argument.
However, props can beused through closure or curried selector.
[] extra care must be taken when using memoizing selectors
[] useSelector() uses strict === reference equality checks by default
not shallow equality.

there are potential edge cases with using props in selectors that
may cause errors. 

useSelector() can be called multiple times within a single function component.
each call to useSelector() creates an individual subscribtion to redux store.
because of the react update batching behavior used in react redux v7,
a dispatched action that causes multiple useSelector() in the 
same component to return new values should only result in 
a single re-render.

Equality comparisons and updates
================================
when function component renders, provided selector function is called and
return results by useSelector() hook.

however, when action dispatched to redux store, useSelector() only forces
a re render if the selector result is different.
the default comparison is strict === reference comparison.

this is defferent than connect() which uses shallow equality checks
on the results of mapState calls.

with mapState all fields returned in combined object.
never matter if it is referenced object or same.
connect just compard the fields.

with useSelector() returning new obj every time will always
force re-render by default.

if need to retrieve multiple values from the store:
[] call useSelector() multiple times,
[] use Reselect of similar library to create memoized selector
that returns multiple values in one object,
but return new object when one of the values changed.
[] use the shallowEqual function from react redux as the
equalityFn argument to useSelector like:

import { shallowEqual, useSelector } from 'react-redux';
//later:
const selectedData = useSelector(selectorReturningObject, shallowEqual)

the optional comparison function also enables using something like
lodash _.isEqual() 
or immutable.js
or immer

useSelector ex:
===============

basic usage:
===============
import React from 'react';
import {useSelector} from 'react-redux';

export const CounterComponent = () => {
    const counter = useSelector(state => state.counter);
    return <div>{counter}</div>
}

usingprops n closure to determin what to extract:
===================================================
import React fomr 'react'
import {useSelector} from 'react-redux'

export const TodoListItem = props => {
    const todo = useSelector(state = state.todo[props.id])
    return <div>{todo.text}</div>
}

using memoizing selectors
=========================
when using useSelector with an inline selector as shown 
a new instance of the selector is created when component rendered.
This works as long as the selector doesnt maintain any state.

memoizing selectors (created via createSelector from reselect)
have internal state.
therefor extra care 
typical usage:

import React from 'react'
import {useSelector} from 'react-redux'
import {createSelector} from 'reselect'

const selectNumOfDoneTodos = createSelector(
    state=>state.todos,
    todos => todos.filter(item => item.isDone).length
)

export const DoneTodosCounter = () => {
    const NumOfDoneTodos = useSelector(selectNumOfDoneTodos)
    return <div>{NumOfDoneTodos} </div>
}

export const App = () => {
    return (
        <>
        <DoneTodosCounter />
        </>
    )
}



selector depends on props:
==========================
import React from 'react'
import {createSelector} from 'reselect'
import {useSelector} from 'react-redux'

const selectNumOfTodosByValue = createSelector(
    state => state.todos,
    (_,isDone) => isDone,
    (tosod,isDone) => todos.filter(todo => todo.isDone === isDone).length
)

export const TodoCounterforValue = ({isDone}) => {
    const NumOfTodosWithValue = useSelector(state => {
        selectNumOfTodosByValue(state,isDone))
        return <div> {NumOfTodosWithValue} </div>
    }
}

export const App = () => {
    return(<><TodoComponentForValue /></>)
}



when selector is used in multiple component instance
and depands on props, ensure each instance has its own selector
==============================
...
i dont want

*/
