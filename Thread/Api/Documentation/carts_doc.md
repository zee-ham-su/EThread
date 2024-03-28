## API Description

- This API allows you to add items to a cart in the TechThreadsGhana e-commerce platform.

## Resource Description

- Add Items to Cart
- This endpoint adds items to a cart.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/carts/add>
- Method: POST

## Parameters

- This endpoint requires the following parameter in the request body:
- items (array): An array of objects containing the productId and quantity of each item to add to the cart.

## Request Example

```json
{
    "items": [
        {
            "productId": "6601c964ca8319e517afde05",
            "quantity": 4
        },
        {
            "productId": "6601c82dca8319e517afde00",
            "quantity": 5
        }
    ]
}
```

## Response Example and Schema

- Status: 201
- Content-Type: application/json

```json
{
    "totalPrice": 2338.91,
    "_id": "6604b1330213f6ad26c3cd60",
    "items": [
        {
            "product": "6601c964ca8319e517afde05",
            "quantity": 4,
            "_id": "6604b1340213f6ad26c3cd62"
        },
        {
            "product": "6601c82dca8319e517afde00",
            "quantity": 5,
            "_id": "6604b1340213f6ad26c3cd64"
        }
    ],
    "createdAt": "2024-03-27T23:52:20.177Z",
    "updatedAt": "2024-03-27T23:52:20.177Z",
    "__v": 0
}
```

## API Description

- This API allows you to retrieve details of all carts in the TechThreadsGhana e-commerce platform.

## Resource Description

- Get All Carts
- This endpoint retrieves details of all carts.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/carts/>
- Method: GET

## Response Example and Schema

- Status: 200
- Content-Type: application/json

```json
[
    {
        "_id": "6601cdfeb2cfff3907c2bacc",
        "totalPrice": 1114.53,
        "items": [
            {
                "product": "6601c82dca8319e517afde00",
                "quantity": 2,
                "_id": "6601cdfeb2cfff3907c2bace"
            },
            {
                "product": "6601c681ca8319e517afddfc",
                "quantity": 3,
                "_id": "6601cdfeb2cfff3907c2bad0"
            }
        ],
        "createdAt": "2024-03-25T19:18:22.813Z",
        "updatedAt": "2024-03-27T21:34:10.515Z",
        "__v": 0
    },
    {
        "_id": "6601ce1fb2cfff3907c2bad2",
        "totalPrice": 143.94,
        "items": [
            {
                "product": "6601c8d9ca8319e517afde03",
                "quantity": 4,
                "_id": "6601ce1fb2cfff3907c2bad4"
            },
            {
                "product": "6601c681ca8319e517afddfc",
                "quantity": 2,
                "_id": "6601ce1fb2cfff3907c2bad6"
            }
        ],
        "createdAt": "2024-03-25T19:18:55.683Z",
        "updatedAt": "2024-03-25T19:18:55.683Z",
        "__v": 0
    },
    // More cart objects...
]
``` 

## API Description

- This API allows you to update items in a cart in the TechThreadsGhana e-commerce platform.

## Resource Description

- Update Cart Items
- This endpoint updates items in a cart.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/carts/update>
- Method: PUT

## Parameters

- This endpoint requires the following parameters in the request body:

- cartId (string): The ID of the cart to update.
- itemId (string): The ID of the item within the cart to update.
- quantity (number): The updated quantity of the item.

## Request Example

```json
{
  "cartId": "6601cdfeb2cfff3907c2bacc",
  "itemId": "6601cdfeb2cfff3907c2bace",
  "quantity": 2
}
```

## Response Example and Schema

- Status: 200
- Content-Type: application/json

```json
{
    "_id": "6601cdfeb2cfff3907c2bacc",
    "totalPrice": 1114.53,
    "items": [
        {
            "product": "6601c82dca8319e517afde00",
            "quantity": 2,
            "_id": "6601cdfeb2cfff3907c2bace"
        },
        {
            "product": "6601c681ca8319e517afddfc",
            "quantity": 3,
            "_id": "6601cdfeb2cfff3907c2bad0"
        }
    ],
    "createdAt": "2024-03-25T19:18:22.813Z",
    "updatedAt": "2024-03-28T00:22:57.951Z",
    "__v": 0
}
```

## API Description

- This API allows you to delete a cart in the TechThreadsGhana e-commerce platform.

## Resource Description

- Delete Cart
- This endpoint deletes a cart.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/carts/:cartId>
- Method: DELETE

## Parameters

- cartId (string): The ID of the cart to delete.

## Response Example and Schema

- Status: 200
- Content-Type: application/json

```json
{
    "msg": "Cart deleted successfully"
}
```

## API Description

- This API allows you to remove a specific item from a cart in the TechThreadsGhana e-commerce platform.

## Resource Description

- Remove Item from Cart
- This endpoint removes a specific item from a cart.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/carts/:cartId/items/:itemId>
- Method: DELETE

## Parameters

- cartId (string): The ID of the cart from which the item will be removed.
- itemId (string): The ID of the item to remove from the cart.

## Response Example and Schema

- Status: 200
- Content-Type: application/json

```json
{
    "msg": "Item removed from cart successfully",
    "cart": {
        "_id": "6602b6207226c4690afb3589",
        "totalPrice": 235.5,
        "items": [
            {
                "product": "6602b6207226c4690afb35a1",
                "quantity": 3,
                "_id": "6602b6207226c4690afb35a3"
            },
            {
                "product": "6602b6207226c4690afb35a7",
                "quantity": 2,
                "_id": "6602b6207226c4690afb35a9"
            }
        ],
        "createdAt": "2024-03-27T20:36:00.277Z",
        "updatedAt": "2024-03-28T01:20:32.427Z",
        "__v": 0
    }
}
```

