import MarvelService from "./marvelService.js";

let _marvelService = new MarvelService()


function drawApiHeros() {
  let template = ''
  let heros = _marvelService.ApiHeros
  heros.forEach(h => {
    let button = `<button class="btn btn-primary" onclick="app.controllers.marvelController.addToTeam('${h.id}')">ADD TO TEAM</button>`
    template += h.getCard(button)
  })
  document.querySelector('.marvel-characters').innerHTML = template
}

function drawMyTeam() {
  let template = ''
  let heros = _marvelService.MyTeam
  heros.forEach(h => {
    let button = `<button class= "btn btn-danger" onclick="app.controllers.marvelController.removeFromTeam('${h.id}')">Remove From Team<button>
    <i onclick="app.controllers.marvelController.showEditForm('${h.id}')" class="fas fa-pencil-alt"></i>
    `
    template += h.getCard(button)
  })
  document.querySelector('.myteam').innerHTML = template
}

//public
export default class MarvelController {
  constructor() {
    _marvelService.addSubscriber('apiHeros', drawApiHeros)
    _marvelService.addSubscriber('myTeam', drawMyTeam)

    //Initialize Data
    _marvelService.getMarvelData()
    _marvelService.getMyTeamData()
  }

  addToTeam(id) {
    _marvelService.addToTeam(id)
  }
  removeFromTeam(id) {
    _marvelService.removeFromTeam(id)
  }
  showEditForm(id) {
    document.getElementById(id).hidden = false;
  }

  editHero(event) {
    event.preventDefault();
    let data = {
      id: event.target.id,
      description: event.target.description.value
    }
    _marvelService.editHero(data)
  }
}