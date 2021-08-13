import React from "react";

const PokemonList = ({ pokemons }) => {
	return (
		<>
			{pokemons.map((pokemon) => {
				return <p key={pokemon}>{pokemon}</p>;
			})}
		</>
	);
};

export default PokemonList;
