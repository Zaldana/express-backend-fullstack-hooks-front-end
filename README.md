 A- Express-Backend-Fullstack-Hooks
Create a backend that includes-
-User model- email, username, firstName, LastName and password
-User Router- signup and login
-Movie model- title, movie poster, imdb link, userID
-Movie Router- getAllFavoriteMovies(from the signed in user), addToFavorites(favorite from OMDB)

Create a frontend using React Hooks-
-Recreate previous movie app using hooks
-1, use omdb API
2. Spin up a new React app using npx create-react-app <app name>
3. App should load 8 random movies from the start (Should be random from these 8 movie franchises Superman, lord of the ring, batman, Pokemon, Harry Potter, Star Wars, Avengers, Terminator)
4.Each movie shows the poster, title and rating.
5. Make a searchable input using the search button and Enter but its NOT a form. (No need to use onSubmit, use onClick)
6.It should display the top 8 movies from the search.
7. User should get a warning message if search without supplying a title
8. If there’s no such movie it should let user know movie doesn't exist.

-Have a favorite button for each movie.
1. when clicked, title, movie poster, imdb link, and userID will be saved to the backend (hard code current userID for now)

***Extra-Credit: look up jwt-decode and use it for current user so you don't have to hard code current userID

SUBMIT the Github LINKs for frontend and backend 