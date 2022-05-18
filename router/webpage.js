const { response } = require('express')
const exp =require('express')
const daouser = require('../model/entity')
const addressDb =require('../model/addressdb')
const hotelDb=require('../model/hotelDb')
const admindb=require('../model/adminDb')
const orders=require('../model/ordersDb')
const app=exp()
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const menuDb=require('../model/menuDb')
const passport = require('passport');
require('../JwtUtil/passport');
const cors=require('cors');
const token=require('../jwtTokens/tokens')
const order = require('../model/ordersDb')

app.use(cors())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))



require('dotenv').config()




app.get('/',(req,res)=>{
    res.send('Welcome to bites')
})

// tokenBuilder.authToken(req.userFound.sub)

app.post('/token', passport.authenticate('refresh', { session: false }), async (req, res) => {
    refreshTokenFromHeader = req.headers.authorization.split(' ')[1];
    const authToken = token.generateToken(req.user.sub)
    res.status(201).json({ Token: authToken })
})

app.get('/viewAll',passport.authenticate('jwt',{session : false}),async(req,res)=>{
    const viewAll = await daouser.findAll()
    res.send(viewAll);
})
// app.get('/data',(request,response)=>{
//     daouser.findAll()
//         .then(daouser=>{
//             response.send(daouser)
//         })
//         .catch(err=>{
//             throw err
//         })
// })

// app.post('/register',bodyParser.json(),postController.save)


app.post('/register', async(req,res) => {

    const {first_name, last_name, email, password} = req.body;

    const checkemail = (await daouser.findOne({ where: {email: email} }))? true:false;

    if(checkemail) {
        res.status(404).send("User exists !") 

    }
    else { 
        const hidepassword = await bcrypt.hash(password, 5);
        const user = await daouser.create({first_name:first_name, last_name:last_name, 
            email:email, password:hidepassword});
        res.status(200).send("Registered successfully... with ID: "+user.id);
    } 

})



app.post('/adminRegister', async(req,res) => {

    const {first_name, last_name, email, password} = req.body;

    const checkemail = (await admindb.findOne({ where: {email: email} }))? true:false;

    if(checkemail) {
        res.status(404).send("User exists !") }
    else { 
        const hidepassword = await bcrypt.hash(password, 5);
        const UserData = await admindb.create({first_name:first_name, last_name:last_name, 
            email:email, password:hidepassword});
        res.status(200).send("Registered successfully... with ID: "+UserData.id);


    } 

})

app.post('/orders',async(req,res) => {

    const {useraddress,userdetails,orderdetail,totalprice } = req.body;

        const userOrder = await order.create({useraddress:useraddress, userdetails:userdetails,orderdetail:orderdetail,totalprice:totalprice});
        res.status(200).send("ordered");
    

})

app.post('/addressDetail',async(req,res) => {

    const {door_number, street_name, area, city,pincode,phone_num} = req.body;

        const UserAddressData = await addressDb.create({door_number:door_number, street_name:street_name, 
            area:area, city:city ,pincode:pincode ,phone_num:phone_num });
        res.status(200).send("Registered with ID: "+UserAddressData.id);
    

})


app.get('/findAddress/:ID', async(req,res) => {
    const findAddress = await addressDb.findOne({ where: {id: req.params.ID} });
    if(findAddress!=null) {
        res.status(200).send(findAddress)
        console.log(findAddress)
    }
})

app.post('/login', async(req,res) => { 
    const {email, password}= req.body;
    const user = await daouser.findOne({where: {email: email}});
    if(user!=null) {
        bcrypt.compare(password, user.password).then(ValidUser => {
            if(ValidUser){
                // res.status(200).send({Token : token.generateToken(user)})
                // res.status(200).send({Token : token.refreshToken(user)})
                const authToken =token.generateToken(user)
                const refreshToken = token.refreshToken(user)
                return res.status(200).send({ Token: authToken, refreshToken: refreshToken })
            }

    else
        res.status(404).send('User not found !')    
        })
    }
})

