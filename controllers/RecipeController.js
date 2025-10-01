const getAllRecipe = (req, res) => {
    res.status(200).json({ message: 'Here is all the recipe we can find' });
}

const createRecipe = (req, res) => {
    res.status(200).json({ message: 'Added recipe successful' });
}

const updateRecipe = (req, res) => {
    res.status(200).json({ message: `Update successful for recipe ${req.params.id}` });
}

const deleteRecipe = (req, res) => {
    res.status(200).json({ message: `Delete successful for recipe ${req.params.id}`});
}

module.exports = {
    getAllRecipe, createRecipe, updateRecipe, deleteRecipe
}   