const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '809b09f305msha35ee05f81db71cp1e3d24jsn21966b7bd6fe',
		'X-RapidAPI-Host': 'allsportsapi2.p.rapidapi.com'
	}
};

const urlParams = new URLSearchParams(window.location.search);
const tournament = urlParams.get('tournament');

switch (tournament) {
    case 'atp':
        document.getElementById('ATP').classList.add('active');
        document.querySelector('h1').innerText = 'ATP Ranking';
        break;
    case 'wta':
        document.getElementById('WTA').classList.add('active');
        document.querySelector('h1').innerText = 'WTA Ranking';
        break;
}

fetch(`https://allsportsapi2.p.rapidapi.com/api/tennis/rankings/${tournament}`, options)
    .then(response => response.json())
    .then(data => {
        // Aquí guardamos la data en una variable
        const jsonData = data.rankings.slice(0, 50);

        const table = document.querySelector('tbody');

        jsonData.forEach(item => {
            const row = document.createElement('tr');

            const ranking = document.createElement('td');
            ranking.innerText = item.ranking;
            row.appendChild(ranking);

            const country = document.createElement('td');
            country.insertAdjacentHTML('beforeend', `<i class="flag flag-${item.team.country.alpha2.toLowerCase()}"></i>`);
            row.appendChild(country);

            const rowName = document.createElement('td');
            rowName.innerText = item.rowName;
            row.appendChild(rowName);

            const points = document.createElement('td');
            points.innerText = item.points;
            row.appendChild(points);

            table.appendChild(row);
        });
    })
    .catch(err => console.error(err));

