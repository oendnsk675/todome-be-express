# API Spec

## Authentication

All API must use this authentication except sign in and sign up

Request :
- Header :
    - x-api-key : "your secret api key"

## Get Tasks

Request :
- Method : GET
- Endpoint : `/api/tasks/{limit}/{start}`
- Header :
    - Accept: application/json
- Response :

```json 
{   
    "code" : "number",
    "status" : "string",
    "data" : [{
        "id_editorjs" : "int",
        "title" : "string",
        "list_name" : "string",
        "body" : "string",
        "icon" : "string",
        "isComplate" : "boolean",
        "interval" : null,
        "created_at" : "date",
        "updated_at" : "date",
    }]
}
```
note: pagination the tasks

## Get Contributor

Request :
- Method : GET
- Endpoint : `/api/task/contributor/{id_task}`
- Header :
    - Accept: application/json
- Response :

```json 
{   
    "code" : "number",
    "status" : "string",
    "data" : [
        {
            "id" : "int",
            "name" : "string",
            "email" : "string",
            "phone_number" : "string",
            "avatar" : "string"
        }
    ]
}
```

## Create Task

Request :
- Method : POST
- Endpoint : `/api/task`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "title" : "string",
    "list_id" : ["int"],
    "body" : "string",
    "icon" : "string",
    "isComplate" : "boolean",
    "interval" : null,
    "updated" : "date",
}
```

- Reponse :

```json
{
    "code" : "number",
    "status" : "string",
    "msg" : "string",
}
```

## Update Task

Request :
- Method : PUT
- Endpoint : `/api/tasks/{id_tasks}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "title" : "string",
    "list_name" : "string",
    "body" : "string",
    "icon" : "string",
    "isComplate" : "boolean",
    "updated_at" : "date",
}
```

- Reponse :

```json
{
    "code" : "number",
    "status" : "string",
    "msg" : "string",
}
```



## Delete Task

Request :
- Method : DELETE
- Endpoint : `/api/task/{id_tasks}`
- Header :
    - Accept: application/json

- Reponse :

```json
{
    "code" : "number",
    "status" : "string",
}
```



## Get User Info

Request :
- Method : GET
- Endpoint : `/api/user/{username}`
- Header :
    - Accept: application/json
- Response :

```json 
{   
    "code" : "number",
    "status" : "string",
    "data" : {
        "id" : "int",
        "name" : "string",
        "username" : "string",
        "email" : "string",
        "password" : "string",
        "phone_number" : "string",
        "avatar" : "string",
        "friends" : "number",
        "link_linkidn" : "string",
        "link_github" : "string",
        "link_facebook" : "string",
        "link_twiter" : "string",
    }
}
```

## Update User Info

Request :
- Method : PUT
- Endpoint : `/api/user/{username}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{   
    "code" : "number",
    "status" : "string",
    "data" : {
        "name" : "string",
        "username" : "string",
        "email" : "string",
        "password" : "string",
        "phone_number" : "string",
        "avatar" : "string",
        "friends" : "number",
        "link_linkidn" : "string",
        "link_github" : "string",
        "link_facebook" : "string",
        "link_twiter" : "string",
    }
}
```

- Reponse :

```json
{
    "code" : "number",
    "status" : "string",
}
```

## Unfollow User

Request :
- Method : PATCH
- Endpoint : `/api/user`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{   
    "data" : {
        "id_friend" : "int",
    }
}
```

- Reponse :

```json
{
    "code" : "number",
    "status" : "string",
    "msg" : "string",
}
```

## Get User Contact

Request :
- Method : GET
- Endpoint : `/api/user/contact`
- Header :
    - Accept: application/json
- Response :

```json 
{   
    "code" : "number",
    "status" : "string",
    "data" : [
        {
            "id" : "int",
            "name" : "string",
            "email" : "string",
            "phone_number" : "string",
            "avatar" : "string"
        }
    ]
}
```

## User Sign up

Request :
- Method : POST
- Endpoint : `/api/auth/user`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{   
    "code" : "number",
    "status" : "string",
    "data" : {
        "email" : "string",
        "email_verification" : "booean(default: false)",
        "username" : "string",
        "name" : "string",
        "phone" : "string",
        "password" : "string",
        "password_confirmation" : "string",
    }
}
```

- Reponse :

```json
{
    "code" : "number",
    "status" : "string",
    "msg" : "string",
}
```

## User Sign in

Request :
- Method : POST
- Endpoint : `/api/auth/user`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{   
    "code" : "number",
    "status" : "string",
    "data" : {
        "email" : "string",
        "password" : "string",
    }
}
```

- Reponse :

```json
{
    "code" : "number",
    "status" : "string",
    "key": "string",
}
```

