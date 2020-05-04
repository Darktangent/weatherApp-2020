// const weatherForm = document.querySelector('form');
// const search = document.querySelector('input');
// const msg1 = document.querySelector('.msg1');
// const msg2 = document.querySelector('.msg2');
// const wrapper = document.querySelector('.main-content');
// async function fetchData(location) {
// 	const data = await fetch(`http://localhost:3000/weather?address=${location}`);
// 	const json = await data.json();
// 	if (!data.error) {
// 		console.log(json.forecast);
// 		msg1.textContent = json.place;
// 		msg2.textContent = json.forecast;
// 	} else {
// 		// const json = await data.json();
// 		msg1.textContent = json.error;
// 		msg2.textContent = '';
// 		// wrapper.appendChild(msg1);
// 		// wrapper.appendChild(msg2);
// 	}
// }

// // msg1.textContent = '';
// // msg2.textContent = '';
// weatherForm.addEventListener('submit', (e) => {
// 	e.preventDefault();
// 	const location = search.value;
// 	msg1.textContent = 'Loading';
// 	// console.log(location);
// 	fetchData(location);
// });
console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
});
