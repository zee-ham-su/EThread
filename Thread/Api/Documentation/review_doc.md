## API Description

- This API allows you to submit a new review for a product in the TechThreadsGhana e-commerce platform.

## Resource Description

- Submit Review
- This endpoint allows you to submit a new review for a product.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/reviews>
- Method: POST

## Parameters

- This endpoint requires the following parameters in the request body:

- productId (string): The ID of the product for which the review is being submitted.

- rating (number): The rating given to the product.(which must be between 1-5)
- comment (string): The comment or review text.

## Request Example

```json
{
    "productId": "6601c8d9ca8319e517afde03",
    "rating": 5,
    "comment": "This bag is my new favorite travel companion! It's stylish, spacious, and the print adds a fun pop of color to my outfits."
}
```

## Response Example and Schema

- Status: 201
- Content-Type: application/json

```json
{
    "product": "6601c8d9ca8319e517afde03",
    "rating": 5,
    "comment": "This bag is my new favorite travel companion! It's stylish, spacious, and the print adds a fun pop of color to my outfits.",
    "_id": "66049cab777f6d3fc763a5eb",
    "createdAt": "2024-03-27T22:24:43.942Z",
    "updatedAt": "2024-03-27T22:24:43.942Z",
    "__v": 0
}
```

## API Description

- This API allows you to retrieve review details for a specific product in the TechThreadsGhana e-commerce platform.

## Resource Description

- Get Reviews for Product
- This endpoint retrieves review details for a specific product.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/reviews/:productId>
- Method: GET

## Parameters

- productId (string): The ID of the product for which reviews are being retrieved.

## Response Example and Schema

- Status: 200
- Content-Type: application/json

```json
[
    {
        "_id": "6601da2fb886fb2c5f9393d7",
        "product": "6601c8d9ca8319e517afde03",
        "rating": 9,
        "comment": "This bag is my new favorite travel companion! It's stylish, spacious, and the print adds a fun pop of color to my outfits.",
        "createdAt": "2024-03-25T20:10:23.564Z",
        "updatedAt": "2024-03-25T20:10:23.564Z",
        "__v": 0
    },
    {
        "_id": "6601dbf1b886fb2c5f9393f7",
        "product": "6601c8d9ca8319e517afde03",
        "rating": 9,
        "comment": "This bag is my new favorite travel companion! It's stylish, spacious, and the print adds a fun pop of color to my outfits.",
        "createdAt": "2024-03-25T20:17:53.434Z",
        "updatedAt": "2024-03-25T20:17:53.434Z",
        "__v": 0
    },
    {
        "_id": "6601dc07b886fb2c5f939418",
        "product": "6601c8d9ca8319e517afde03",
        "rating": 9,
        "comment": "This bag is my new favorite travel companion! It's stylish, spacious, and the print adds a fun pop of color to my outfits.",
        "createdAt": "2024-03-25T20:18:15.068Z",
        "updatedAt": "2024-03-25T20:18:15.068Z",
        "__v": 0
    },
    // More review objects...
]
```

## Error Handling

- 400 Bad Request: If the request body is missing or invalid.
- 500 Internal Server Error: If there is a server error while processing the request.
