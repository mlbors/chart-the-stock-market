/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Users Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const UsersHandler = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /************************************************************/
  /************************************************************/

  return {

    /**********/
    /********** GET STATUS **********/
    /**********/

    getStatus: () => {
      return $.ajax({
        url: window.location.origin + '/users/status',
        type: 'GET',
        cache: false,
        dataType: 'json',
        succes: (result) => {
          return result
        },
        error: (err) => {
          return {error: err}
        }
      })
    }
  }

}