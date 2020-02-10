# Users

Users of the application can be managed through the "Users" page.

## Roles

There are four types of users. Each type of users have varying [permissions](/permissions.md).
- MASTER
- ADMIN
- KEY MANAGER
- GUEST

## Creating Users

If a user is created using a **MASTER** account, the user needs to be assigned to a client before being allowed to logged in ([See Clients](/clients.md#assigning-users)). Otherwise the client will automatically be assigned to the user's assigned client which created it.

To create a user, go to users page in the sidebar then click the "NEW USER" button on the top right.

<img src="/media/users/create.gif"
     alt="User creation"
     style="margin-left: auto; margin-right: auto; height: 400px" />

### User Categories

If the role of the user is *guest* then you can optionally specify a vehicle category. This will limit the user in which vehicle category it can make a booking. See [Vehicle Categories](/users.md#Vehicle-Categories)

### Invites

A guest user cannot sign-up their own account without an invite. They can only be create manually by *Admin*, *Key Manager*, or *Master* accounts or they can be invited.

By inviting a guest, they will receive a sign-up link through their email which contains a token that will expire in seven days.

<img src="/media/users/invite.gif"
     alt="User invite"
     style="margin-left: auto; margin-right: auto; height: 400px" />

### Sign up

Once an invite link has been received by the *guest*, they can sign-up by following the given link in the email.

## Blocking Users

A user can be blocked which will prevent them from loggin in. You can block them by clicking the block icon ![Location](/media/icons/block-24px.svg).