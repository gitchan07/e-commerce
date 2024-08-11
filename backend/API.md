# API Endpoints

## Users Endpoints

1. **`{{base_url}}/users/testing`**
   - **Methods:** [GET]
   - **Description:** Test the connection to the database and fetch the first user (if any).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "message": "good connection",
       "dict": {
         "id": "int",
         "username": "string",
         "role": "string",
         "email": "string",
         "full_name": "string",
         "address": "string",
         "created_at": "datetime",
         "updated_at": "datetime"
       }
     }
     ```

2. **`{{base_url}}/users/register`**
   - **Methods:** [POST]
   - **Description:** Register a new user (either buyer or seller).
   - **Inputs:**
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string",
       "role": "string",
       "full_name": "string" (optional),
       "address": "string" (optional)
     }
     ```
   - **Output:** 
     ```json
     {
       "message": "User created successfully"
     }
     ```

3. **`{{base_url}}/users/login`**
   - **Methods:** [POST]
   - **Description:** Log in a user and return an authentication token.
   - **Inputs:**
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Output:** 
     ```json
     {
       "message": "Login successful",
       "access_token": "string"
     }
     ```

4. **`{{base_url}}/users/`**
   - **Methods:** [GET]
   - **Description:** Fetch all users (requires JWT authentication).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "message": "All users fetched successfully",
       "count": "int",
       "data": [
         {
           "id": "int",
           "username": "string",
           "role": "string",
           "email": "string",
           "full_name": "string",
           "address": "string",
           "created_at": "datetime",
           "updated_at": "datetime"
         }
       ]
     }
     ```

5. **`{{base_url}}/users/{user_id}`**
   - **Methods:** [GET]
   - **Description:** Fetch a specific user by their ID (requires JWT authentication).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "message": "User fetched successfully",
       "data": {
         "id": "int",
         "username": "string",
         "role": "string",
         "email": "string",
         "full_name": "string",
         "address": "string",
         "created_at": "datetime",
         "updated_at": "datetime"
       }
     }
     ```


6. **`{{base_url}}/users/{user_id}`**
   - **Methods:** [PUT]
   - **Description:** Update an existing user by their ID (requires JWT authentication).
   - **Inputs:**
     ```json
     {
       "username": "string" (optional),
       "email": "string" (optional),
       "password": "string" (optional),
       "role": "string" (optional),
       "full_name": "string" (optional),
       "address": "string" (optional)
     }
     ```
   - **Output:** 
     ```json
     {
       "message": "User updated successfully"
     }
     ```

7. **`{{base_url}}/users/{user_id}`**
   - **Methods:** [DELETE]
   - **Description:** Delete a user by their ID (requires JWT authentication).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "message": "User deleted successfully"
     }
     ```
## Category API Endpoints

1. **`{{base_url}}/categories/testing`**
   - **Methods:** [GET]
   - **Description:** Test the connection to the database and fetch the first category (if any).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "message": "good connection",
       "dict": {
         "id": "int",
         "name": "string",
         "created_at": "datetime",
         "updated_at": "datetime"
       }
     }
     ```

2. **`{{base_url}}/categories`**
   - **Methods:** [POST]
   - **Description:** Create a new category (requires JWT authentication).
   - **Inputs:**
     ```json
     {
       "name": "string"
     }
     ```
   - **Output:** 
     ```json
     {
       "message": "Category created successfully",
       "category": {
         "id": "int",
         "name": "string"
       }
     }
     ```

3. **`{{base_url}}/categories`**
   - **Methods:** [GET]
   - **Description:** Fetch all categories (requires JWT authentication).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "categories": [
         {
           "id": "int",
           "name": "string",
           "created_at": "datetime",
           "updated_at": "datetime"
         }
       ]
     }
     ```

4. **`{{base_url}}/categories/{category_id}`**
   - **Methods:** [GET]
   - **Description:** Fetch a specific category by its ID (requires JWT authentication).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "category": {
         "id": "int",
         "name": "string",
         "created_at": "datetime",
         "updated_at": "datetime"
       }
     }
     ```

5. **`{{base_url}}/categories/{category_id}`**
   - **Methods:** [PUT]
   - **Description:** Update an existing category by its ID (requires JWT authentication).
   - **Inputs:**
     ```json
     {
       "name": "string"
     }
     ```
   - **Output:** 
     ```json
     {
       "message": "Category updated successfully",
       "category": {
         "id": "int",
         "name": "string"
       }
     }
     ```

