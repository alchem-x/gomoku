const htm = window.htm
const { createElement, useState, useEffect } = window.React
const { render } = window.ReactDOM
const styled = window.styled

const html = htm.bind(createElement)

export {
    html,
    styled,
    render,
    useState,
    useEffect,
    createElement,
}
