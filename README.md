# car-rental-management

##Setup

1. Create the folder in your _CAR_RENTAL_MANAGEMENT_API_STORAGE_PATH_ environment variable

## Environment variables used:

### SERVER

- **ENVIRONMENT** _(production/development)_
- **DATABASE_NAME**
- **DATABASE_USERNAME**
- **DATABASE_PASSWORD**
- **DATABASE_HOST**
- **DATABASE_PORT**
- **MAIL_HOST**
- **MAIL_USER**
- **MAIL_PASS**
- **MAIL_PORT**
- **SERVER_PORT** _Port to serve content_
- **SERVER_URL** _Used for CORS_
- **CLIENT_URL** _Used for CORS_
- **SECRET_KEY** _Used to hash passwords_
- **CAR_RENTAL_MANAGEMENT_API_STORAGE_PATH** _Where to save uploaded files_

### CLIENT

- **REACT_APP_CAR_BOOKING_API_DOMAIN**
- **REACT_APP_CAR_BOOKING_CLIENT_DOMAIN**

## Roles

### Master

- Can access every resource.

### Admin

- Can access only resource within its client.

### Key Manager

- Can access only resource within its client.

### Guests

- Can access only resource within its client.

## Multi Client

Vehicles, users, locations, bookings, and accidents are divided into multiple clients.

### Clients

1. Only a **MASTER** account can create clients.
2. After a creating a client, an initial user must be provided. This user can be created or selected from an existing user by the **MASTER** account user.
3. To provide access to some resources to the users in the clients, the resource must be added manually.

### Locations

1. Locations can be assigned to multiple clients.
2. If a location is available to the client, the **Vehicles** under that location will be available for transfer in that location.

### Vehicles

1. Only a **MASTER** account can create, update vehicles.
2. After a vehicle has been created, the vehicle must be transfered to a selected client. Only one client can have one vehicle.
3. A vehicle will only be available to a client if the **Location** the vehicle is in is also available to the client.

### Users

1. A **MASTER** account can create all types of user roles.
2. If a **MASTER** account creates a user, it must be transfered to a client before it can be used.
3. An **ADMIN** account can create KEY_MANAGER, GUESTS, and ADMIN accounts. Created users will automatically put under the client of the creator account.
