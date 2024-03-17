const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const cors = require('cors');
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
// Check for database connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const recipesSchema = new mongoose.Schema({
    publisher: String,
    title: String,
    source_url: String,
    recipe_id: String,
    image_url: String,
    social_rank: Number,
    publisher_url: String,
    country: [String],
    category: [String],
    tags: [String]
});
const Recipes = mongoose.model('recipes', recipesSchema);

const recipeSchema = new mongoose.Schema({
    publisher: String,
    title: String,
    source_url: String,
    recipe_id: String,
    image_url: String,
    social_rank: Number,
    publisher_url: String,
    country: [String],
    category: [String],
    tags: [String],
    ingredients: [String],
    instructions: [String]
});
const Recipe = mongoose.model('recipes', recipesSchema);

app.use(express.json());
app.use(cors());
// Serve images using express.static middleware
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/recipes', async (req, res) => {
    try {
        const searchQuery = req.query.q;

        // Define the query conditions
        const conditions = searchQuery ? {
            $or: [
                { country: { $in: [searchQuery] } },
                { category: { $in: [searchQuery] } },
                { tags: { $in: [searchQuery] } }
            ]
        } : {};

        // Query all recipes from the database
        const recipes = await Recipes.find(conditions);
        const count = recipes.length; // Get the count of recipes
        const response = {
            count: count,
            recipes: recipes
        };
        res.json(response); // Send the response as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/get', async (req, res) => {
    try {
        const searchQuery = req.query.rId;

        // Define the query conditions
        const conditions = { recipe_id : searchQuery };

        // Query all recipes from the database
        const recipe = await Recipe.find(conditions);
        res.json({recipe: recipe[0]}); // Send the response as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})
