import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

const Results = (props) => {
    const [info, setInfo] = useState([{}]);
    const [homeWorld, setHomeWorld] = useState("");
    const { category, id } = useParams();

    useEffect(() => {
        axios.get(`https://swapi.dev/api/${category}/${id}`)
            .then(response => {
                setInfo(response.data)
            })
            .catch(err => {
                setInfo("")
            })
        axios.get(`${info.homeworld}`)
            .then(response => setHomeWorld(response.data))
    }, [category, id, info.homeworld])

    
    const planetID = (url) => {
        if (typeof url === "string") {
            let IDofPlanet = "";
            for (var i = url.length; i > 0; i--) {
                if (url[i] !== "/") {
                    if (!isNaN(url[i])) {
                        IDofPlanet = url[i] + IDofPlanet;
                    }
                }
            }
            return "/planets/" + IDofPlanet
        }
    }

    return (
        <>
            <div className="container w-50 mx-auto border">
                {info.length <= 0 ?
                    <div>
                        <h1 className='text-danger'>404</h1>
                        <h3 className='text-danger'>Sorry! These aren't the droids you're looking for </h3>
                        <img src="https://www.infobae.com/new-resizer/ohFgVZaw0rPsPchHGpnfnJWR_3Q=/768x576/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/57A5J63KMZFYFMNSVMNRPQCW7Q.jpg" alt="obi wan kenobi idk I never saw the movie" style={{ height: "400px" }} />
                    </div>

                    : category === "people" ?
                        <div className="mt-3">
                            <h1>{info.name}</h1>
                            <div className="mt-3">
                                <p><b>Height: </b>{info.height}</p>
                                <p><b>Mass: </b>{info.mass}</p>
                                <p><b>Hair Color: </b>{info.hair_color}</p>
                                <p><b>Skin Color: </b>{info.skin_color}</p>
                                <p><b>Homeworld: </b><Link to={planetID(info.homeworld)}> {homeWorld.name} </Link> </p>
                            </div>
                        </div>
                        : category === "planets" ?
                            <div className="mt-3 text-center">
                                <h1>{info.name}</h1>
                                <div>
                                    <p><b>Climate: </b>{info.climate}</p>
                                    <p><b>Terrain: </b>{info.terrain}</p>
                                    <p><b>Surface Water: </b>{info.surface_water}</p>
                                    <p><b>Rotation Period: </b> {info.rotation_period}</p>
                                </div>
                            </div> :
                            category === "films" ?
                                <div className="mt-3">
                                    <h1>{info.title}</h1>
                                    <div>
                                        <p><b>Director: </b>{info.director}</p>
                                        <p><b>Producer: </b>{info.producer}</p>
                                        <p><b>Release Date: </b>{info.release_date}</p>
                                    </div>
                                </div> :
                                category === "species" ?
                                    <div className="mt-3">
                                        <h1>{info.name}</h1>
                                        <div>
                                            <p><b>Classification: </b>{info.classification}</p>
                                            <p><b>Average Height: </b>{info.average_height}</p>
                                            <p><b>Language: </b>{info.language}</p>
                                            <p><b>Skin Colors: </b>{info.skin_colors}</p>
                                        </div>
                                    </div> :
                                    category === "vehicles" ?
                                        <div className="mt-3">
                                            <h1>{info.name}</h1>
                                            <div>
                                                <p><b>Model: </b>{info.model}</p>
                                                <p><b>Manufacturer: </b>{info.manufacturer}</p>
                                                <p><b>Cost In Credits: </b>{info.cost_in_credits}</p>
                                                <p><b>Length: </b>{info.length}</p>
                                                <p><b>Max Atmospheric Speed: </b>{info.max_atmosphering_speed}</p>
                                            </div>
                                        </div> :
                                        category === "starships" ?
                                            <div className="mt-3">
                                                <h1>{info.name}</h1>
                                                <div>
                                                    <p><b>Model: </b>{info.model}</p>
                                                    <p><b>Manufacturer: </b>{info.manufacturer}</p>
                                                    <p><b>Cost In Credits: </b>{info.cost_in_credits}</p>
                                                    <p><b>Length: </b>{info.length}</p>
                                                    <p><b>Max Atmospheric Speed: </b>{info.max_atmosphering_speed}</p>
                                                </div>
                                            </div> : ""
                }
            </div>
        </>
    )
}

export default Results;