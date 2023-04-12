var University = require('../models/University');
// List of all university
exports.university_list = async function(req, res) {
    try{
        theUniversity = await University.find();
        res.send(theUniversity);
        }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
};
// for a specific university.
exports.university_detail = function(req, res) {
res.send('NOT IMPLEMENTED: university detail: ' + req.params.id);
};
// Handle university create on POST.
exports.university_create_post = async function(req, res) {
    console.log(req.body)
    let document = new University();
    document.University_name = req.body.University_name;
    document.City = req.body.City;
    document.Students = req.body.Students;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
};

// Handle university delete form on DELETE.
exports.university_delete = function(req, res) {
res.send('NOT IMPLEMENTED: university delete DELETE ' + req.params.id);
};
// Handle university update form on PUT.
exports.university_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: university update PUT' + req.params.id);
};


// VIEWS
// Handle a show all view
exports.University_view_all_Page = async function(req, res) {
    try{
    theUniversity = await University.find();
    res.render('University', { title: 'University Search Results', results: theUniversity });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

// for a specific flower.
exports.University_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await University.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };

// Handle flower update form on PUT.
exports.University_update_put = async function(req, res) {
 console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await University.findById( req.params.id)
 // Do updates of properties
 if(req.body.University_name)
 toUpdate.University_name = req.body.University_name;
 if(req.body.City) toUpdate.City = req.body.City;
 if(req.body.Students) toUpdate.Students = req.body.Students;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
 }
};

// Handle a show one view with id specified by query
exports.University_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await University.findById( req.query.id)
    res.render('Universitydetail',
   { title: 'University Details', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.University_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('UniversityCreate', { title: 'University Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };   

   // Handle building the view for updating a costume.
// query provides the id
exports.University_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await University.findById(req.query.id)
    res.render('UniversityUpdate', { title: 'University Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle a delete one view with id from query
exports.University_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await University.findById(req.query.id)
    res.render('UniversityDelete', { title: 'University Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
};