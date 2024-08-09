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
   - **Description:** Test the connection to the database and fetch the first product (if any).
   - **Inputs:** None
   - **Output:** 
     ```json
     {
       "message": "good connection",
       "dict": {
         "id": "int",
         "user_id": "int",
         "category_id": "int",
         "title": "string",
         "description": "string",
         "stock": "int",
         "price": "decimal",
         "created_at": "datetime",
         "updated_at": "datetime"
       }
     }
     ```

### Seller Endpoints

1. **`{{base_url}}/products/`**
   - **Methods:** [POST]
   - **Description:** Create a new product (Seller only). The `user_id` is automatically obtained from the JWT token.
   - **Inputs:**
     ```json
     {
       "category_id": "int",    // The ID of the category the product belongs to
       "title": "string",       // The title of the product
       "description": "string", // The description of the product (optional)
       "stock": "int",          // The available stock for the product
       "price": "decimal"       // The price of the product
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
       "category_id": "int" (optional),    // The new category ID (if changing)
       "title": "string" (optional),       // The new title (if changing)
       "description": "string" (optional), // The new description (if changing)
       "stock": "int" (optional),          // The new stock quantity (if changing)
       "price": "decimal" (optional)       // The new price (if changing)
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
       "total": "int",                  // Total number of products
       "page": "int",                   // Current page
       "per_page": "int",               // Products per page
       "products": [
         {
           "id": "int",
           "user_id": "int",
           "category_id": "int",
           "title": "string",
           "description": "string",
           "stock": "int",
           "price": "string",
           "created_at": "datetime",
           "updated_at": "datetime"
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
       "id": "int",
       "user_id": "int",
       "category_id": "int",
       "title": "string",
       "description": "string",
       "stock": "int",
       "price": "string",
       "created_at": "datetime",
       "updated_at": "datetime"
     }
     ```

### Buyer Endpoints

1. **`{{base_url}}/products/`**
   - **Methods:** [GET]
   - **Description:** Get all products or search by category, product name, or product ID (Buyer only).
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
       "total": "int",                  // Total number of products
       "page": "int",                   // Current page
       "per_page": "int",               // Products per page
       "products": [
         {
           "id": "int",
           "user_id": "int",
           "category_id": "int",
           "title": "string",
           "description": "string",
           "stock": "int",
           "price": "string",
           "created_at": "datetime",
           "updated_at": "datetime"
         }
       ]
     }
     ```

2. **`{{base_url}}/products/<int:id>`**
   - **Methods:** [GET]
   - **Description:** Get details of a specific product by product ID (Buyer only).
   - **Output:**
     ```json
     {
       "id": "int",
       "user_id": "int",
       "category_id": "int",
       "title": "string",
       "description": "string",
       "stock": "int",
       "price": "string",
       "created_at": "datetime",
       "updated_at": "datetime"
     }
     ```

