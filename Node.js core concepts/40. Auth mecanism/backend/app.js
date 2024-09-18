require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use( cors() );
app.use( express.json() );

const users = [
    {
        id: "1",
        username: "adam",
        password: "adam123",
        isAdmin: true
    },
    {
        id: "2",
        username: "jane",
        password: "jane123",
        isAdmin: false
    }
];

let refreshTokens = [];

app.post( "/api/refresh", (req, res) => {
    console.log();
    const refreshToken = req.body.token;

    if( !refreshTokens.includes(refreshToken) ) {
        return res.status(403).json("Refresh token is not valid");
    }

    jwt.verify( refreshToken, process.env.refreshsecret, (err, user) => {
        err && console.log(err);
        // return the tokens that don't match the passed token by the user
        refreshTokens = refreshTokens.filter( (token) => token !== refreshToken );
        const newAccessToken = generateAccessToken( user );
        const newRefreshToken = generateRefreshToken( user );

        refreshTokens.push( newRefreshToken );
        res.status(200).json({accessToken: newAccessToken, refreshToken: newRefreshToken});
    } )
} );

app.post("/api/login", (req, res) => {
    const {username, password} = req.body;
    const user = users.find( u => {
        return u.username === username && u.password === password;
    } );

    if( user ) {
        const accessToken = generateAccessToken( user );
        const refreshToken = generateRefreshToken( user );

        refreshTokens.push( refreshToken );

        return res.status(200).json({username: user.username, accessToken, refreshToken});
    }
    else {
        res.status( 400 ).json( "Username or password incorrect" );
    }
});

const generateAccessToken = ( user ) => {
    return jwt.sign( 
        {id: user.id, isAdmin: user.isAdmin}, 
        process.env.accesssecret, 
        {expiresIn: process.env.jwtaccess_expire_time} 
    );
}

const generateRefreshToken = ( user ) => {
    return jwt.sign( 
        {id: user.id, isAdmin: user.isAdmin}, 
        process.env.refreshsecret, 
        {expiresIn: process.env.jwtrefresh_expire_time} 
    );
}

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.accesssecret, (err, user) => {
            if(err) {
                return res.status(403).send('Token is not valid');
            }

            req.user = user;
            next();
        });
    }
}

app.get( "/api/dashboard", verify, (req, res) => {
    res.send('Hi from dashboard');
});

app.listen(5000, () => console.log('listening on port 5000') );
