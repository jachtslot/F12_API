# Endpoints of the API
___
You can use this file to discover the endpoints available for the `F12_API` API.

#### Quick Navigation:
___

[Get Account](#get-account)  
[Create Account](#create-account)

___

## Account
An `Account` is a representation of a normal `User` of the Mobile Application. An `Account` can be
part of 0 to many `Role`s.

### Get Account
Get a `Account` of a specific user by id.
___
#### Request
___

> GET /account/{id}

- **id** uuid  
The `id` of the account.  
Example value: "60ef2e74-1edc-42f4-9a96-83a72d9aa225"

___
#### Responses
___

##### 200 OK
```json
{
  "id": "d3ae3a16-09bb-4cac-9c83-487bc8846b4c",
  "username": "example_user_name",
  "email_address": "example.email@gmail.com"
}
```

- **username** string  
The username of the user.
- **email_address** string  
The e-mail address used to send first-time information to.

---
##### 404 Resource Not Found

Will return if the specified `id` was not found inside the database.

```text
The Account with id: {id} was not found.
```

- **id** string  
The `id` specified by the client.  
Example value: "60ef2e74-1edc-42f4-9a96-83a72d9aa225"
___


#### Example request
___

```bash
curl --request GET \
  --url https://api/accounts/60ef2e74-1edc-42f4-9a96-83a72d9aa225 \
  --header 'Authorization: ' \
  --header 'Content-Type: application/json'
```

### Create Account

Make a new `Account` resource.

___
Request
___

___
Responses
___

___
Example Request
___