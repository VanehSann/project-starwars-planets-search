import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // constructor
  const [planets, setState] = useState({}); // null
  // componetDidMount
  useEffect(() => {
    const requestAPI = async () => {
      const fetchAPI = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const jsonAPI = await fetchAPI.json();
      const { results } = jsonAPI;

      setState(results);
      // console.log(jsonAPI.results);
    };
    requestAPI();
  }, []);
  return (
    <>
      <h1>Projeto Star Wars - Trybe!</h1>

      <table>
        <thead>
          <tr>
            { planets[0] && Object.keys(planets[0])
              .filter((keys) => (keys !== 'residents'))
              .map((keys) => (
                <th key={ keys }>{keys}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          { planets[0] && Object.values(planets).map((values, index) => (
            <tr key={ index }>
              <td key={ values.name }>{values.name}</td>
              <td key={ values.rotation_period }>{values.rotation_period}</td>
              <td key={ values.orbital_period }>{ values.orbital_period}</td>
              <td key={ values.diameter }>{values.diameter}</td>
              <td key={ values.climate }>{values.climate}</td>
              <td key={ values.gravity }>{values.gravity}</td>
              <td key={ values.terrain }>{values.terrain}</td>
              <td key={ values.surface_water }>{values.surface_water}</td>
              <td key={ values.population }>{values.population}</td>
              <td key={ values.films }>{values.films}</td>
              <td key={ values.created }>{values.created}</td>
              <td key={ values.edited }>{values.edited}</td>
              <td key={ values.url }>{values.url}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
}

export default App;
