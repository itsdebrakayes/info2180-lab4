document.getElementById('searchButton').addEventListener('click', function () {
    const query = document.getElementById('searchField').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
  
    // Clear previous result
    resultDiv.innerHTML = '';
  
    // AJAX Request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `superheroes.php`, true);
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xhr.responseText, 'text/html');
        const heroesList = Array.from(doc.querySelectorAll('li')).map(li => li.textContent);
  
        if (query === '') {
          // Display full list of superheroes
          resultDiv.innerHTML = `
            <ul>
                <?php foreach ($superheroes as $superhero): ?>
                 <li><?= $superhero['alias']; ?></li>
                <?php endforeach; ?>
          </ul>
          `;
        } else {
          // Search for a specific superhero
          const match = heroesList.find(hero => hero.toLowerCase().includes(query));
          if (match) {
            resultDiv.innerHTML = `<p>${match} found in the database.</p>`;
          } else {
            resultDiv.innerHTML = '<p>Superhero not found</p>';
          }
        }
      } else {
        resultDiv.innerHTML = '<p>Error fetching data</p>';
      }
    };
  
    xhr.onerror = function () {
      resultDiv.innerHTML = '<p>Error making request</p>';
    };
  
    xhr.send();
  });
  