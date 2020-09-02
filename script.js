const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const debounce = (func, wait) => {
	let timeout;

	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

const input = document.querySelector('input');

let returnedFunction = debounce(function (e) {
	// All the taxing stuff you do
	console.log(e.target.value);
}, 350);

input.addEventListener('keyup', returnedFunction);
