## API Description

- This API allows you to create a checkout for a specific cart in the TechThreadsGhana e-commerce platform.

## Resource Description

- Create Checkout
- This endpoint creates a checkout for a specific cart.

## Endpoints and Methods

- URL: <https://ethread.onrender.com/api/checkouts/checkout>
- Method: POST

## Parameters

- This endpoint requires the following parameter in the request body:

- cartId (string): The ID of the cart for which the checkout is being created.

## Request Example

```json
{
    "cartId": "sampleCartId"
}
```

## Response Example and Schema

- Content-Type: application/json
- Status: 200

```json
{
    "success": true,
    "message": ""
}
```

## Error Handling

- 400 Bad Request: If the request body is missing or invalid.
- 500 Internal Server Error: If there is a server error while processing the request.
