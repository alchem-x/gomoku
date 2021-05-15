const htm = window.htm
const { createElement, useState, useEffect, useRef } = window.React
const { render } = window.ReactDOM
const styled = window.styled

const html = htm.bind(createElement)

export {
    html,
    styled,
    render,
    useRef,
    useState,
    useEffect,
    createElement,
}
