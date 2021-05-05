const express = require("express");
const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

const jwtGenerator = require("../utils/jwtTokenGen");
const authorization = require("../middleware/authorize");

router.post('/register', async (req, res)=>{
   try{
        const {name, email, phone, country, country_code, password} = req.body;
        const user = await pool.query("SELECT * FROM customers WHERE cust_email = $1", [
            email
        ]);
        if(user.rows.length>0){
            return res.status(401).json("An account is already exists!");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPass = await bcrypt.hash(password, salt);
        
        const newUser = await pool.query("INSERT INTO customers(cust_name, cust_pass, cust_country, cust_email, cust_phone, cust_cntcode) VALUES( $1, $2, $3, $4, $5, $6 ) RETURNING *",[
            name, bcryptPass, country, email, phone, country_code
        ]);

        const token = jwtGenerator(newUser.rows[0].cust_id);
        res.json({token});
   } catch(err){
       res.status(500).send('Internal Server Issue');
   }
});

router.post("/login", async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await pool.query("SELECT * FROM customers WHERE cust_email = $1",[
            email
        ]);
        if(user.rows.length==0){
            res.status(404).json("Customer not found");
        }

        const validate = await bcrypt.compare(password, user.rows[0].cust_pass);
        if(!validate){
            res.status(401).json("Invalid Password");
        }

        const userId = user.rows[0].cust_id;
        const token = jwtGenerator(userId);
        res.json({userId, token});
    }catch(err){
        res.status(500).send('Internal Server Issue')
    }
});

router.get("/verify", authorization, (req, res)=>{
    try{
        res.json(true);
    } catch(err){
        res.send('Server Issue');
    }
});

module.exports = router;