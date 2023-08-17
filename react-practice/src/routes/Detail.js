import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const json = await response.json();
    console.log(json.data.movie);
    setMovieDetail(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <img src={movieDetail.medium_cover_image} />
          <h1>{movieDetail.title}</h1>
          <div>
            <p>{movieDetail.rating}</p>
            <ul>
              {movieDetail.genres.map((g) => (
                <li>{g}</li>
              ))}
            </ul>
          </div>
          <p>{movieDetail.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
