// app/routes.js
// expose the routes to our app with module.exports
module.exports = function(app, express, passport) {

    // application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendFile('index.html', { root: __dirname }); // load the single view file (angular will handle the page changes on the front-end)
    });

    require('./ClientRouter')(app, passport);
    require('./ContratRouter')(app, passport);
    require('./FactureRouter')(app, passport);
    require('./UserRouter')(app, passport, express);
    require('./VoitureRouter')(app, passport);

};