6. **`{{base_url}}/categories/{category_id}`**
   - **Methods:** [DELETE]
   - **Description:** Delete a category by its ID (requires JWT authentication).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "message": "Category deleted successfully"
     }
     ```

## Product API Endpoints

### General Endpoints

1. **`{{base_url}}/products/testing`**
   - **Methods:** [GET]
   - **Description:** Test the connection to the database and fetch all products (if any).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "message": "good connection",
       "products": [
         {
           "id": 1,
           "user_id": 10,
           "category_id": 5,
           "title": "Sample Product",
           "description": "This is a sample product.",
           "stock": 100,
           "price": "19.99",
           "created_at": "2024-08-10T10:00:00",
           "updated_at": "2024-08-10T10:00:00"
         }
       ]
     }
     ```

### Seller Endpoints

1. **`{{base_url}}/products/`**
   - **Methods:** [POST]
   - **Description:** Create a new product (Seller only). The `user_id` is automatically obtained from the JWT token.
   - **Inputs:**
     ```json
     {
       "category_id": 5,                // The ID of the category the product belongs to
       "title": "New Product",          // The title of the product
       "description": "A description",  // The description of the product (optional)
       "stock": 50,                     // The available stock for the product
       "price": "29.99",                // The price of the product
       "is_active": true,               // Whether the product is active (optional, defaults to true)
       "img_path": "static/upload_image/product_image.jpg"  // Path to the uploaded image
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Product added successfully"
     }
     ```

2. **`{{base_url}}/products/<int:id>`**
   - **Methods:** [PUT]
   - **Description:** Update an existing product by product ID (Seller only). The `user_id` is automatically obtained from the JWT token.
   - **Inputs:**
     ```json
     {
       "category_id": 5,                // The new category ID (if changing)
       "title": "Updated Product",      // The new title (if changing)
       "description": "Updated description", // The new description (if changing)
       "stock": 30,                     // The new stock quantity (if changing)
       "price": "25.99",                // The new price (if changing)
       "is_active": false,              // Whether the product is active (optional)
       "img_path": "static/upload_image/updated_product_image.jpg"  // Path to the new image (if changing)
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Product updated successfully"
     }
     ```

3. **`{{base_url}}/products/<int:id>`**
   - **Methods:** [DELETE]
   - **Description:** Delete an existing product by product ID (Seller only). The `user_id` is automatically obtained from the JWT token.
   - **Output:**
     ```json
     {
       "message": "Product deleted successfully"
     }
     ```

4. **`{{base_url}}/my-products`**
   - **Methods:** [GET]
   - **Description:** Get the seller's products, with optional filtering by name and category.
   - **Inputs:**
     - **Query Parameters:**
       - `category_id` (optional): Filter by category ID.
       - `title` (optional): Filter by product name.
       - `page` (optional): The page number for pagination (default: 1).
       - `per_page` (optional): The number of products per page (default: 10).
   - **Output:**
     ```json
     {
       "total": 100,                   // Total number of products
       "page": 1,                      // Current page
       "per_page": 10,                 // Products per page
       "products": [
         {
           "id": 1,
           "user_id": 10,
           "category_id": 5,
           "title": "Sample Product",
           "description": "This is a sample product.",
           "stock": 100,
           "price": "19.99",
           "created_at": "2024-08-10T10:00:00",
           "updated_at": "2024-08-10T10:00:00"
         }
       ]
     }
     ```

5. **`{{base_url}}/my-products/<int:id>`**
   - **Methods:** [GET]
   - **Description:** Get a specific product by its ID that belongs to the seller.
   - **Inputs:** None
   - **Output:**
     ```json
     {
       "id": 1,
       "user_id": 10,
       "category_id": 5,
       "title": "Sample Product",
       "description": "This is a sample product.",
       "stock": 100,
       "price": "19.99",
       "created_at": "2024-08-10T10:00:00",
       "updated_at": "2024-08-10T10:00:00"
     }
     ```

### Buyer Endpoints

