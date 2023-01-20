const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '809b09f305msha35ee05f81db71cp1e3d24jsn21966b7bd6fe',
        'X-RapidAPI-Host': 'sports-live-scores.p.rapidapi.com'
    }
};

const urlParams = new URLSearchParams(window.location.search);
const tournament = urlParams.get('tournament');

switch (tournament) {
    case '1':
        document.getElementById('Premier').classList.add('active')
        document.querySelector('h1').innerText = 'Premier League Ranking';
        break;
    case '36':
        document.getElementById('Liga').classList.add('active');
        document.querySelector('h1').innerText = 'La Liga Ranking';
        break;
    case '64':
        document.getElementById('Ekstraklasa').classList.add('active');
        document.querySelector('h1').innerText = 'Ekstraklasa Ranking';
        break;
}

fetch(`https://sports-live-scores.p.rapidapi.com/football/rankings/${tournament}`, options)
    .then(response => response.json())
    .then(data => {
        // Aquí guardamos la data en una variable
        const jsonData = data.rankings;

        const table = document.querySelector('tbody');

        jsonData.forEach(item => {
            const row = document.createElement('tr');

            const rank = document.createElement('td');
            rank.innerText = item.Rank;
            row.appendChild(rank);

            const team = document.createElement('td');
            team.innerText = item['Team Name'];
            row.appendChild(team);

            const points = document.createElement('td');
            points.innerText = item.Points;
            row.appendChild(points);

            const wins = document.createElement('td');
            wins.innerText = item.Wins;
            row.appendChild(wins);

            const draws = document.createElement('td');
            draws.innerText = item.Draws;
            row.appendChild(draws);

            const losses = document.createElement('td');
            losses.innerText = item.Losses;
            row.appendChild(losses);

            const matches = document.createElement('td');
            matches.innerText = item.Matches;
            row.appendChild(matches);

            const gs = document.createElement('td');
            gs.innerText = item['Goals Scored'];
            row.appendChild(gs);

            const gc = document.createElement('td');
            gc.innerText = item['Goals Conceded'];
            row.appendChild(gc);

            table.appendChild(row);
        });
    })
    .catch(err => console.error(err));

