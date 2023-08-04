const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

const ideas = [
    {
        id: 1,
        text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
        tag: 'Technology',
        username: 'TonyStark',
        date: '2022-01-02'
    },
    {
        id: 2,
        text: 'Milk cartons that turn a different color the older that your milk getting',
        tag: 'Inventions',
        username: 'SteveRogers',
        date: '2022-01-02'
    },
    {
        id: 3,
        text: 'ATM location app which lets you know where the closest ATM is and if it s in service',
        tag: 'Software',
        username: 'BruceBanner',
        date: '2022-01-02'
    }
]


//Get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({ success: true, data: ideas });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

//Get single idea
router.get('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);
    if (!idea) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
    }
    res.json({ success: true, data: idea });
});

//Add an idea
router.post('/', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10)
    }
    ideas.push(idea);
    console.log(idea);
    res.send({ success: true, data: idea });
})

// Update idea
router.put('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);
    if (!idea) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    res.json({ success: true, data: idea });
});

//Delete idea
router.delete('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);
    if (!idea) {
        return res.status(404).json({ success: false, error: 'Resource not found' });
    }
    ideas.forEach((idea, idx) => idea.id === +req.params.id && ideas.splice(idx, 1));

    res.json({ success: true, data: ideas });
});
module.exports = router;