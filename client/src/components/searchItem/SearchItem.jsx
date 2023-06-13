import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.club}</span>
        <span className="siTaxiOp">{item.date}</span>
        <span className="siSubtitle">
        {item.title}
        </span>
        <span className="siFeatures">
          {item.desc}
        </span>
        
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
   
          <Link to={`/events/${item._id}`}>
          <button className="siCheckButton">voire détail</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
