import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../common/Loading";
import { Link, useParams } from "react-router-dom";


function MovieDetail() {

    const { imdbID } = useParams()

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [rated, setRated] = useState("");
    const [runtime, setRuntime] = useState("");
    const [director, setDirector] = useState("");
    const [actors, setActors] = useState("");
    const [plot, setPlot] = useState("");
    const [poster, setPoster] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMovieDetail()  
    }, [])

    async function fetchMovieDetail() {

        setIsLoading(true);
    
        try {

            const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

            let result = await axios.get(
                `http://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=${API_KEY}`
            );

            setTitle(result.data.Title);
            setYear(result.data.Year);
            setRated(result.data.Rated);
            setRuntime(result.data.Runtime);
            setDirector(result.data.Director);
            setActors(result.data.Actors);
            setPlot(result.data.Plot);
            setPoster(result.data.Poster);
            setIsError(false)
            setErrorMessage("");
            setIsLoading(false);

        } catch (e) {

            console.log(e);

        }
    }

    return (
        <div style={styles.blackBackground}>
            <div >
                {isLoading ? (
                    <div style={styles.loading}>
                        <Loading />
                    </div>
                ) : (
                    <div style={styles.row}>

                        <div style={styles.posterBox}>
                            <img src={poster} alt="movie poster" style={styles.poster} />
                        </div>
                        
                        <div style={styles.textBox}>
                            <h1 style={styles.title}>{title}</h1>
                            <h4 style={styles.year}>{year}  •  {rated}  •  {runtime}</h4>
                            <br />
                            <h4 style={styles.year}><b>Director: </b>{director}</h4>
                            <h4 style={styles.year}>{actors}</h4>
                            <br />
                            <p style={styles.plot}>{plot}</p>
                            <div style={styles.buttonContainer}>
                                <Link to={"/protected-home"} >
                                    <button style={styles.button}>Back</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}


const styles = {



    error: {
        color: "red",
        fontSize: 30,
        fontWeight: 500,
        textTransform: "uppercase",
        textShadow: "0px 0px 10px red",
    },

    loading: {
        height: "100vh",
        paddingTop: "12%",
        fontSize: 80,
        textShadow: "0px 0px 20px darkOrange",
        fontWeight: 900
    },

    blackBackground: {
        background: "radial-gradient(circle, rgba(32,53,62,1) 0%, rgba(0,0,0,1) 100%)",
        height: "100vh",
        color: "white",
    },
    row: {
        display: "flex",
        flexWrap: "wrap",
        paddingTop: 50
    },
    posterBox: {
        width: "30%",
        padding: "1%"
    },
    poster: {
        width: "85%",
        boxShadow: "1px 1px 30px rgba(0, 0, 0, 0.9)",
    },
    textBox: {
        width: "60% ",
        textAlign: "left",
        paddingTop: "2%",
        paddingRight: "5%"
    },
    title: {
        fontSize: 50,
        fontWeight: 900
    },
    year: {
        fontSize: 30,
        fontWeight: 500
    },
    plot: {
        fontSize: 30,
    },
    buttonContainer: {
        marginTop: "10%",
        height: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",

    },
    button: {
        width: 300,
        height: 50,
        boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: "darkOrange",
        color: "white",
        fontWeight: 1000,
        borderRadius: 8,
        fontSize: 24,
    }

}

export default MovieDetail;