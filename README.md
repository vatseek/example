INSTALL
---

Configure .env file (DB section)

Create DB schema by run migrations ```npm run migration:run``` (knex lib should be installed global), 
Or use `dump.sql` file

Import data from task files to DB use command
```npm run import [format] [path-to-files-dir]```

```DEBUG=log* npm run import json /Users/vatseek/vwrapperhome/dima/upload``` 

Run server on dev mode (server nad client will run separately) 
```npm run dev``` 


PS
-
Im not create production build mode because it not really need for demo
