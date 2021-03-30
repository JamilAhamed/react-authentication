import React, { useState } from 'react';
import FakeData from '../FakeData/FakeData';
import VehicleCard from '../Vehicle/VehicleCard';
import "./Home.css";

const Home = () => {
    const vehicleList= FakeData 
    const [vehicles, setVehicle] = useState(vehicleList);
    return (
        <div className="d-flex justify-content-center align-items-center home-bg">
      <div className="row container">
        {vehicles.map((vehicle) => (
          <VehicleCard vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>
    </div>
    );
};

export default Home;