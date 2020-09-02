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

const data_content = document.querySelector('#data-content');

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

const createHead = () => {
	//create th content
	const tr = document.createElement('tr');

	const id_head = document.createElement('th'),
		name_head = document.createElement('th'),
		email_head = document.createElement('th');

	id_head.appendChild(document.createTextNode('ID'));
	name_head.appendChild(document.createTextNode('Company Name'));
	email_head.appendChild(document.createTextNode('Owner email'));

	tr.appendChild(id_head);
	tr.appendChild(name_head);
	tr.appendChild(email_head);
	return tr;
};

const renderTable = (e, data) => {
	const table = document.createElement('table');
	table.appendChild(createHead());

	data.map(item => {
		item.company.name
			.toLowerCase()
			.includes(e.target.value.toLowerCase()) &&
			table.appendChild(createItem(item));
	});
	while (data_content.firstChild) {
		data_content.removeChild(data_content.firstChild);
	}
	data_content.appendChild(table);
};

const resolveData = (e, data) => {
	renderTable(e, data);
};
let returnedFunction = debounce(function (e) {
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
			resolveData(e, data);
		})
		.catch(function (err) {
			// There was an error
			console.warn('Something went wrong.', err);
		});
	// console.log(e.target.value);
}, 350);

input.addEventListener('keyup', returnedFunction);
