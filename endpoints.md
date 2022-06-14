
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


##### Permission

- [Add Permission](#add-permission)

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

Make a new `Account` resource. After creating the account, the emailaddress will receive an email through AWS containing it's credentials

___  

#### Request
>POST  /account
#### body

``` json  
{  
   "email_address" : "validEmail@hotmail.com",  
   "hashed_password" : "SomePassword1234",  
   "username" : "someUsername"  
}  
```  
- **email_address** string,  
  `email_address`
  - Used to send credential mail to user
  - must be unique
- **hashed_password** string,
  - not actually hashed (might be changed in the future)
- **username** string,
  - displayed in web portal
___  

___  
#### Responses
___  
#### 201 Created
Succesfull call
```json   
{  
   "id": "e1cd5aa8-1427-4514-94f3-1daeac640163",  
  
   "username": "test123",  
  
   "email_address": "s112783887y933"  
}  
```  
#### 500 Internal Server Error
Email already in use
```json   
{  
   "duplicate key value violates unique constraint \"unique_email\" "  
}  
```  
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
  The name of the `Role` - **accounts** list    
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


## Permission
___

### Add Permission
Adds a new `permission` to a role, that allows that role entry on specified timeslots.
___
#### Request
```text 
POST /privilege
```
#### body
``` json
{
	"role_id" : "909b9fb6-2604-42f6-814a-eecb96beeb65",
	"privilege_id" : 1,
	"day" : 5,
	"begin_time" : 1200,
	"end_time" : 1600
}
```
- **role_id** string,
  - references the role_id. Must exist in database before adding permission.
- **privilege_id** numeric,
  - Represents the gate(s) that the role is allowed to access, related to this permission.
  - Must be a number between 1 and 3
    - 1 = Inner Gate
    - 2 = Outer gate
    - 3 = Both gates
- **day** numeric,
  - Represents the day of the week, that the user can access the estate.
    - 0 = Monday
    - 1 = Tuesday
    - 2 = Wednesday
    - ...
    - 6 = Sunday
- **begin_time**  & **end_time** numeric,
  - Represents the window where user is allowed access.
  - Begin time must be lower than end time.
  - Represented in HHMM format.

___

#### Responses

##### 200 OK
```json 
{
	"id": "21ef93f4-e253-402c-b535-7b86196a2611",
	"role_id": "699d9667-514d-46d4-9ef1-72ca8558de75",
	"privilege_id": 2,
	"day": 3,
	"begin_time": 1699,
	"end_time": 1600
}
```

