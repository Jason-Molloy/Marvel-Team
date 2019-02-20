//private
import Hero from "../models/hero.js";

//provide controls to GET/POST/PUT/DELETE
let _marvelAPI = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public'
})
//private

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/JMolloy/heroes'
})

/* var schema = new schema({
  name:{type: string, required: true},
  img:{type: string, required: true},
  description:{type: string, required: true},
  user:{type: string, required: true}})(edited)
  */
//variable controls for Marvel
let _characters = 'characters?limit=50'
let _offset = 960
let _apiKey = '53496df3cd682930aa9108759e347171'

let _state = {
  apiHeros: [],
  myTeam: []
}

let _subscribers = {
  apiHeros: [],
  myTeam: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}

//public
export default class MarvelService {


  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }
  get ApiHeros() {
    return _state.apiHeros.map(h => new Hero(h))
  }

  get MyTeam() {
    return _state.myTeam.map(h => new Hero(h))
  }
  //POST DATA
  addToTeam(id) {
    //find hero
    let hero = _state.apiHeros.find(hero => hero.id == id)
    //find if hero is already in list
    let myHero = _state.myTeam.find(h => h.name == hero.name)
    //prevent adding duplicates
    if (myHero) {
      alert('DUPLICATE HERO')
      return
    }
    //SEND DATA TO SERVER
    //first parameter is appendedon baseURL, second parameter is data to send
    _sandbox.post('', hero)
      .then(res => {
        this.getMyTeamData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  //GET DATA
  getMyTeamData() {
    _sandbox.get()
      .then(res => {
        let data = res.data.data.map(d => new Hero(d))
        setState('myTeam', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  getMarvelData() {
    _marvelAPI.get(`${_characters}&offset=${_offset}&apikey=${_apiKey}`)
      .then(res => {
        let data = res.data.data.results.map(d => new Hero(d))
        setState('apiHeros', data)
      })
      .catch(err => {
        console.error('error')
      })
  }
  //DELETE DATA 
  removeFromTeam(id) {
    _sandbox.delete(id)
      .then(res => {
        console.log(res.data)
        this.getMyTeamData()
      })
      .catch(err => {
        console.error('error')
      })
  }

  editHero(newData) {
    _sandbox.put(newData.id, newData)
      .then(res => {
        this.getMyTeamData()
      })
  }
}

