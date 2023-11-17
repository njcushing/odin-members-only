# odin-members-only

This application was created as a part of The Odin Project's NodeJS course. The aim of this project is to produce a server-side application that can achieve the following tasks:

- Allow the user to enter credentials into a form and submit them to the server
- The user's credentials should be stored in a database using a hashed password
- The database should be queried when the user tries to log in to confirm their log in information and create a session that keeps the user logged in as they traverse the site
- Allow users to see messages, with the date and author of those messages hidden to non-members/admins
- Allow users to become a member (if they know the passcode), which lets the user see message dates and authors
- Allow users to become admins (if they know the passcode), which lets the user delete messages.