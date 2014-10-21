var stores = {};
["user", "company", "operatingArea", "role"].forEach(function(location) {
    stores[location] = require("stores/" + location);  
});
module.exports = stores;