import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Detail() {
  const { id } = useParams();
  const getMovie = async () => {
    const data = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const result = await data.json();
    console.log(result);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return <div>Detail</div>;
}

export default Detail;
