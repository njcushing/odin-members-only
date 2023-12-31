require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const path = require("path");
const logger = require("morgan");
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");

const User = require("./models/user");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const signinRouter = require("./routes/signin");
const signoutRouter = require("./routes/signout");
const newmessageRouter = require("./routes/newmessage");
const deletemessageRouter = require("./routes/deletemessage");
const membershipRouter = require("./routes/membership");
const administratorRouter = require("./routes/administrator");

const app = express();

const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
});
app.use(limiter);

app.use(helmet());

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Try to find user credentials in database
passport.use(
    new LocalStrategy(async (email, password, done) => {
        try {
            // Match user
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, {
                    message: "Email address not found",
                });
            }
            // If user found, match hashed password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

// Manage user session
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "cats", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());

app.use(compression());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRouter);
app.use("/sign-in", signinRouter);
app.use("/sign-up", signupRouter);
app.use("/sign-out", signoutRouter);
app.use("/new-message", newmessageRouter);
app.use("/delete-message", deletemessageRouter);
app.use("/membership", membershipRouter);
app.use("/administrator", administratorRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
