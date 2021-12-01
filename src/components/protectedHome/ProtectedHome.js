import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import ProtectedHomeDetail from "./ProtectedHomeDetail";

function ProtectedHome() {

    const [ , setMoviesArray] = useState([]);
    const [searchResult, setSearchResult] = useState("");
    const [movieDetailsArray, setMovieDetailsArray] = useState([]);
    const [ , setInitialSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { search } = useLocation();
    const navigate = useNavigate();

    function randomInitialSearch() {

        const initialSearchArray = [
            "superman",
            "lord of the rings",
            "batman",
            "pokemon",
            "harry potter",
            "star wars",
            "avengers",
            "terminator"
        ]

        const randomMovie = Math.floor(Math.random() * initialSearchArray.length);

        setInitialSearch(randomMovie);
        return initialSearchArray[randomMovie]
    }

    useEffect(() => {

        let mounted = true;
        fetchMovieApi(randomInitialSearch())
        if (mounted) {
            setIsLoading(false)
        }
        
        return () => {
            mounted = false
        }
    
    }, []);

    useEffect(() => {
        const values = queryString.parse(search);
        if (values.s) {
            fetchMovieApi(values.s);
        } else {
            fetchMovieApi(randomInitialSearch());
        }
    }, []);



    async function fetchMovieApi(searchResult) {

        setIsLoading(true)
        navigate(`/protected-home?s=${searchResult}`, {
            replace: true,
        });

        try {

            const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

            let result = await axios.get(
                `https://www.omdbapi.com/?s=${searchResult}&type=movie&apikey=${API_KEY}`
            );

            if (result.data.Error) {

                throw result.data.Error

            } else {

                let movieDetails = []
                let idArray = result.data.Search.map(({ imdbID }) => (imdbID))
                let uniqueIdArray = [...new Set(idArray)]

                for (let i = 0; i < 9; i++) {
                    movieDetails.push(await axios.get(
                        `https://www.omdbapi.com/?i=${uniqueIdArray[i]}&type=movie&apikey=${API_KEY}`
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

    function handleOnChange(e) {
        setSearchResult(e.target.value);
    };

    async function handleOnClick() {
        fetchMovieApi(searchResult);
    };

    return (

        <div style={styles.blackBackground}>
            <div style={styles.searchDiv}>
                <input
                    name="searchResult"
                    value={searchResult}
                    onChange={handleOnChange}
                    style={styles.search}
                />
                <button style={styles.button} onClick={handleOnClick}>Search</button>
            </div>
            {isError &&
                <div style={styles.padding}>
                    <span style={styles.error}>{errorMessage}</span>
                </div>
            }
            <div >
                {isLoading ? (
                    <div style={styles.loading}>
                        <Loading />
                    </div>
                ) : (
                    <ProtectedHomeDetail
                        movieDetailsArray={movieDetailsArray}
                    />
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
    },

    searchDiv: {
        padding: 30,
        boxShadow: "5px 0px 30px rgba(0, 0, 0, 0.9)",
    },

    search: {
        height: 30,
        marginRight: "1%",
        width: "50%",
        borderRadius: 10,
        boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        paddingLeft: 10,
    },
    button: {
        height: 33,
        width: 70,
        boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: "DarkOrange",
        color: "white",
        fontWeight: 600,
        borderRadius: 4,
    }
}

export default ProtectedHome
