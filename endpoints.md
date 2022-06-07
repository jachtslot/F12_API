# Endpoints of the API

___

This file documents all the endpoints available for the `F12_API` API.

#### Quick Navigation:

___

##### Account
- [Get Account](#get-account)
- [Get All Accounts](#get-all-accounts)
- [Create Account](#create-account)

##### Role
- [Get All Roles](#get-all-roles)
- [Create Role](#create-role)

___

## Account

An `Account` is a representation of a normal `User` of the Mobile Application. An `Account` can be
part of 0 to many `Role`s.

### Get Account

Get a `Account` of a specific user by id.

___

#### Request

___

```txt
GET /account/{id}
```

- **id** uuid  
The `id` of the account.  
Example value: "60ef2e74-1edc-42f4-9a96-83a72d9aa225"

___

#### Responses

___

##### 201 Created

```json
{
  "id": "d3ae3a16-09bb-4cac-9c83-487bc8846b4c",
  "username": "example_user_name",
  "email_address": "example.email@gmail.com"
}
```

- **id** uuid  
The unique id of the account.
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

### Get All Accounts

Get all the accounts stored by the back-end.

___

#### Request

___

```text
GET /account
```

___

#### Responses

___

##### 200 OK

```json
[
  {
    "id": "d3ae3a16-09bb-4cac-9c83-487bc8846b4c",
    "username": "example_username",
    "email_address": "example.email@gmail.com"
  },
  {
    "id": "ecd2d4aa-d100-4c94-9eb1-b35121006476",
    "username": "example_username",
    "email_address": "example.email@gmail.com"
  }
]
```
- **id** uuid  
  The unique id of the account.
- **username** string  
  The username of the user.
- **email_address** string  
  The e-mail address used to send first-time information to.

---

#### Example request

___

```bash
curl --request GET \
  --url https://api/account \
  --header 'Authorization: ' \
  --header 'Content-Type: application/json'
```

### Create Account

Make a new `Account` resource.

___

#### Request

___

___

#### Responses

___

___

#### Example Request

___

## Role

### Get All Roles

Get all the `Role`s existing from the API.

___

#### Request

```text
GET /role
```

___

___
Responses

##### 200 OK

```json
[
  {
    "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
    "name": "Tuinman",
    "accounts": [
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "username": "tomas",
        "email_address": "email"
      },
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "username": "finn",
        "email_address": "email"
      },
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "username": "bali",
        "email_address": "email"
      }
    ],
    "permissions": [
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "gates": [
          0,
          1
        ],
        "day": 3,
        "begin_time": "14:30",
        "end_time": "16:30"
      },
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "gates": [
          0
        ],
        "day": 3,
        "begin_time": "18:30",
        "end_time": "23:30"
      }
    ]
  },
  {
    "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
    "name": "Schoonmaker",
    "accounts": [
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "username": "naam",
        "email_address": "email"
      },
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "username": "naam",
        "email_address": "email"
      },
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "username": "naam",
        "email_address": "email"
      }
    ],
    "permissions": [
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "gates": [
          0,
          1
        ],
        "day": 3,
        "begin_time": "14:30",
        "end_time": "16:30"
      },
      {
        "id": "4a35c99a-25a7-43d1-bdfe-72918d9be1ad",
        "gates": [
          0
        ],
        "day": 3,
        "begin_time": "18:30",
        "end_time": "23:30"
      }
    ]
  }
]
```

- **id** uuid  
  The id of a specific `Role`
- **name** string  
  The name of the `Role`  
- **accounts** list  
  The list with all the `Account`s that belong to that specific `Role`
  - **id** uuid  
    The id of the `Account`
  - **username** string  
    The username of the `Account`  
  - **email_address** string  
    The e-mail address used to send first-time information to.
- **permissions** list  
  All the `Permission`s that a `Role` has
  - **id** uuid  
    The unique id of the permission
  - **gates** list
    A list of gates that can be opened with this specific `Permission`
  - **day** number  
    Index of the current day (0=monday, 1=tuesday ... 5=saturday, 6=sunday)
  - **begin_time** string  
    The time on the `day` defining how late the permission *starts* in format 'HH:MM' (H=hours, M=minutes)
  - **end_time** string  
    The time on the `day` defining how late the permission *ends* in format 'HH:MM' (H=hours, M=minutes)

___

#### Example Request

___

```bash
curl --request GET \
  --url https://api/role \
  --header 'Authorization: ' \
  --header 'Content-Type: application/json'
```
___

### Create Role

Make a new `Role` resource.

___

#### Request

___

```text
POST /role
```

___

#### Responses

___

##### 201 Created

```text
The Role {name} is created
```

- **name**  
  The name of the role given
___

#### Example Request

___

```bash
curl --request POST \
  --url https://api/role \
  --header 'Authorization: ' \
  --header 'Content-Type: application/json'
  --data '
    {
      "name": "examplename"
    }
  '
```
