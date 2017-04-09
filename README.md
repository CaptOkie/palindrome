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

#### `200` Success

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
```

## Get One Message

### Request

| Method | URL |
| :--- | :--- |
| `GET` | `/msgs/:id` |

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `String` | The ID of the message |

### Response

#### `200` Success

```JavaScript
{
  "id" : String,
  "value" : String,
  "palindrome" : Boolean
}
```

#### `404` Not found

```JavaScript
{
  "error" : "Message not found"
}
```
## Create Message

### Request

| Method | URL |
| :--- | :--- |
| `POST` | `/msgs/` |

#### Body

```JavaScript
{
  "value" : String
}
```

### Response

#### `200` Success

```JavaScript
{
  "id" : String,
  "value" : String,
  "palindrome" : Boolean
}
```

#### `400` Illegal Value

```JavaScript
{
  "error" : "Illegal value"
}
```

#### `409` Duplicate message

```JavaScript
{
  "error" : "Duplicate message"
}
```

## Update Message

### Request

| Method | URL |
| :--- | :--- |
| `POST` | `/msgs/:id` |

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `String` | The ID of the message |


#### Body

```JavaScript
{
  "value" : String
}
```
### Response

#### `200` Success

```JavaScript
{
  "id" : String,
  "value" : String,
  "palindrome" : Boolean
}
```

#### `400` Illegal Value

```JavaScript
{
  "error" : "Illegal value"
}
```

#### `404` Not found

```JavaScript
{
  "error" : "Message not found"
}
```

#### `409` Duplicate message

```JavaScript
{
  "error" : "Duplicate message"
}
```
