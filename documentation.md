# API Documentation

## Resource Endpoints

1. [Auth](#Auth-Resource)
2. [User](#User-Resource)
3. [Role](#Role-Resource)
4. [Group](#Group-Resource)
5. [Collection](#Collection-Resource)
6. [Item](#Item-Resource)

## General Resource Information

1. All resources except the `Auth` and `SignUp` resource require a user's token to be included in the request headers `{Authorization: <token>`. This token can be generated on a per-user basis from the [Auth Resource](#Auth-Resource)
2. All resources which return objects (with the execption of the `Auth` resource) return the `createdAt` and `updatedAt` timestamps of the respective resource
3. The database is pre-populated with users and other resource data to begin with:
    * Global Manager
        * email: `global_manager@example.com`
        * password: `hello123`
    * Manger of a single group
        * email: `manager_g1@example.com`
        * password: `hello123`
    * Regular user of a single group
        * email: `regular_g1@example.com`
        * password: `hello123`

### Auth Resource

A resource used to retrieve a valid user's token

#### POST

Path: `/auth/login/`

#### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|email(`str`)|yes|email of the user|
|password(`str`)|yes|password of the user|

#### Response Body

On a `200 OK` response only

|Name|Required|Description|
|:-------------|:-------------|:-----|
|token(`str`)|yes|the unique token authenticating the user|

---

### User Resource

#### GET

Path: `/user/`, `/user/:id`

##### Response Body

On a `200 OK` response only. Returns an array of User Objects if `:id` is not provided. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the user's ID|
|email(`str`)|yes|the user's email|
|password(`str`)|yes|the user's hashed password|

#### POST

Path: `/user/`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|email(`str`)|yes|the user's email|
|password(`str`)|yes|the user's hashed password|

##### Response Body

On a `201 CREATED` response only. Returns the newly created User Objects. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the user's ID|
|email(`str`)|yes|the user's email|
|password(`str`)|yes|the user's hashed password|

#### PUT

Path: `/user/:id`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|email(`str`)|yes|the user's email|
|password(`str`)|yes|the user's hashed password|

##### Response Body

On a `201 CREATED` response only. Returns the newly created User Objects. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the user's ID|
|email(`str`)|yes|the user's email|
|password(`str`)|yes|the user's hashed password|

#### DELETE

Path: `/user/:id`

##### Response Body

Return a `204 NO CONTENT` response if the user is successfully deleted. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

---

### Role Resource

#### GET

Path: `/role/`, `/role/:id`

##### Response Body

On a `200 OK` response only. Returns an array of Role Objects if `:id` is not provided. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the role's ID|
|role(`str`)|yes|the name of the role|
|groupId(`str`)|yes|the ID of the group the role belongs to. `null` if the role is a `global manager`|

#### POST

Path: `/role/`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|role(`str`)|yes|the name of the role|
|groupId(`str`)|yes|the ID of the group the role belongs to|

##### Response Body

On a `201 CREATED` response only. Returns the newly created Role Objects. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the role's ID|
|role(`str`)|yes|the name of the role|
|groupId(`str`)|yes|the ID of the group the role belongs to. `null` if the role is a `global manager`|

#### PUT

Path: `/role/:id`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|role(`str`)|yes|the name of the role|

##### Response Body

On a `201 CREATED` response only. Returns the newly created Role Objects. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|role(`str`)|yes|the name of the role|

#### DELETE

Path: `/role/:id`

##### Response Body

Returns a `204 NO CONTENT` response if the role is successfully deleted. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource.

---

### Group Resource

#### GET

Path: `/group/`, `/group/:id`

##### Response Body

On a `200 OK` response only. Returns an array of Group Objects if `:id` is not provided. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the group's ID|
|name(`str`)|yes|the name of the group|

#### POST

Path: `/group/`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|name(`str`)|yes|the name of the group|

##### Response Body

On a `201 CREATED` response only. Returns the newly created Group Objects. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the group's ID|
|name(`str`)|yes|the name of the group|

#### PUT

Path: `/group/:id`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|name(`str`)|yes|the name of the group|

##### Response Body

On a `201 CREATED` response only. Returns the newly created Group Objects. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the group's ID|
|name(`str`)|yes|the name of the group|

#### DELETE

Path: `/group/:id`

##### Response Body

Returns a `204 NO CONTENT` response if the group is successfully deleted. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource.

---

### Collection Resource

#### GET

Path: `/collection/`, `/collection/:id`

##### Response Body

On a `200 OK` response only. Returns an array of Collection Objects if `:id` is not provided. Returns a `403 FORBIDDEN` if the collection is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the collection's ID|
|name(`str`)|yes|the name of the collection|
|groupId(`str`)|yes|the ID of the group the collection belongs to|

#### POST

Path: `/collection/`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|name(`str`)|yes|the name of the collection|
|groupId(`str`)|yes|the ID of the group the collection belongs to|

##### Response Body

On a `201 CREATED` response only. Returns the newly created Collection Objects. Returns a `403 FORBIDDEN` if the collection is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the collection's ID|
|name(`str`)|yes|the name of the collection|
|groupId(`str`)|yes|the ID of the group the collection belongs to|

#### PUT

Path: `/collection/:id`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|name(`str`)|yes|the name of the collection|

##### Response Body

On a `201 CREATED` response only. Returns the newly created Collection Objects. Returns a `403 FORBIDDEN` if the collection is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|name(`str`)|yes|the name of the collection|

#### DELETE

Path: `/collection/:id`

##### Response Body

Returns a `204 NO CONTENT` response if the collection is successfully deleted. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource.

---

### Item Resource

#### GET

Path: `/item/`, `/item/:id`

##### Response Body

On a `200 OK` response only. Returns an array of Item Objects if `:id` is not provided. Returns a `403 FORBIDDEN` if the item is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the item's ID|
|name(`str`)|yes|the name of the item|
|collectionId(`str`)|yes|the ID of the collection the item belongs to|

#### POST

Path: `/item/`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|name(`str`)|yes|the name of the item|
|collectionId(`str`)|yes|the ID of the collection the item belongs to|

##### Response Body

On a `201 CREATED` response only. Returns the newly created Item Objects. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|id(`int`)|yes|the item's ID|
|name(`str`)|yes|the name of the item|
|collectionId(`str`)|yes|the ID of the collection the item belongs to|

#### PUT

Path: `/item/:id`

##### Request Body

|Name|Required|Description|
|:-------------|:-------------|:-----|
|name(`str`)|yes|the name of the item|

##### Response Body

On a `201 CREATED` response only. Returns the newly created Item Objects. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource

|Name|Required|Description|
|:-------------|:-------------|:-----|
|name(`str`)|yes|the name of the item|

#### DELETE

Path: `/item/:id`

##### Response Body

Returns a `204 NO CONTENT` response if the item is successfully deleted. Returns a `403 FORBIDDEN` if the user is not authorized to interact with this resource.

---
