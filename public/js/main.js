/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Main
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const Main = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /*
   * @var Object _actionsHandler object that handles actions on buttons
   * @var Object _chartsHandlerr Object that handles charts in front end
   * @var Object _uiHandler Object that handles UI
   * @var Object _usersHandler Object that handles user's data
   */

  let _actionsHandler = ActionsHandler()
  let _chartsHandler
  let _uiHandler = UIHandler()
  let _usersHandler = UsersHandler()

  /************************************************************/
  /************************************************************/

  /**********/
  /********** LOAD **********/
  /**********/

  _load = () => {
    
    $(window).on('load', () => {
      
    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** READY **********/
  /**********/

  _ready = () => {

    $(document).ready(() => {

      _usersHandler.getStatus().then((userData) => {

        _actionsHandler.init()
        _uiHandler.init()
  
        if ($('#main-chart').length > 0) {
          _chartsHandler = ChartsHandler('main-chart', userData.auth)
          _chartsHandler.init()
          _chartsHandler.generateChart()
        }

      }).catch((e) => {
        console.warn('Error while getting user data...')
        console.error(err)
        return false
      })

    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** INIT **********/
  /**********/

  return {
    init: () => {
      _load()
      _ready()
    }
  }

}

/************************************************************/
/************************************************************/

/****************/
/***** INIT *****/
/****************/

const main = Main()
main.init()