1. **`{{base_url}}/products/`**
   - **Methods:** [GET]
   - **Description:** Get all products or search by category, product name, or product ID.
   - **Inputs:**
     - **Query Parameters:**
       - `category_id` (optional): Filter by category ID.
       - `title` (optional): Filter by product name.
       - `id` (optional): Filter by product ID.
       - `page` (optional): The page number for pagination (default: 1).
       - `per_page` (optional): The number of products per page (default: 10).
   - **Output:**
     ```json
     {
       "total": 100,                   // Total number of products
       "page": 1,                      // Current page
       "per_page": 10,                 // Products per page
       "products": [
         {
           "id": 1,
           "user_id": 10,
           "category_id": 5,
           "title": "Sample Product",
           "description": "This is a sample product.",
           "stock": 100,
           "price": "19.99",
           "created_at": "2024-08-10T10:00:00",
           "updated_at": "2024-08-10T10:00:00"
         }
       ]
     }
     ```

2. **`{{base_url}}/products/<int:id>`**
   - **Methods:** [GET]
   - **Description:** Get details of a specific product by product ID.
   - **Output:**
     ```json
     {
       "id": 1,
       "user_id": 10,
       "category_id": 5,
       "title": "Sample Product",
       "description": "This is a sample product.",
       "stock": 100,
       "price": "19.99",
       "created_at": "2024-08-10T10:00:00",
       "updated_at": "2024-08-10T10:00:00"
     }
     ```
Here's the `.md` documentation for the Promotions API based on the code you provided:

