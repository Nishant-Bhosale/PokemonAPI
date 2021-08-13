import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";
import "./App.css";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [currentPageUrl, setCurrentPageUrl] = useState(
		"https://pokeapi.co/api/v2/pokemon/",
	);

	const [nextPageUrl, setNextPageUrl] = useState(null);
	const [prevPageUrl, setPrevPageUrl] = useState(null);

	useEffect(() => {
		axios.get(currentPageUrl).then((res) => {
			console.log(res.data);
			setPokemons(res.data.results.map((pokemon) => pokemon.name));
			setNextPageUrl(res.data.next);
			setPrevPageUrl(res.data.previous);
		});
	}, [currentPageUrl]);

	function gotoNextPage() {
		setCurrentPageUrl(nextPageUrl);
	}

	function gotoPrevPage() {
		setCurrentPageUrl(prevPageUrl);
	}

	return (
		<div style={{ textAlign: "center" }}>
			<h1 style={{ margin: "1rem auto" }}>Pokemon API</h1>
			<PokemonList pokemons={pokemons} />
			<Pagination nextPage={gotoNextPage} prevPage={gotoPrevPage} />
		</div>
	);
}

export default App;
