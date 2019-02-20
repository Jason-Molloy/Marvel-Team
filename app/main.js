import MarvelController from "./components/marvelController.js";






class App {
  constructor() {
    this.controllers = {
      marvelController: new MarvelController
    }
  }
}


window.app = new App()