## API Description

- This API allows you to manage products in the TechThreadsGhana e-commerce platform.

## Resource Description

- Add Product
- This endpoint allows you to add a new product to the database.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/products>
- Method: POST

## Parameters

- name (str): The name of the product.
- description (str): The description of the product.
- price (str): The price of the product.
- quantity (str): The quantity of the product available.
- image (file): The image of the product.

## Request Example

 ```json
 {
    "name": "Handmade Print Fabric Bag",
    "description": "Artisan-crafted bag showcasing vibrant print fabric, combining style with traditional craftsmanship",
    "price": "20.99",
    "quantity": "4",
    "image": "public/images/1711578283781_handmade print fabric bag.webp"
}
```

## Response Example and Schema

- Status: 201
- Content-Type: application/json

```json
{
    "msg": "Product created successfully",
    "product": {
        "name": "Handmade Print Fabric Bag",
        "description": "Artisan-crafted bag showcasing vibrant print fabric, combining style with traditional craftsmanship",
        "price": 20.99,
        "image": "public/images/1711578283781_handmade print fabric bag.webp",
        "quantity": 4,
        "_id": "66049cab777f6d3fc763a5eb",
        "createdAt": "2024-03-27T22:24:43.942Z",
        "updatedAt": "2024-03-27T22:24:43.942Z",
        "__v": 0
    }
}
```

## API Description

- This API allows you to retrieve all products available in the TechThreadsGhana e-commerce platform.

## Resource Description

- Get All Products
- This endpoint retrieves all products from the database.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/products>
- Method: GET

## Parameters

- This endpoint does not require any parameters.

## Request Example

- This endpoint does not require a request body.

## Response Example and Schema

- Content-Type: application/json

```json
{
    [
    {
        "_id": "6601c681ca8319e517afddfc",
        "name": "Kente Cloth",
        "description": "Vibrant Ghanaian textile with intricate patterns, rich cultural significance, and historical importance.",
        "price": 70.85,
        "image": "public/images/1711392385728_kente cloth.jpg",
        "quantity": 5,
        "createdAt": "2024-03-25T18:46:25.790Z",
        "updatedAt": "2024-03-26T11:42:19.513Z",
        "__v": 0
    },
    {
        "_id": "6601c82dca8319e517afde00",
        "name": "African textile Print",
        "description": "Colorful fabric featuring unique patterns, often inspired by African culture and traditions",
        "price": 450.99,
        "image": "public/images/1711392813077_african cloth print.jpg",
        "quantity": 5,
        "createdAt": "2024-03-25T18:53:33.101Z",
        "updatedAt": "2024-03-25T18:53:33.101Z",
        "__v": 0
    },
    {
        "_id": "6601c8d9ca8319e517afde03",
        "name": "Textile Print Traveling Bag ",
        "description": "Stylish and durable bag adorned with vibrant African-inspired textile prints, perfect for travels",
        "price": 12.99,
        "image": "public/images/1711392985324_textile print traveling bag.jpg",
        "quantity": 7,
        "createdAt": "2024-03-25T18:56:25.329Z",
        "updatedAt": "2024-03-25T18:56:25.329Z",
        "__v": 0
    },
    {
        "_id": "6601c964ca8319e517afde05",
        "name": "Handmade Print Fabric Bag",
        "description": "Artisan-crafted bag showcasing vibrant print fabric, combining style with traditional craftsmanship",
        "price": 20.99,
        "image": "public/images/1711393124841_handmade print fabric bag.webp",
        "quantity": 4,
        "createdAt": "2024-03-25T18:58:44.849Z",
        "updatedAt": "2024-03-25T18:58:44.849Z",
        "__v": 0
    },
        // More products...
    ]
}
```
