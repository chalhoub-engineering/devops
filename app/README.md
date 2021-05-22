# todo-api

## This is a simple app for rectuimtment purposes

## How to run
```
# start server locally
npm i
docker-compose up
```

## How to test
Install [Postman](https://www.getpostman.com/)


## API endpoints

HTTP route prefix : http://localhost:3000/api/v1/

### API endpoints summary
Route      | Method | Description
-----------|--------|--------------------
/     | GET    | read all items
/     | POST   | batch update/create items (idempotent)
/     | DELETE | batch delete items (idempotent)
/:id | GET    | read item
/:id | POST   | create item. (update not possible)
/:id | PUT    | update item. (creation not possible) 
/:id | DELETE | delete item

### GET http://localhost:3000/api/v1/

##### HTTP Request Body Example
N/A

##### HTTP Response Body Example
```javascript
{
  "items" : [
    { 
      "itemID" : "1",
      "itemMessage" : "item 1 message"
    },
    {
      "itemID" : "2",
      "itemMessage" : "item 2 message"
    }
  ]
}
```

### POST http://localhost:3000/api/v1/
##### HTTP Request Body Example

```javascript 
{
  "items" : [
    { 
      "itemID" : "1",
      "itemMessage" : "item 1 message"
    },
    {
      "itemID" : "2",
      "itemMessage" : "item 2 message"
    }
  ]
}

```

##### HTTP Response Body Example
```javascript


```

### DELETE http://localhost:3000/api/v1/
##### HTTP Request Body Example

```javascript 
{
  "items" : [
    { "itemID" : "1"},
    { "itemID" : "2"}
  ]
}
```


##### HTTP Response Body Example
```javascript

```

### GET http://localhost:3000/api/v1/:itemID
##### HTTP Request Body Example
N/A

##### HTTP Response Body Example
```javascript
{
  "itemID" : "2",
  "itemMessage" : "item 2 message"
}
```

### POST http://localhost:3000/api/v1/:itemID
##### HTTP Request Body Example
```javascript 
{
  "itemID" : "2",
  "itemMessage" : "item 2 message"
}
```

##### HTTP Response Body Example
```javascript


```

### PUT http://localhost:3000/api/v1/:itemID
##### HTTP Request Body Example
```javascript 
{
  "itemID" : "2",
  "itemMessage" : "item 2 updated message"
}
```

##### HTTP Response Body Example
```javascript


```
### DELETE http://localhost:3000/api/v1/:itemID
