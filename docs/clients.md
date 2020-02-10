# Clients

Clients can be created by a *master* account.

Each client will have their own separate users, bookings, vehicles, and locations.

Only the *master* account can assign users, vehicles, and locations to a client. Once assigned, these resources will be accessible by the users in that *client*.

## Client Resources

The diagram below presents how resouces are divided within each clients.

![Client resources](/media/clients/client-resources.png)

## Creating Clients

When logged in into a *Master* account, enter the clients page by clicking the hamburger menu button in the top right corner of the app.

Once there, click the add button on the top right of the table.

<img src="/media/clients/create.gif"
     alt="Client creation"
     style="margin-left: auto; margin-right: auto; height: 400px" />

After the client has been created, you can assign users, locations, and vehicles to it.

## Assigning Users

You can assign users by clicking the users icon ![User](/media/icons/people-24px.svg). You can then select which users will be transferred to the client.

<img src="/media/clients/assign-users.gif"
     alt="Client creation"
     style="margin-left: auto; margin-right: auto; height: 400px" />

Users on the left pane has no client assigned, and the users on the right are assigned to the selected client.

You can unassign the user by transferring them to the left pane.

If a user has no client assigned to them, they would not be able to log in.

!> Only one client can be assigned for each user.

See [users](/users.md).

## Assigning Locations

You can assign locations by clicking the location icon ![Location](/media/icons/location_city-24px.svg). You can then select which locations will be available to the client.

<img src="/media/clients/assign-locations.gif"
     alt="Client creation"
     style="margin-left: auto; margin-right: auto; height: 400px" />

A location can be assigned to multiple clients.

You can unassign the location by transferring them to the left pane.

!> Unassigning a location to a client will also unassign all the vehicles which are both assigned to the location and the client.

See [locations](/locations.md).

## Assigning Vehicles

You can assign vehicles by clicking the vehicle icon ![Vehicle](/media/icons/directions_car-24px.svg). You can then select which vehicles will be available to the client.

<img src="/media/clients/assign-vehicles.gif"
     alt="Client creation"
     style="margin-left: auto; margin-right: auto; height: 400px" />

A vehicle will only be available to be assigned to the client if:

- The assigned location of the vehicle is also assigned to the client.
- The vehicle has no assigned location.

See [vehicles](/vehicles.md).
