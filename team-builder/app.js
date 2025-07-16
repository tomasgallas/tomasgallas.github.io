(() => {
  const textarea = document.getElementById('inputList');
  const btnGenerateTeams = document.getElementById('btnGenerateTeams');
  const btnReshuffle = document.getElementById('btnReshuffle');
  const teamsContainer = document.getElementById('teamsContainer');
  const warning = document.getElementById('warning');

  let teams = { team1: [], team2: [] };

  function splitTeams(players) {
    const shuffled = players.sort(() => Math.random() - 0.5);
    const half = players.length / 2;
    return { team1: shuffled.slice(0, half), team2: shuffled.slice(half) };
  }

  function render() {
    warning.textContent = '';
    teamsContainer.innerHTML = 
      `<div class="col-md-6">
         <div class="team-box">
           <h5>Equipo 1</h5>
           <ul id="list1" class="list-group list-group-flush">
             ${teams.team1.map(p => `<li class="list-group-item">${p}</li>`).join('')}
           </ul>
         </div>
       </div>` +
      `<div class="col-md-6">
         <div class="team-box">
           <h5>Equipo 2</h5>
           <ul id="list2" class="list-group list-group-flush">
             ${teams.team2.map(p => `<li class="list-group-item">${p}</li>`).join('')}
           </ul>
         </div>
       </div>`;

    // Añadir listener de swap
    ['list1', 'list2'].forEach(id => {
      document.getElementById(id).querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', () => {
          const from = id === 'list1' ? 'team1' : 'team2';
          const to = from === 'team1' ? 'team2' : 'team1';
          const name = item.textContent;
          teams[from] = teams[from].filter(p => p !== name);
          teams[to].push(name);
          render();
        });
      });

      // Check balance
      const count1 = teams.team1.length;
      const count2 = teams.team2.length;
      if (count1 !== count2) {
        warning.textContent = '¡Un equipo tiene más jugadores!';
      }
    });
  }

  btnGenerateTeams.addEventListener('click', () => {
    const lines = textarea.value.trim().split('\n').map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
    if (lines.length < 8 || lines.length > 22 || lines.length % 2 !== 0) {
      return alert('Cantidad de jugadores debe ser par y entre 8 y 22.');
    }
    teams = splitTeams(lines);
    render();
    btnReshuffle.disabled = false;
  });

  btnReshuffle.addEventListener('click', () => {
    teams = splitTeams([...teams.team1, ...teams.team2]);
    render();
  });
})();
