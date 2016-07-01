## Interactions ##
### Creating a Person Entity ###
`POST localhost:8080/persons`

Body:

```json
{
  "firstName": "Calvin",
  "lastName": "Fer",
  "studentId": "XYZ",
  "gender": "Male"
}
```


## Creating the backing table ##
```javascript
var params = {
    TableName: 'persons',
    KeySchema: [ 
        // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'personId',
            KeyType: 'HASH',
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'personId',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 10000, 
        WriteCapacityUnits: 10000, 
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```