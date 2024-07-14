document.addEventListener('DOMContentLoaded', () => {
    loadMonsters();
    createMonsterForm();
    document.getElementById('back').addEventListener('click', loadPreviousMonsters);
    document.getElementById('forward').addEventListener('click', loadMoreMonsters);
  });

    let page = 1;
    const limit = 50;

    
function loadMonsters(){
    fetch("http://localhost:3000/monsters")
    .then(response=> response.json())
    .then(monsters=>{
        const monsterContainer = document.getElementById('monster-container');
        monsterContainer.innerHTML = ''; // Clear existing monsters
        monsters.forEach(monster => displayMonster(monster));
      });
  }
function loadMoreMonsters(){
    page++;
    loadMonsters();
}
function loadPreviousMonsters() {
    if (page > 1) {
      page--;
      loadMonsters();
    }
  }
function displayMonster(monster){
    const monsterContainer = document.getElementById("'monster-container");
    const monsterDiv = document.createElement("div");
    monsterDiv.classList.add("monster");
    monsterDiv.innerHTML=`
    <h3>${monster.name}</h3>
    <p>Age: ${monster.age}</p>
    <p>Description: ${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);

}
function createMonsterForm(){
    const createMonsterDiv = document.getElementById("create-monster");
    createMonsterDiv.innerHTML= `
    <h2>Create Monster</h2>
    <form> 
    <input type="text" id="name"  placeholder="Name" required>
      <input type="number" id="age" placeholder="Age" required>
      <textarea id="description" placeholder="Description" required></textarea>
      <button type="submit">Create Monster</button>
    </form>
    `;
    const form = document.getElementById("new-monster-form");
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const description = document.getElementById("description").value;

        fetch("http://localhost:3000/monsters",{
            method:"POST",
            header:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({name,age,description})
        })
            .then(response=>response.json())
            .then(monster=>{
                displayMonster(monster);
                form.requestFullscreen();
            });

        });
    }

