
import { useNavigate } from "react-router-dom";
import { StarshipButton } from "./MainBanner";
import { ShipCardInfo } from "./ShipCollection";
import { ShipsContainer } from "./RenderShipCollection";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <>
    <ShipsContainer>
      <ShipCardInfo $size='35px' $colorText='yellow'>Welcome to the Star Wars ship catalog</ShipCardInfo>
      {isAuthenticated ? (
        <StarshipButton onClick={handleLogout}>Logout</StarshipButton>
      ) : (
        <ShipsContainer>
          <p>Login required to access the catalog</p>
        </ShipsContainer>
      )}
    </ShipsContainer>
    
    </>
  );
};

export default Home;