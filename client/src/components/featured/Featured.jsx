import "./featured.css";
import useFetch from "../../hooks/useFetch";
import forum from '../../images/forum.jpg';
import masjid from '../../images/masjid.jpg';
import olymp from '../../images/olymp.jpg';
import formation from '../../images/comite_formation.jpg';

const Featured = () => {
  const{data,loading}=useFetch("/events/countByClub?clubs=Comite Sport,Comite Masjid,Comite Forum,Comite Formation,Mines MAKERS,Benevolat,Astronomines,MinesIT,Alumni")
  return (
    <div className="featured">
     {loading ? (
      "loading please wait" 
      ):(
      <> 
      <div className="featuredItem">
        <img
          src={olymp}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Comite Sport</h1>
          <h2>{data[0]} evenements</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src={masjid}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Comite Masjid</h1>
          <h2>{data[1]} evenements</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src={forum}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Comite Forum</h1>
          <h2>{data[2]} evenements</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src={formation}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Comite Formation</h1>
          <h2>{data[3]} evenements</h2>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Featured;
