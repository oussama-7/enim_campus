import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

import minesit from '../../images/minesit.jpg';
import alumni from '../../images/alumni.png';
import makers from '../../images/makers.png';
import astro from '../../images/astro.jpg';
import benevolat from '../../images/benevolat.jpg';


const PropertyList = () => {
  const{data,loading}=useFetch("/events/countByClub?clubs=Comite Sport,Comite Masjid,Comite Forum,Comite Formation,Mines MAKERS,Benevolat,Astronomines,MinesIT,Alumni")
  return (
    <div className="pList">
         {loading ? (
      "loading please wait" 
      ):(
      <> 
      <div className="pListItem">
        <img
          src={makers}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Mines MAKERS</h1>
          <h2>{data[4]} evenements</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src={benevolat}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Benevolat</h1>
          <h2>{data[5]} evenements</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src={astro}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Astronomines</h1>
          <h2>{data[6]} evenements</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src={minesit}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>MinesIT</h1>
          <h2>{data[7]} evenement</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src={alumni}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Alumni</h1>
          <h2>{data[8]} evenements</h2>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default PropertyList;
