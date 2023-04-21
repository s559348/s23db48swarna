var Shirt = require('../models/shirt');
// List of all shirts
// List of all shirt
exports.shirt_list = async function (req, res) {
    try {
        theshirt = await Shirt.find();
        res.send(theshirt);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// exports.shirt_list = function(req, res) {
//  res.send('NOT IMPLEMENTED: shirt list');
// };
// for a specific shirt.
exports.shirt_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: shirt detail: ' + req.params.id);
};
// Handle shirt create on POST.
// exports.shirt_create_post = function(req, res) {
//  res.send('NOT IMPLEMENTED: shirt create POST');
// };
// Handle shirt delete form on DELETE.

// VIEWS
// Handle a show all view
exports.shirt_view_all_Page = async function (req, res) {
    try {
        theCostumes = await Shirt.find();
        res.render('shirt', { title: 'Shirt Search Results', results: theCostumes });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle shirt update form on PUT.
// exports.shirt_update_put = function (req, res) {
//     res.send('NOT IMPLEMENTED: shirt update PUT' + req.params.id);
// };
// Handle Costume create on POST.
exports.shirt_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Shirt();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.shirt_type = req.body.shirt_type;
    document.shirt_size = req.body.shirt_size;
    document.shirt_value = req.body.shirt_value;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Costume create on POST.
exports.shirt_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Shirt();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.shirt_type = req.body.shirt_type;
    document.shirt_size = req.body.shirt_size;
    document.shirt_value = req.body.shirt_value;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Costume.
exports.shirt_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Shirt.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};



// Handle Costume update form on PUT.
exports.shirt_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Shirt.findById(req.params.id)
        // Do updates of properties
        if (req.body.Shirt_type)
            toUpdate.Shirt_type = req.body.Shirt_type;
        if (req.Shirt.size) shirt_size = req.Shirt.size;
        if (req.Shirt.value) shirt_value = req.Shirt.value;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};

// Handle Costume delete on DELETE.

exports.shirt_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Shirt.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.shirt_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Shirt.findById(req.query.id)
        res.render('shirtdetail',
            { title: 'Shirt Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.shirt_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('shirtcreate', { title: 'Shirt Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


// Handle building the view for updating a costume.
// query provides the id
exports.shirt_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Shirt.findById(req.query.id)
        res.render('shirtupdate', { title: 'Shirt Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.shirt_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Shirt.findById(req.query.id)
        res.render('shirtdelete', {
            title: 'Shirt Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


