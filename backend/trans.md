Certainly! Below is a list of APIs based on your structure, where `TransactionDetails` are accessed via `transactions/.../details/...` and `Transactions` via `transactions/...`.

### Transactions and TransactionDetails APIs

#### 1. **Add Item to Cart (Creates/Updates TransactionDetails)**
   - **Endpoint:** `POST /transactions/{transaction_id}/details/add`
   - **Description:** Add an item to the cart, creating or updating a `TransactionDetails` entry.
   - **Inputs:**
     ```json
     {
       "product_id": "int",
       "quantity": "int"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Item added to cart",
       "transaction_id": "int",
       "transaction_details_id": "int"
     }
     ```

#### 2. **Update Item in Cart (Updates TransactionDetails)**
   - **Endpoint:** `PUT /transactions/{transaction_id}/details/{transaction_details_id}`
   - **Description:** Update the quantity of an item in the cart.
   - **Inputs:**
     ```json
     {
       "quantity": "int"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Cart item updated",
       "transaction_id": "int",
       "transaction_details_id": "int"
     }
     ```

#### 3. **Remove Item from Cart (Deletes TransactionDetails)**
   - **Endpoint:** `DELETE /transactions/{transaction_id}/details/{transaction_details_id}`
   - **Description:** Remove an item from the cart by deleting the corresponding `TransactionDetails` entry.
   - **Inputs:** None
   - **Output:**
     ```json
     {
       "message": "Item removed from cart",
       "transaction_id": "int"
     }
     ```

#### 4. **View Cart (Retrieve TransactionDetails)**
   - **Endpoint:** `GET /transactions/{transaction_id}/details`
   - **Description:** Retrieve all items in the buyer's cart (pending transaction details).
   - **Inputs:** None
   - **Output:**
     ```json
     {
       "transaction_id": "int",
       "items": [
         {
           "transaction_details_id": "int",
           "product_id": "int",
           "title": "string",
           "quantity": "int",
           "price": "decimal",
           "total_price_item": "decimal"
         }
       ],
       "total_price_all_before": "decimal",
       "total_price_all_after": "decimal"
     }
     ```

#### 5. **Checkout (Finalizes the Transaction)**
   - **Endpoint:** `POST /transactions/{transaction_id}/checkout`
   - **Description:** Finalize the transaction, apply promotions, and update the `transaction_status`.
   - **Inputs:**
     ```json
     {
       "promotion_code": "string" (optional)
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Checkout completed",
       "transaction_id": "int",
       "total_price": "decimal",
       "transaction_status": "string"
     }
     ```

#### 6. **View Buyer’s Transactions**
   - **Endpoint:** `GET /transactions`
   - **Description:** Retrieve a list of all transactions made by the current buyer.
   - **Inputs:** 
     - **Query Parameters:**
       - `status` (optional): Filter by transaction status (e.g., "pending", "completed").
   - **Output:**
     ```json
     {
       "transactions": [
         {
           "transaction_id": "int",
           "transaction_number": "string",
           "datetime": "datetime",
           "total_price_all_before": "decimal",
           "total_price_all_after": "decimal",
           "transaction_status": "string",
           "promotion_applied": "boolean"
         }
       ]
     }
     ```

#### 7. **View Transaction Details**
   - **Endpoint:** `GET /transactions/{transaction_id}`
   - **Description:** Retrieve details of a specific transaction for the buyer, including items purchased.
   - **Inputs:** None
   - **Output:**
     ```json
     {
       "transaction_id": "int",
       "transaction_number": "string",
       "datetime": "datetime",
       "total_price_all_before": "decimal",
       "total_price_all_after": "decimal",
       "transaction_status": "string",
       "items": [
         {
           "transaction_details_id": "int",
           "product_id": "int",
           "title": "string",
           "quantity": "int",
           "price": "decimal",
           "total_price_item": "decimal"
         }
       ],
       "promotion_applied": {
         "code": "string",
         "description": "string",
         "discount": "decimal"
       }
     }
     ```

#### 8. **Seller View of Transactions**
   - **Endpoint:** `GET /seller/transactions`
   - **Description:** Retrieve all transactions involving the seller's products.
   - **Inputs:**
     - **Query Parameters:**
       - `status` (optional): Filter by transaction status.
   - **Output:**
     ```json
     {
       "transactions": [
         {
           "transaction_id": "int",
           "transaction_number": "string",
           "datetime": "datetime",
           "buyer_id": "int",
           "buyer_name": "string",
           "total_price_all_before": "decimal",
           "total_price_all_after": "decimal",
           "transaction_status": "string"
         }
       ]
     }
     ```

#### 9. **Seller Update Transaction Status**
   - **Endpoint:** `PUT /seller/transactions/{transaction_id}/status`
   - **Description:** Update the status of a transaction (e.g., from "pending" to "shipped").
   - **Inputs:**
     ```json
     {
       "transaction_status": "string"
     }
     ```
   - **Output:**
     ```json
     {
       "message": "Transaction status updated",
       "transaction_id": "int",
       "transaction_status": "string"
     }
     ```

### Additional APIs:

- **Apply Promotion Code:** (This could be part of the checkout process)
  - **Endpoint:** `POST /transactions/{transaction_id}/apply-promotion`
  - **Description:** Apply a promotion code to the current transaction.
  - **Inputs:**
    ```json
    {
      "promotion_code": "string"
    }
    ```
  - **Output:**
    ```json
    {
      "message": "Promotion applied",
      "discount": "decimal",
      "new_total": "decimal"
    }
    ```

These APIs cover the complete process of managing transactions and transaction details, ensuring that all necessary data is captured, and accessible to both buyers and sellers. The structure supports the workflow you described, with separate endpoints for transactions and transaction details.

Let me know if you need any more details or adjustments!