app.post('/adminLogin', async(req,res) => { 
    const {email, password}= req.body;
    const user = await admindb.findOne({where: {email: email}});
    if(user!=null) {
        bcrypt.compare(password, user.password).then(ValidUser => {
            if(ValidUser){
                // res.status(200).send({Token : token.generateToken(user)})
                // res.status(200).send({Token : token.refreshToken(user)})
                const authToken =token.generateToken(user)
                const refreshToken = token.refreshToken(user)
                return res.status(200).send({ Token: authToken, refreshToken: refreshToken })
            }
    else
        res.status(404).send('User not found !')    
        })
    }
})

app.get('/getUserData/:mailId', async(req,res) => {
    const findUser = await daouser.findOne({ where: {email: req.params.mailId} });
    if(findUser!=null) {
        res.status(200).send(findUser)
    }
})


app.get('/viewUsers',passport.authenticate('jwt',{session : false}), async(req,res) => {
    // const {categoryId}= req.body;
    const checkId = (await daouser.findAll());

    if(checkId!=null) {
     res.send(checkId)
    //  console.log(checkId)
    }

})

app.get('/viewHotels',passport.authenticate('jwt',{session : false}), async(req,res) => {
    // const {categoryId}= req.body;
    const checkId = (await hotelDb.findAll());

    if(checkId!=null) {
     res.send(checkId)
    //  console.log(checkId)
    }

})


app.get('/hoteldata/:id',passport.authenticate('jwt',{session : false}), async(req,res) => {
    // const {categoryId}= req.body;
    const checkId = (await hotelDb.findAll({ where: {categoryId: req.params.id} }));

    if(checkId!=null) {
     res.send(checkId)
    //  console.log(checkId)
    }

})


app.post('/hoteldata/addhotel',passport.authenticate('jwt',{session : false}), async(req,res) => {

    const {hotelName,categoryId , categoryType} = req.body;

    const checkHotel = (await hotelDb.findOne({ where: {hotelName: hotelName} }))? true:false;

    if(checkHotel) {
        // const disp = await hotelDb.findAll();
        // res.send(disp);
    }
    else { 
        const UserData = await hotelDb.create({hotelName:hotelName, categoryId:categoryId, 
            categoryType:categoryType});
        const disp = await hotelDb.findAll();
        res.send(disp);
    } 

})

app.get('/hoteldata/delhotel/:id',passport.authenticate('jwt',{session : false}), async(req,res) => {

    

    const checkHotel = (await hotelDb.findOne({ where: {id: req.params.id} }));

    if(checkHotel!=null) {
        const UserData = await hotelDb.destroy({where : {hotelName:checkHotel.hotelName, categoryId:checkHotel.categoryId, 
            categoryType:checkHotel.categoryType}});
        // const disp=await hotelDb.findAll();
        // res.send(disp);

    }
     else { 
        // const disp=await hotelDb.findAll();

        //  res.send(disp);
     } 

})


app.post('/deluser/:id',passport.authenticate('jwt',{session : false}), async(req,res) => {

    

    const checkUser = (await daouser.findOne({ where: {id: req.params.id} }));
    const checkAdd = (await addressDb.findOne({ where: {id: req.params.id} }));

    if(checkUser!=null&&checkAdd!=null) {
        const UserData = await daouser.destroy({where : {first_name:checkUser.first_name, last_name:checkUser.last_name, 
            email:checkUser.email, password:checkUser.password}});
        const UserAdd = await addressDb.destroy({where : {door_number:checkAdd.door_number, street_name:checkAdd.street_name, 
            area:checkAdd.area, city:checkAdd.city ,pincode:checkAdd.pincode ,phone_num:checkAdd.phone_num }});
        // const disp=await hotelDb.findAll();
        // res.send(disp);

    }
     else { 
        // const disp=await hotelDb.findAll();

        //  res.send(disp);
     } 

})


app.get('/menu/:hotelName',passport.authenticate('jwt',{session : false}),async(req,res)=>{
    const findHotel=(await menuDb.findAll({where: {hotelName: req.params.hotelName} }));

    if(findHotel!=null)
    {
        res.send(findHotel)
    }
})


app.get('/menu/:hotelName/:dishes',passport.authenticate('jwt',{session : false}),async(req,res)=>{
    const findDishes=(await menuDb.findAll({where: {hotelName: req.params.hotelName , dishes:req.params.dishes} }));

    if(findDishes!=null)
    {
        res.send(findDishes)
    }
})


app.listen(9002,()=>{
    console.log('Server running in port 9002')
})