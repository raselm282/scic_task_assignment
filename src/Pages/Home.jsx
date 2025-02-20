
// import { Helmet } from "react-helmet-async";

import { Outlet } from "react-router-dom";



const Home = () => {
  return (
    <div>
      {/* <Helmet>
        <title>Newspaper || Home</title>
      </Helmet>{" "} */}
      Home
      {Outlet}
    </div>
  );
};

export default Home;
