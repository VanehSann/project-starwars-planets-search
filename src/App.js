import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchAPIReturn, selectRemovedA, selectRemovedB } from './servicesFunc';

function App() {
  // https://www.youtube.com/watch?v=tcu938s1e_w
  // <<< sugestão do youtube, de setar dois states
  // Um pra array e length === 0 e outro length > 0 >>>
  const [planetsInic, setStateInic] = useState({});
  const [planets, setState] = useState({});
  //
  const [comparason, setStateComparason] = useState('maior que');
  //
  const [column, setStateColumn] = useState('population');
  //
  const [population, setStatePopulation] = useState(false);
  const [orbital, setStateOrbital] = useState(false);
  const [diameter, setStateDiameter] = useState(false);
  const [surface, setStateSurface] = useState(false);
  const [rotation, setStateRotation] = useState(false);
  //
  const [values, setStateValue] = useState(0);
  //
  const [filtros, setStateFiltros] = useState(false);

  useEffect(() => {
    const requestAPI = async () => {
      const results = await fetchAPIReturn();
      setStateInic(results);
      setState(results);
    };
    requestAPI();
  }, []);

  const clickFilter = () => {
    selectRemovedA(column, setStatePopulation, setStateOrbital, setStateDiameter);
    selectRemovedB(column, setStateRotation, setStateSurface);
    setStateFiltros(true);
    if (comparason === 'maior que') {
      const filterByOthers = planets.filter((info) => info[column] > Number(values));
      return setState(filterByOthers);
    }
    if (comparason === 'menor que') {
      const filterByOthers = planets.filter((info) => info[column] < Number(values));
      return setState(filterByOthers);
    }
    if (comparason === 'igual a') {
      const filterByOthers = planets
        .filter((info) => Number(info[column]) === Number(values));
      return setState(filterByOthers);
    }
  };
  return (
    <>
      <h1>Projeto Star Wars - Trybe!</h1>
      <label htmlFor="name-filter">
        <input
          name="name-filter"
          type="text"
          data-testid="name-filter"
          id="name-filter"
          onChange={ (event) => (event.target.value.length > 0
            ? setState(planets.filter((info) => info.name.includes(event.target.value)))
            : setState(planetsInic)) }
        />
      </label>
      <select
        name="column-filter"
        data-testid="column-filter"
        onChange={ (event) => setStateColumn(event.target.value) }
        value={ column }
      >
        { !population ? <option>population</option> : '' }
        { !orbital ? <option>orbital_period</option> : '' }
        { !diameter ? <option>diameter</option> : '' }
        { !rotation ? <option>rotation_period</option> : '' }
        { !surface ? <option>surface_water</option> : '' }
      </select>
      <select
        name="comparison-filter"
        data-testid="comparison-filter"
        onChange={ (event) => setStateComparason(event.target.value) }
        value={ comparason }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="value-filter">
        <input
          name="value-filter"
          type="number"
          data-testid="value-filter"
          id="value-filter"
          onChange={ (event) => setStateValue(event.target.value) }
          value={ values }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => clickFilter() }
      >
        Filtrar

      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => setStateFiltros(false) }
      >
        Remover Filtros

      </button>
      { filtros && (
        <section>
          <p>{column}</p>
          <p>{comparason}</p>
          <p>{values}</p>
          <button type="button" data-testid="filter"> X </button>
        </section>)}
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
          { planets[0] && Object.values(planets).map((info, index) => (
            <tr key={ index }>
              <td key={ info.name }>{info.name}</td>
              <td key={ info.rotation_period }>{info.rotation_period}</td>
              <td key={ info.orbital_period }>{ info.orbital_period}</td>
              <td key={ info.diameter }>{info.diameter}</td>
              <td key={ info.climate }>{info.climate}</td>
              <td key={ info.gravity }>{info.gravity}</td>
              <td key={ info.terrain }>{info.terrain}</td>
              <td key={ info.surface_water }>{info.surface_water}</td>
              <td key={ info.population }>{info.population}</td>
              <td key={ info.films }>{info.films}</td>
              <td key={ info.created }>{info.created}</td>
              <td key={ info.edited }>{info.edited}</td>
              <td key={ info.url }>{info.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
