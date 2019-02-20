export default class Hero {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.img = data.img || data.thumbnail.path + "." + data.thumbnail.extension
    this.description = data.description || 'CLASSIFIED'

    //ALTERNATE CLASSIFIED IMAGE
    if (this.img == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
      this.img = 'https://img.fireden.net/co/image/1523/99/1523998363736.png'
    }
  }


  getCard(button) {
    return `
    <div class="col-3">
        <div class="card">
          <img src="${this.img}" class="card-img-top" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.description}</p>
            ${button}
          </div>
          <form hidden id="${this.id}"  onsubmit="app.controllers.marvelController.editHero(event)">
            <input type="text" name="description">
            <button class="btn btn-info" type="submit">Submit</button>
          </form>
        </div>
      </div>
`
  }
}

