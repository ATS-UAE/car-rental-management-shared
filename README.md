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

## Resource

## RBAC requirements

### Master

- Can access every resource.

### Admin

- Can access only resource within its client.

### Key Manager

- Can access only resource within its client.

### Guests

- Can access only resource within its client.
