const htm = window.htm
const { createElement, createContext, useState, useEffect, useRef, Suspense, lazy } = window.React
const { render } = window.ReactDOM
const { createStore } = window.Redux
const { Provider, createDispatchHook, createSelectorHook, createStoreHook } = window.ReactRedux
const { HashRouter, Route, Switch, Redirect, Link } = window.ReactRouterDOM
const styled = window.styled

const html = htm.bind(createElement)

export {
    styled,
    html,
    // react
    lazy,
    render,
    Suspense,
    useRef,
    useState,
    useEffect,
    createContext,
    // react router
    HashRouter,
    Route,
    Link,
    Switch,
    Redirect,
    // redux
    createStore,
    Provider,
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
}
