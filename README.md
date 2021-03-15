***Notice.*** 
Ember client code placed on client folder

INSTALL
---

- Configure .env file (DB section)

- Install npm modules for server and client separately (root and client folders)

- Create DB schema by run migrations ```npm run migration:run``` (knex lib should be installed global), 
Or use `dump.sql` file

RUN
---
**!Important** Files should named just like on task archive

Import data from task files to DB use command
```npm run import [format] [path-to-files-dir]```

```DEBUG=log* npm run import json /Users/vatseek/vwrapperhome/dima/upload``` 

Run server on dev mode (server and client will run separately) 
```npm run dev``` 


PS
-
Im not create production build mode because it not really need for demo
