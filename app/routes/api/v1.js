// library import
const config = require('./../../config/config');
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const async = require('async');

const router = express.Router();
const jsonParser = bodyParser.json();

const client = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

router.route('/')
    .get(function (req, res){
        client.keys('*', function (err, keys) {
            if (err) {
                return console.log(err);
            }
            if (keys) {
                async.map(keys, function(key, cb) {
                    client.get(key, function (error, value) {
                         if (error) return cb(error);
                         var todoItem = {};
                         todoItem['itemID']=key;
                         todoItem['itemMessage']=value;
                         cb(null, todoItem);
                     }); 
                 }, function (error, results) {
                    if (error) return console.log(error);
                    res.json({ items:results });
                 });
            }
        })
    })
    .post(function (req, res){
        for (const item of req.body.items) {
            client.set(item.itemID, item.itemMessage, function(err) {
                console.error(err);
            });
        }
        res.status(200).json({message: "batch update success"});
    })
    .put(function (req, res) {

    })
    .delete(function (req, res){
        for (const item of req.body) {
            client.del(item.itemID, function(err, results){
                if (err) {
                    return res.status(500).json({ errors: ['error while deleting']});
                }
            });
        }
        res.sendStatus(204);
    })

function lookupNoteItems(req, res, next) {
    const itemID = req.params.itemID

    client.get(itemID, function(err, results){
        if (err) {
            console.error(err);
            return res.status(500).json({ errors: ['Could not retrieve item']});
        }
        if (results === null) {
            return res.status(404).json({ errors: ['Note item not found']});
        } 
        req.noteItem = results
        next()
    })
}

router.route('/:itemID')
    .get(lookupNoteItems, function (req, res) {
        res.status(200).json({noteItem: req.noteItem});
    })
    .post(jsonParser, function (req, res) {
        const itemID = req.params.itemID
        if (!req.body) {
            return res.sendStatus(400)
        }
        console.log(req.body);
        client.get(itemID, function(err, results){
            if (err) {
                console.error(err);
                return res.status(500).json({ errors: ['Could not retrieve item']});
            }
            if (results === null) {
                client.set(itemID, req.body.noteItem, redis.print);
                return res.status(201).json({ message: ['successfully created']});
            } else {
                return res.status(400).json({ errors: ['item already exists']});
            }
        
        })        
    })
    .put(jsonParser, function (req, res){
        const itemID = req.params.itemID;
        if (!req.body) {
            return res.sendStatus(400)
        }
        client.get(itemID, function(err, results){
            if (err) {
                console.error(err);
                res.status(500)
                return res.json({ errors: ['Could not retrieve item']});
            }
            if (results === null) {
                client.set(itemID, req.body.noteItem)
                res.status(201)
                return res.json({ message: ['successfully created']});
            } else {
                client.set(itemID, req.body.noteItem )
                res.status(200)
                return res.json({ message: ['note Item changed']});
            }
        })  
    })
    .delete(lookupNoteItems, function (req, res){
        client.del(req.noteItems, function(err, results) {
            if (err) {
                res.status(500)
                return res.json({ errors: ['error while deleting']})
            }
        });
        res.sendStatus(204)        
    })

module.exports = router;
