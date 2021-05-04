import React from 'react';
import logo from '../../images/logo.png';
import img1 from '../../images/Group33142.png';
import img2 from '../../images/Group 33143.png';
import img3 from '../../images/Group 33144.png';
import './Home.css';
import { Link, useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const handleDestination = () => {
        history.push(`/destination`);
    }
    return (
        <div>
            <header className="home-header">
                <div>
                    <img src={logo} alt="" srcset="" />
                </div>
                <div>
                    <nav>
                        <ul>
                           <li>
                               <Link to="/home">Home</Link>
                           </li>
                           <li>
                               <Link to="/destination">Destination</Link>
                           </li>
                           <li>
                               <Link to="/login">Login</Link>
                           </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="box-container">
                <div>
                    <button onClick={handleDestination}>Buy Now</button>
                    <img src={img1} alt="" srcset=""/>
                </div>
                <div>
                    <button onClick={handleDestination}>Buy Now</button>
                    <img src={img2} alt=""/>
                </div>
                <div>
                    <button onClick={handleDestination}>Buy Now</button>
                    <img src={img3} alt=""/>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default Home;