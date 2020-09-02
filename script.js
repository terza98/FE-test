//uing ES6 so I'm not switching to strict mode
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

const table = document.querySelector('table');

const createItem = item => {
	const wrapper = document.createElement('tr');
	const id = document.createElement('td'),
		name = document.createElement('td'),
		email = document.createElement('td');

	id.appendChild(document.createTextNode(item.id));
	name.appendChild(document.createTextNode(item.company.name));
	email.appendChild(document.createTextNode(item.email));

	wrapper.appendChild(id);
	wrapper.appendChild(name);
	wrapper.appendChild(email);
	return wrapper;
};

const renderTable = (e, data) => {
	const content = document.createElement('tbody');

	//is data matching the current search query
	const isMatch = string => {
		return string
			.toString()
			.toLowerCase()
			.includes(e.target.value.toLowerCase());
	};
	data.forEach(item => {
		//search by company name, email or id
		(isMatch(item.company.name) ||
			isMatch(item.email) ||
			isMatch(item.id)) &&
			content.appendChild(createItem(item));
	});

	//delete current tbody inside table
	while (table.childNodes[2]) {
		table.removeChild(table.childNodes[2]);
	}
	//append newly ceated tbody
	table.appendChild(content);
};

const fetchData = debounce(function (e) {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(function (response) {
			// The API call was successful!
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then(function (data) {
			// This is the JSON from our response
			renderTable(e, data);
		})
		.catch(function (err) {
			// There was an error
			console.warn('Something went wrong.', err);
		});
}, 350);

input.addEventListener('input', fetchData);
