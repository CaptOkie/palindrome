# Architecture

The architecture is based on [Spring Framework](https://projects.spring.io/spring-framework/) application architectures.
Controllers handle the actual request to the server, validate the request information, and delegate more specific logic
to services. For example, the `MessageCtrl` handles validating the request parameters and then immediately delegates logic to
the `MessageService`. Services handle the actual logic and deal with interacting with the data layer. For example, the
`MessageService` determines if a message is a palindrome and then saves the result to MongoDB.

# REST API

## Get All Messages

### Request

| Method | URL |
| :--- | :--- |
| `GET` | `/msgs/` |

### Response

#### Success `200`
```JavaScript
{
  "items" : [
    {
      "id" : String,
      "value" : String,
      "palindrome" : Boolean
    }
  ]
}
