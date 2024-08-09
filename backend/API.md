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
