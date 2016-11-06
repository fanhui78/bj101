'use strict';

const mongoose = require('mongooose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

module.exports = new LocalStrategy({
    usernameField: 'mobile',
    passwordField: 'password'
    },
    function(mobile,password,done){
        const options = {
            criteria:{ mobile:mobile},
            select:''
        };
        User.load(options,function(err,user){
            
        });

    }
);