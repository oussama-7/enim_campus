import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const {data :usersCount, loading, error } = useFetch(
    "/users/countUsers/"
  );
  const { data: eventsCount } = useFetch(
    "/events/countEvents/"
  );
  
 
 
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" count={usersCount.count}/>
        
          
         
         
        </div>
        <div className="widgets">
        <Widget type="events" count={eventsCount.count} />
        </div>
      </div>
    </div>
  );
};

export default Home;
