import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../common/Loading";

function Home() {

    const [ , setMoviesArray] = useState([]);
    const [movieDetailsArray, setMovieDetailsArray] = useState([]);
    const [ , setInitialSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [ , setIsError] = useState(false);
    const [ , setErrorMessage] = useState("");


    function randomInitialSearch() {

        const initialSearchArray = ["superman", "lord of the rings", "batman", "pokemon", "harry potter", "star wars", "avengers", "terminator"]

        const randomMovie = Math.floor(Math.random() * initialSearchArray.length);
        
        console.log(initialSearchArray, randomMovie, "23");
        setInitialSearch(randomMovie);
        return initialSearchArray[randomMovie]
    }

    useEffect(() => {

        fetchMovieApi(randomInitialSearch());

    }, []);


    async function fetchMovieApi(searchResult) {

        setIsLoading(true)

        try {

            const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

            let result = await axios.get(
                `https://www.omdbapi.com/?s=${searchResult}&type=movie&apikey=${API_KEY}`
            );

            if (result.data.Error) {

                throw result.data.Error

            } else {

                let idArray = result.data.Search.map(({ imdbID }) => (imdbID))
                let movieDetails = []

                for (let i = 0; i < 8; i++) {
                    movieDetails.push(await axios.get(
                        `https://www.omdbapi.com/?i=${idArray[i]}&type=movie&apikey=${API_KEY}`
                    ))
                }

                setMoviesArray(result.data.Search);
                setMovieDetailsArray(movieDetails);
                setIsLoading(false);
                setIsError(false);
                setErrorMessage("");

            }

        } catch (e) {

            if (e === "Incorrect IMDb ID.") {

                setIsError(true);
                setErrorMessage("Please do not leave search field blank");
                setIsLoading(false);

            } else {

                setIsError(true);
                setIsError(e + " Please try again");
                setIsLoading(false);

            }
        }
    };

    return (

            <div style={styles.blackBackground}>
                
                <div >
                    {isLoading ? (
                        <div style={styles.loading}>
                            <Loading />
                        </div>
                    ) : (
                        <div style={styles.display}>
                            {movieDetailsArray.map((item) => (
                                <div key={item.data.imdbID} style={styles.row}>
                                    <img src={item.data.Poster} style={styles.poster} alt="movie poster" />
                                    <h1 style={styles.title}>{item.data.Title}</h1>
                                    <p><b>Rating:</b> {item.data.imdbRating}</p>
                                </div>
                            )
                            )}
                        </div>
                    )}
                </div>
            </div>

    )
}; 


const styles = {

    padding: {
        padding: 50,
    },

    error: {
        color: "red",
        fontSize: 30,
        fontWeight: 500,
        textTransform: "uppercase",
        textShadow: "0px 0px 10px Red",
    },

    loading: {
        color: "white",
        height: "100vh",
        paddingTop: "12%",
        fontSize: 80,
        textShadow: "0px 0px 20px darkOrange",
        fontWeight: 900
    },

    blackBackground: {
        background: "radial-gradient(circle, rgba(32,53,62,1) 0%, rgba(0,0,0,1) 100%)",
        height: "100vh",
    },

    display: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        color: "white",
        paddingTop: 70
    },
    row: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 600,
        height: 600,
        paddingBottom: "2%"

    },
    poster: {
        boxShadow: "1px 1px 30px rgba(0, 0, 0, 0.9)",
        with: 300,
        height: 470
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        width: "50%"
    },
}

export default Home
