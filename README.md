# mm223fj-examination-3

URL to the application : https://cscloud452.lnu.se

The application uses https to ensure secure connection between the website and the client and the application is running in production mode. I used GitHub web hook module when implementing  which uses a secret shared with GitHub that ensures that all incoming posts are coming from GitHub.

I’m also using nginx as a reversed proxy which forwards requests to the http server at port 3000. Nginx handles TLS certificates and running the https server.  The application is using PM2 as a process manager which will restart it in the event of an error. nginx and pm2 could be potentially be used together to load balance the application if the website handled more traffic. TLS certificates are used by nginx to set up a https server, these certificates are self-signed. 

The application uses environmental variables to store GitHub token and Github secret and to run in production mode. These variables are mainly used to hide the tokens from the code published to GitHub, but could also enable easier configurability when running the code in a different environment. (Friend’s computer etc).

When running the application in production mode, the logging is kept to a minimum, also more caching takes place in order to optimise performance. 

The application uses socket.io to set up web sockets between the client and the server. The server listens to web socket connection by the client and forwards the information sent by GitHub to all the clients. The application also uses express-github-webhook which is used by express to listen in on POSTs from github. This module uses a secret phrase shared with GitHub to ensure that all the information is coming from GitHub.

Finally the application uses octonode which uses GitHub Api an OAuth token to fetch all currently created issues/comments. This is then rendered to the user with handlebars when they request the page. All of the environmental variables are saved on the server so the user never sees them. Fetching of data from GitHub is also done on the server and is passed by the server to client 



