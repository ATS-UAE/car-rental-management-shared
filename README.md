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
- **CHOKIDAR_USEPOLLING** _true/false if you want to enable CRA hot update._

## Resources

- Users
- Vehicles
- Bookings
- Clients
- Accidents
- Locations
- Categories

## Role Permissions

### Guest Permissions

- CREATE
  - Bookings
    - Own Client
    - Self
  - Accidents
    - Own Client
    - Self
- READ
  - Own Bookings
    - Own Client
    - Self
  - Vehicles
    - Own Client
  - Locations
    - Own Client
  - Categories
    - Own Client
- UPDATE
  - Bookings
    - Own Client
    - Self
    - If not approved
- DELETE
  - Bookings
    - Own Client
    - Self
    - If not approved

### Key Manager Permissions

- CREATE
  - Users
    - By invite only
    - Own Client
- READ
  - Users
    - Own Client
  - Vehicles
    - Own Client
  - Accidents
    - Own Client
  - Locations
    - Own Client
  - Categories
    - Own Client
- UPDATE
  - Vehicles
    - Own Client
    - Excludes (Categories, Object ID, Plate Number, VIN, GPS mapping)
    - Defleet
  - Bookings
    - Own Client
    - Approve/deny
    - Change time if not finalized
  - Accidents
    - Own Client
    - Mark as read
    - Mark as deleted
- DELETE
  - Bookings
    - If not approved

#### Admin Permissions

- CREATE
  - Users
    - Own Client
    - Except Master account
  - Categories
    - Own Client
- READ
  - Users
    - Own Client
  - Vehicles
    - Own Client
  - Accidents
    - Own Client
  - Locations
    - Own Client
  - Categories
    - Own Client
- UPDATE
  - Users
    - Own Client
  - Vehicles
    - Own Client
    - Excludes (Categories, Object ID, Plate Number, VIN, GPS mapping)
  - Accidents
    - Own Client
    - Mark as read
    - Mark as deleted
  - Categories
    - Own Client
- DELETE
  - Categories
    - Own Client
  - Bookings
    - If not approved

#### Master Permissions

- CREATE
  - Users
  - Vehicles
  - Clients
  - Locations
  - Categories
- READ
  - Users
  - Vehicles
  - Bookings
  - Clients
  - Accidents
  - Locations
  - Categories
- UPDATE
  - Users
  - Vehicles
  - Bookings
  - Clients
  - Accidents
  - Locations
  - Categories
- DELETE
  - Users
  - Vehicles
  - Bookings
    - If not approved
  - Accidents
  - Locations
  - Categories

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
2. After a vehicle has been created, the vehicle must be transferred to a selected client. Only one client can have one vehicle.
3. A vehicle will only be available to a client if the **Location** the vehicle is in is also available to the client.

### Users

1. A **MASTER** account can create all types of user roles.
2. If a **MASTER** account creates a user, it must be transferred to a client before it can be used.
3. An **ADMIN** account can create KEY_MANAGER, GUESTS, and ADMIN accounts. Created users will automatically put under the client of the creator account.


# Todo
- Remove grouping the vehicle when booking.