// Controller - All CRUD
// Making queries to DB using model
const Author = require("../models/authors.model");


//Create
module.exports.createNewAuthor = (req, res) => {
    Author.create(req.body)
        .then(newlyCreatedAuthor => res.json({author: newlyCreatedAuthor}))
        .catch(err => res.status(400).json(err));
}

// Read all
module.exports.findAllAuthors = (req, res) => {
    Author.find()
        .then(allAuthors => {
            console.log(allAuthors);
            res.json(allAuthors);
        })
        .catch(err => res.json({message: "Something went wrong", error: err}))
}

// Read one
module.exports.findOneAuthor = (req, res) => {
    Author.findOne({_id: req.params.id})
        .then(oneAuthor => res.json({ author: oneAuthor}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
}

// Update one
module.exports.updateOneAuthor = (req, res) => {
    Author.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(updatedAuthor => res.json({author: updatedAuthor}))
        .catch(err => res.status(400).json(err));
}

// Delete one
module.exports.deleteAuthor = (req, res) => {
    console.log(req.params);
    Author.deleteOne({_id: req.params.id})
        .then(result => res.json({result: result}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
}