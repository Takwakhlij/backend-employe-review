const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { authenticateJWT } = require('./middlewares/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewCycleRoutes = require('./routes/reviewCycleRoutes');
const selfAssessmentRoutes = require('./routes/selfAssessmentRoutes');
const managerAssessmentRoutes = require('./routes/managerAssessmentRoutes');
const session = require('express-session');
const passport = require('passport');
const login2 = require('./controllers/loginOAuthController');
const { logoutUser } = require('./controllers/logout');
require('dotenv').config();
require('./authgoogle'); 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(helmet());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware + Routes protégées
app.use('/users', authenticateJWT, userRoutes);
app.use('/review-cycles', authenticateJWT, reviewCycleRoutes);
app.use('/self-assessments', selfAssessmentRoutes);
app.use('/manager-assessments', authenticateJWT, managerAssessmentRoutes);


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
   res.send('<a href="/auth/google">Login with Google</a>');

    })
app.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/profile'); }
);

app.get('/profile', (req, res) => {
        if (!req.user) {
          return res.redirect('/');  
        }
        res.send(`Hello ${req.user.displayName}, welcome to your profile!`);

});    
// Routes publiques
app.use('/auth', authRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//SMS 
const smsRoutes = require('./routes/SMS');
app.use('/', smsRoutes);


