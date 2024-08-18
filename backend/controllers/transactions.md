Here's a list of the endpoints with example input in raw JSON format for Postman testing:

### 1. **Create or Update a Transaction (Add Item to Cart)**
- **Endpoint**: `POST /transactions`
- **Description**: Adds an item to the cart. If a pending transaction exists, it adds the item to it; otherwise, it creates a new transaction.

**Raw JSON Input:**
```json
{
    "product_id": 35,
    "quantity": 2
}
```

### 2. **Get All Transaction Details for a User**
- **Endpoint**: `GET /transactions/user/{user_id}/details`
- **Description**: Retrieves all transaction details for the user's pending transaction.

**No JSON Input** (Replace `{user_id}` in the URL with the actual user ID):
- Example URL: `GET /transactions/user/4/details`

### 3. **Edit Quantity of a Product in the Transaction**
- **Endpoint**: `PUT /transactions/user/{user_id}/details/{product_id}`
- **Description**: Edits the quantity of a specific product in the user's transaction.

**Raw JSON Input:**
```json
{
    "quantity": 3
}
```
**No JSON Input** (Replace `{user_id}` and `{product_id}` in the URL with actual values):
- Example URL: `PUT /transactions/user/4/details/35`

### 4. **Get the Total Price of All Transactions for a User**
- **Endpoint**: `GET /transactions/user/{user_id}/total`
- **Description**: Retrieves the total price of all transactions for the user.

**No JSON Input** (Replace `{user_id}` in the URL with the actual user ID):
- Example URL: `GET /transactions/user/4/total`

### 5. **Apply Promotion to a Transaction**
- **Endpoint**: `PUT /transactions/user/{user_id}/apply-promotion`
- **Description**: Applies a promotion to the user's pending transaction.

**Raw JSON Input:**
```json
{
    "voucher_code": "PROMO123"
}
```
**No JSON Input** (Replace `{user_id}` in the URL with the actual user ID):
- Example URL: `PUT /transactions/user/4/apply-promotion`

### 6. **Checkout the Transaction (Mark as Paid)**
- **Endpoint**: `PUT /transactions/user/{user_id}/checkout`
- **Description**: Marks the user's pending transaction as paid.

**No JSON Input** (Replace `{user_id}` in the URL with the actual user ID):
- Example URL: `PUT /transactions/user/4/checkout`

---

### Summary for Postman Testing:
- **Authorization**: Ensure you have a valid JWT token in the `Authorization` header for each request.
- **Replace Placeholders**: Replace `{user_id}`, `{product_id}`, and other placeholders with actual values when testing.

This setup should allow you to test the complete flow of managing transactions in your application using Postman. Let me know if you need further assistance!
