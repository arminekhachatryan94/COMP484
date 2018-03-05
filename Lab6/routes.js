const express = require('express');
const exp = express();

const path = require('path');

exp.set('views', path.join(__dirname, 'views'));
exp.set('view engine', 'ejs');

// styles and images
exp.use('/styles', express.static('styles'));
exp.use(express.static('toppings'));
exp.use(express.static('flavors'));
exp.use('/images', express.static(path.join(__dirname, 'other')));

// routes
exp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './html/home.html'));
});

exp.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, './html/about.html'));
});

exp.get('/flavors', (req, res) => {
    res.sendFile(path.join(__dirname, './html/flavors.html'));
});

exp.get('/toppings', (req, res) => {
    res.sendFile(path.join(__dirname, './html/toppings.html'));
});

exp.get('/google', (req, res) => {
    res.redirect(301, 'https://www.google.com');
});

// ejs
exp.get('/special', (req, res) => {
    res.render('special', {
        'flavor': 'Raspberry',
        'topping': 'Fresh Sour Cherries'
    });
});

exp.get('/contact', (req, res) => {
    res.render('contact', {
        'phone': '1-800-YOG-WRLD',
        'email': 'yogurt@yogurtworld.com'
    });
});

// error page
exp.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './html/404.html'));
});

module.exports = exp;
