import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProtectedHomeDetail(props) {

    let jwtToken = "Bearer " + window.localStorage.getItem("jwtToken")

    const [favoriteMovies, setFavoriteMovies] = useState([])
    
    
    useEffect(() => {
        favorites()
    }, [])

    async function favorites() {

        try {

            let payload = await axios.get(
                "http://localhost:3001/api/movie/",
                {
                    headers: {
                        authorization: jwtToken,
                    }
                }
            );

            setFavoriteMovies(payload.data.allFavoriteMovies)
             
        } catch (e) {

            console.log(e.response)
        }
    }

    async function handleOnClickFav(imdbID, moviePoster, movieTitle, rating) {
        
        try {

            let payload = await axios.post(
                "http://localhost:3001/api/movie/add-movie",
                
                {
                    movieTitle,
                    moviePoster,
                    imdbID,
                    rating,
                },
                
                {
                    headers: {
                        authorization: jwtToken,
                    }
                }
            );
            
            let newFavoriteArray = [...favoriteMovies, payload.data.favoriteMovie]
            setFavoriteMovies(newFavoriteArray)

        } catch (e) {

            console.log(e.response);

        }

    }

    async function handleOnClickDel(e) {

        let id = e.target.value;

        try {

            let payload = await axios.delete(
                `http://localhost:3001/api/movie/delete-fav-by-id/${id}`,

                {
                    headers: {
                        authorization: jwtToken,
                    }
                }
            );
            
            let newFavoriteArray = favoriteMovies.filter( el => {
                return el._id !== payload.data.deletedMovie._id;
            });

            setFavoriteMovies(newFavoriteArray)

        } catch (e) {

            console.log(e.response);

        }


    }

    return (
        <div>
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-1'}></div>
                    <h1 className={'col-7 d-flex text-light'}>Results</h1>
                    <h1 className={'col-3 d-flex justify-content-center text-light'}>Favorites</h1>
                </div>
                <div className={'row'}>
                <div className={'col-8'} style={styles.display}>
                {props.movieDetailsArray.map((item) => (
                    <div key={item.data.imdbID} style={styles.row}>
                        <Link to={`/fetch-movie/${item.data.imdbID}`} >
                            <img src={item.data.Poster} style={styles.poster} alt="movie poster" />
                        </Link>
                        <h1 style={styles.title}>{item.data.Title}</h1>
                        <div style={styles.favBox}>
                            <span><b>Rating: {item.data.imdbRating}</b></span>
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() =>
                                    handleOnClickFav(
                                        item.data.imdbID,
                                        item.data.Poster,
                                        item.data.Title,
                                        item.data.imdbRating
                                    )}
                            >Add To Favs</button>
                        </div>                    
                    </div>
                ))}
                </div>
            
                    <div className={'col-3'} style={styles.favColumn}>
                    {favoriteMovies.map((item) => (
                        <div key={item.imdbID} style={styles.row}>
                            <Link to={`/fetch-movie/${item.imdbID}`} >
                                <img src={item.moviePoster} style={styles.poster} alt="movie poster" />
                            </Link>
                            <h1 style={styles.title}>{item.movieTitle}</h1>
                            <div style={styles.favBox}>
                                <span><b>Rating: {item.rating}</b></span>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    value={item._id}
                                    onClick={handleOnClickDel}
                                >Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                </div>
            </div>
        </div>
    )
}

const styles = {

    display: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        color: "white",
        paddingTop: 40,
    },
    row: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 500,
        height: 600,
    },
    poster: {
        boxShadow: "1px 1px 30px rgba(0, 0, 0, 0.9)",
        with: 300,
        height: 470
    },
    title: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 700,
        width: "60%"
    },
    favBox: {
        width: "40%",
        height: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    favColumn: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        color: "white",
        paddingTop: 40,
    },
}

export default ProtectedHomeDetail
