export const { createElement, createContext, useState, useEffect, useRef, Suspense, lazy } = window['React']
export const { render } = window['ReactDOM']
export const { createStore } = window['Redux']
export const { Provider, createDispatchHook, createSelectorHook, createStoreHook } = window['ReactRedux']
export const { Router, Route, Switch, Link } = window['Wouter']
export const styled = window['styled']

const htm = window.htm
export const html = htm.bind(createElement)

