import React, { useState } from "react";
import "./list.css";
import EventHeader from "../../components/eventheader/EventHeader";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {



const [club, setClub] = useState('');
const { data, loading ,reFetch} = useFetch(`/events?club=${club}`);
const handleClick =() =>{
    reFetch();
}
  return (
    <div>
      
      <EventHeader type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="lsItem">
              <label className="clubLabel">Club</label>
              <input type="text" value={club} onChange={(e) => setClub(e.target.value)} />
            </div>
            
            <button onClick={handleClick}>Chercher</button>
          </div>
          <div className="listResult">
            {club && !loading ? (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;