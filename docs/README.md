# Overview

This app aims to provide a corporate booking solution for our customers.

Each [vehicles](vehicles.md), [users](users.md), and [bookings](bookings.md) are grouped into [clients](clients.md). Therefore, each client will have their own separate sets of vehicles, users, and bookings. See [clients](clients.md) for more info.

Each users in the app has a designated [role](/users.md#Roles) in the app specific [permissions](/permissions.md). The four roles and their general functions in the app are as follows:

**Master**

- Divide the other roles into [clients](/clients.md).

- Provide [locations](/locations.md) to clients.

- Provide [vehicles](/vehicles.md) to clients.

- Manage all bookings, locations, users, vehicles, and clients.

**Admin**

- Manage users, vehicles, bookings, and locations within its [client](/clients.md).

- Create accounts within its [client](/clients.md).

**Key Manager**

- Manage bookings, and vehicle availability.

**Guest**

- Create and submit booking requests within its [client](/clients.md).

## Sidebar Navigation

Access the sidebar by clicking the top right hamburger button.

<img src="/media/sidebar.png" alt="Sidebar" style="width: 400px"></img>

#### Home

Contains a dashboard of the current status of vehicles, bookings, accidents, and users.

:closed_lock_with_key: Accessible by *Everyone*

#### Bookings

This is where Master, Admin, and Key Manager can manage bookings. Guests can create a booking request here.

See [Bookings](/bookings.md).

:closed_lock_with_key: Accessible by *Everyone*

#### Locations

Here, a *master* account can create locations. A location is a container for vehicles in where the *guest* account can pick up the vehicle for booking.

See [Locations](/locations.md).

:closed_lock_with_key: Accessible by *Everyone*

#### Users

Users of the app can be managed here.

See [Users](/users.md).

:closed_lock_with_key: Accessible by *Master*, *Admin*, *Key Manager*

#### Vehicles

Vehicles in the app can be managed here. Vehicles are to be booked by *guests*.

:closed_lock_with_key: Accessible by *Everyone*

See [Vehicles](/vehicles.md).

#### Accidents

If a *guest* has been involved in a vehicular accident, they can send a accident report in the app. This will send a notification to the *key manager* of the vehicle.

:closed_lock_with_key: Accessible by *Everyone*

See [Accidents](/accidents.md).

#### Clients

Resources such as users, locations, and vehicles are designated into multiple clients. Users of a client will not have access to other resources which are not designated to their own client.

:closed_lock_with_key: Accessible by *Master*

See [Clients](/clients.md).

#### Reports

Generates statistical reports from the app.

:closed_lock_with_key: Accessible by *Master*, *Admin*, *Key Manager*

See [Reports](/reports.md).

#### Settings

Provides various settings for the app/users.

:closed_lock_with_key: Accessible by *Everyone*

See [Settings](/settings.md).
