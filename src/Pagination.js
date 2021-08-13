import React from "react";

const Pagination = ({ nextPage, prevPage }) => {
	return (
		<div>
			{prevPage && <button onClick={prevPage}>Previous</button>}
			{nextPage && <button onClick={nextPage}>Next</button>}
		</div>
	);
};

export default Pagination;
