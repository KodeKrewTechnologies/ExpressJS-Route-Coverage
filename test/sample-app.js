'use strict'

var express = require('express');

var app = express()

app.get('/', function (req, res) {
    res.json('Hello World');
});

app.get({ path: '/a', description: "GET Route from a." }, function (req, res) {
    res.json('Hello World get a');
});

app.post({ path: '/a', description: "Post Route to a." }, function (req, res) {
    res.json('Hello World post a');
});

app.get('/a/1/2', function (req, res) {
    res.json('Hello World');
});

app.get('/b', function (req, res) {
    res.json('Hello World');
});

app.get('/c', function (req, res) {
    res.json('Hello World');
});

module.exports = { app };