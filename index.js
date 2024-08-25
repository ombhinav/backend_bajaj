const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const allowedOrigins = ['*'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// POST route
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    if (!data) {
        return res.status(400).json({ is_success: false });
    }

    const numbers = data.filter(x => !isNaN(x) && x !== '');
    const alphabets = data.filter(x => /^[A-Za-z]$/.test(x));
    const lowercaseAlphabets = alphabets.filter(x => /^[a-z]$/.test(x));
    const highestLowercase = lowercaseAlphabets.length > 0 ? 
        [lowercaseAlphabets.reduce((a, b) => a > b ? a : b)] : [];

    res.json({
        is_success: true,
        user_id: "abhinav_garg_05122003",
        email: "abhinav.garg2021@vitstudent.ac.in",
        roll_number: "21BCE3310",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

// GET route
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
