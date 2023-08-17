import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../Movie.module.css";

function Movie({ id, coverImg, title, summary, genres, rating }) {
  return (
    <Link to={`/movie/${id}`}>
      <div className={`${styles.movieRow}`}>
        <img src={coverImg} alt={title} />
        <div>
          <h2>{title}</h2>
          {/* <p>{summary}</p> */}
          <div className={`${styles.movieRow__rating}`}>{rating}</div>
          <ul>
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>{" "}
      </div>
    </Link>
  );
}
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
