/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * UI Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const UIHandler = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /************************************************************/
  /************************************************************/

  /**********/
  /********** DISPLAY STOCK ADDER **********/
  /**********/

  _displayStockAdder = () => {
    $(document).on('click', 'a#display-stock-adder', (e) => {
      e.preventDefault()

      const target = $(e.currentTarget)
      
      $('#stock-adder').toggle()

      return false

    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE CLICK **********/
  /**********/

  _handleUIClick = () => {
    return () => {
      _displayStockAdder()
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** INIT **********/
  /**********/

  return {
    init: () => {
      const handler = _handleUIClick()
      handler()
    }
  }

}