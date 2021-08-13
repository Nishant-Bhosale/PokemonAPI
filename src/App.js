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

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		let cancel;

		axios
			.get(currentPageUrl, {
				cancelToken: new axios.CancelToken((c) => (cancel = c)),
			})
			.then((res) => {
				setPokemons(res.data.results.map((pokemon) => pokemon.name));
				setNextPageUrl(res.data.next);
				setPrevPageUrl(res.data.previous);
				setLoading(false);
			});

		return () => cancel();
	}, [currentPageUrl]);

	if (loading) return <p>Loading</p>;

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
			<Pagination
				nextPage={nextPageUrl ? gotoNextPage : null}
				prevPage={prevPageUrl ? gotoPrevPage : null}
			/>
		</div>
	);
}

export default App;
