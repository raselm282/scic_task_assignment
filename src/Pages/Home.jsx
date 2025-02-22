
import { Helmet } from "react-helmet-async";

import Banner from "../Components/Banner";




const Home = () => {
  return (
    <div>
      <Helmet>
              <title>Home</title>
            </Helmet>
      <Banner/>
    </div>
  );
};

export default Home;
