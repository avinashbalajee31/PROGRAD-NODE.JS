const passport = require('passport')
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const daouser = require('../model/entity')
require('dotenv').config();

passport.use('jwt',new JWTStrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.secret
},async (jwtPayload,done)=>{
    return await daouser.findOne({where:{id:jwtPayload.sub}})
                .then(daouser=>{
                    return done(null,jwtPayload);
                })
                .catch(err=>{
                    return done(err);
                });
    }
))



passport.use('refresh',new JWTStrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.secret
},async (jwtPayload,done)=>{
    return await daouser.findOne({where:{id:jwtPayload.sub}})
                .then(daouser=>{
                    return done(null,jwtPayload);
                })
                .catch(err=>{
                    return done(err);
                });
    }
))


module.exports = passport;