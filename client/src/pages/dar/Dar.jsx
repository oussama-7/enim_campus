import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Bas from "../../components/bas/Bas";
import EventHeader from "../../components/eventheader/EventHeader";

import PropertyList from "../../components/propertyList/PropertyList";

import "./dar.css";

const Dar = () => {
  return (
    <div>
     
      
      <EventHeader/>
      <div className="homeContainer-dar">
      <h1 className="homeTitle-dar">NOS COMITES </h1>
        <Featured/>
        <h1 className="homeTitle-dar">NOS CLUB </h1>
        <PropertyList/>
        <h1 className="homeTitle-dar">Les évenement les plus notés</h1>
        <FeaturedProperties/>
        
        <Bas/>
      </div>
    </div>
  );
};

export default Dar;
