
var data_app = require('./applications');

exports.addRoutes = function(app,prefix) {

    app.get(prefix + '/applications',data_app.get);
    app.post(prefix + '/applications',data_app.post);

};
