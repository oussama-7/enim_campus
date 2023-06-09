import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/events");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((items) => {
            if (items.rating && items.rating > 3) {
              return (
                <div className="fpItem" key={items._id}>
                  <img src={items.photos[0]} alt="" className="fpImg"  style={{ width: "250px", height: "auto" }}/>
                  <span className="fpName">{items.name}</span>
                  <span className="fpCity">{items.city}</span>
                  <span className="fpdate">{items.date}</span>
                  {items.rating && (
                    <div className="fpRating">
                      <button>{items.rating}</button>
                      <span>RATING</span>
                    </div>
                  )}
                </div>
              );
            } else {
              return null;
            }
          })}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
