# Live Link: https://digital-cow-hut-azimchowdhury.vercel.app

## Application Routes:

## User

### /api/v1/auth/signup (POST)

### /api/v1/users (GET)

### /api/v1/users/:id (Single GET) Include an \_id from mongodb

### /api/v1/users/:id (PATCH) Include an \_id from mongodb

### /api/v1/users/:id (DELETE) Include an \_id from mongodb

## Cows

### /api/v1/cows (POST)

### /api/v1/cows (GET)

### /api/v1/cows/:id (Single GET) Include an \_id from mongodb

### /api/v1/cows/:id (PATCH) Include an \_id from mongodb

### /api/v1/cows/:id (DELETE) Include an \_id from mongodb

## Pagination and Filtering routes of Cows

### /api/v1/cows/?page=1&limit=10

### /api/v1/cows/?sortBy=price&sortOrder=asc

### /api/v1/cows?minPrice=20000&maxPrice=70000

### /api/v1/cows?location=Chattogram

### /api/v1/cows?searchTerm=Cha

## Orders

### /api/v1/orders (POST)

### /api/v1/orders (GET)