```markdown
## Promotions API Endpoints

1. Create Promotion
- **Endpoint:** `POST /promotions`
- **Description:** Create a new promotion.
- **Inputs:**
  ```json
  {
    "voucher_code": "string",       // The code for the promotion
    "value_discount": "decimal",    // The discount value associated with the promotion
    "description": "string"         // (Optional) A description of the promotion
  }
  ```
- **Output:**
  ```json
  {
    "message": "Promotion created successfully"
  }
  ```

 2. Get Promotions
- **Endpoint:** `GET /promotions`
- **Description:** Retrieve a list of promotions with optional filtering by voucher code.
- **Inputs:**
  - **Query Parameters:**
    - `voucher_code` (optional): Filter promotions by the voucher code.
- **Output:**
  ```json
  [
    {
      "id": "int",                    // Promotion ID
      "voucher_code": "string",       // The code for the promotion
      "value_discount": "decimal",    // The discount value associated with the promotion
      "description": "string",        // A description of the promotion
      "created_at": "datetime",       // Timestamp when the promotion was created
      "updated_at": "datetime"        // Timestamp when the promotion was last updated
    }
  ]
  ```

3. Get Promotion by ID
- **Endpoint:** `GET /promotions/{promotion_id}`
- **Description:** Retrieve details of a specific promotion by its ID.
- **Inputs:** None
- **Output:**
  ```json
  {
    "id": "int",                    // Promotion ID
    "voucher_code": "string",       // The code for the promotion
    "value_discount": "decimal",    // The discount value associated with the promotion
    "description": "string",        // A description of the promotion
    "created_at": "datetime",       // Timestamp when the promotion was created
    "updated_at": "datetime"        // Timestamp when the promotion was last updated
  }
  ```

 4. Update Promotion by ID
- **Endpoint:** `PUT /promotions/{promotion_id}`
- **Description:** Update details of an existing promotion by its ID.
- **Inputs:**
  ```json
  {
    "voucher_code": "string",       // (Optional) The new voucher code
    "value_discount": "decimal",    // (Optional) The new discount value
    "description": "string"         // (Optional) The new description
  }
  ```
- **Output:**
  ```json
  {
    "message": "Promotion updated successfully"
  }
  ```

 5. Delete Promotion by ID
- **Endpoint:** `DELETE /promotions/{promotion_id}`
- **Description:** Delete a specific promotion by its ID.
- **Inputs:** None
- **Output:**
  ```json
  {
    "message": "Promotion deleted successfully"
  }
  ```


## Transactions API Endpoints

### Buyer Endpoints

1. **`{{base_url}}/transactions`**
   - **Methods:** [POST]
   - **Description:** Create a new transaction for the buyer. The `transaction_number` is generated automatically.
   - **Inputs:**
     ```json
     {
       "user_id": 10   // The ID of the buyer creating the transaction
     }
     ```
   - **Output:**
     ```json
     {
       "id": 1,
       "user_id": 10,
       "transaction_number": "XG1234567890",
       "total_price_all_before": 0,
       "total_price_all_after": null,
       "transaction_status": "pending",
       "created_at": "2024-08-10T10:00:00",
       "updated_at": "2024-08-10T10:00:00"
     }
     ```

2. **`{{base_url}}/transactions/<int:id>`**
   - **Methods:** [DELETE]
   - **Description:** Delete a transaction by its ID. Only the owner of the transaction can delete it.
   - **Output:**
     ```json
     {
       "message": "Transaction deleted successfully"
     }
     ```

### Seller Endpoints

1. **`{{base_url}}/transactions`**
   - **Methods:** [GET]
   - **Description:** Get all transactions that involve the seller's products. Can be filtered by `product_id`.
   - **Inputs:**
     - **Query Parameters:**
       - `product_id` (optional): Filter by a specific product ID.
   - **Output:**
     ```json
     [
       {
         "id": 1,
         "user_id": 10,
         "transaction_number": "XG1234567890",
         "total_price_all_before": 120.00,
         "total_price_all_after": 100.00,
         "transaction_status": "paid",
         "created_at": "2024-08-10T10:00:00",
         "updated_at": "2024-08-10T10:00:00"
       }
     ]
     ```

2. **`{{base_url}}/transactions/<int:id>`**
   - **Methods:** [GET]
   - **Description:** Get the details of a specific transaction that involves the seller’s products.
   - **Output:**
     ```json
     {
       "id": 1,
       "user_id": 10,
       "transaction_number": "XG1234567890",
       "total_price_all_before": 120.00,
       "total_price_all_after": 100.00,
       "transaction_status": "paid",
       "created_at": "2024-08-10T10:00:00",
       "updated_at": "2024-08-10T10:00:00"
     }
     ```

## TransactionDetails API Endpoints

### Buyer Endpoints

1. **`{{base_url}}/transactions/<int:transaction_id>/details`**
   - **Methods:** [POST]
   - **Description:** Add a detail to a transaction, specifying the `product_id` and `quantity`. The `price` is pulled automatically from the product.
   - **Inputs:**
     ```json
     {
       "product_id": 5,  // ID of the product to add to the transaction
       "quantity": 2     // Quantity of the product (default is 1)
     }
     ```
   - **Output:**
     ```json
     {
       "id": 1,
       "transaction_id": 1,
       "product_id": 5,
       "quantity": 2,
       "price": "19.99",
       "total_price_item": "39.98",
       "created_at": "2024-08-10T10:00:00",
       "updated_at": "2024-08-10T10:00:00"
     }
     ```

2. **`{{base_url}}/transactions/<int:transaction_id>/details/<int:detail_id>`**
   - **Methods:** [GET]
   - **Description:** Get a specific transaction detail by its ID that belongs to the buyer.
   - **Output:**
     ```json
     {
       "id": 1,
       "transaction_id": 1,
       "product_id": 5,
       "quantity": 2,
       "price": "19.99",
       "total_price_item": "39.98",
       "created_at": "2024-08-10T10:00:00",
       "updated_at": "2024-08-10T10:00:00"
     }
     ```

3. **`{{base_url}}/transactions/<int:transaction_id>/details/<int:detail_id>`**
   - **Methods:** [PUT]
   - **Description:** Update a transaction detail, modifying the `quantity` and `price`.
   - **Inputs:**
     ```json
     {
       "quantity": 3,  // Updated quantity of the product
       "price": "18.99"  // Updated price of the product
     }
     ```
   - **Output:**
     ```json
     {
       "id": 1,
       "transaction_id": 1,
       "product_id": 5,
       "quantity": 3,
       "price": "18.99",
       "total_price_item": "56.97",
       "created_at": "2024-08-10T10:00:00",
       "updated_at": "2024-08-10T10:00:00"
     }
     ```

4. **`{{base_url}}/transactions/<int:transaction_id>/details/<int:detail_id>`**
   - **Methods:** [DELETE]
   - **Description:** Delete a transaction detail by its ID.
   - **Output:**
     ```json
     {
       "message": "Transaction detail deleted successfully"
     }
     ```

### Seller Endpoints

1. **`{{base_url}}/transactions/seller`**
   - **Methods:** [GET]
   - **Description:** Get all transaction details related to the seller's products.
   - **Output:**
     ```json
     [
       {
         "transaction_id": 1,
         "product_id": 5,
         "product_title": "Sample Product",
         "quantity": 2,
         "price_at_purchase": "19.99",
         "total_price_item": "39.98",
         "transaction_status": "paid",
         "transaction_number": "XG1234567890",
         "datetime": "2024-08-10T10:00:00"
       }
     ]
     ```

---

This `.md` documentation outlines the structure and behavior of the Transactions and TransactionDetails APIs, making it clear how buyers and sellers can interact with the system. Let me know if any further adjustments are needed!