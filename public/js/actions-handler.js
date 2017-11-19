/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Actions Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.11.11
 * @for freeCodeCamp
 */

/****************/
/***** MAIN *****/
/****************/

const ActionsHandler = () => {

  /**********/
  /********** VARS **********/
  /**********/

  /************************************************************/
  /************************************************************/

  /**********/
  /********** MAKE REQUEST **********/
  /**********/

  /*
   * @var String url
   * @var String type
   * @var String action
   * @var Object data
   */

  _makeRequest = (url, type, action, data) => {
    return $.ajax({
      url: window.location.origin + url,
      type: type,
      cache: false,
      dataType: 'json',
      info: {
        action,
        data
      },
      succes: (result) => {
        return result
      },
      error: (err) => {
        return {error: err}
      }
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE CLICK **********/
  /**********/

  _handleClick = () => {
    return () => {
      $(document).on('click', 'a.btn.action', (e) => {
        e.preventDefault()

        $('#message-info').hide()
        $('#message-info').html('')

        const target = $(e.currentTarget)
        const action = target.attr('data-action')
        
        let url = ''
        let type = ''
        let data = {}

        switch (action) {
          case 'add':
            url = '/stocks/add'
            type = 'POST'
            data.stock = $('input#stock-name').val()
            break

          case 'delete':
            url = '/stocks/delete'
            type = 'DELETE'
            data.stock = target.attr('data-stock')
            break
        }

        _makeRequest(url, type, action, data).then((result) => {

          if (result.error !== null) {
            console.warn('Error during request...')
            console.error(result.error)
            return false
          }

          if (result.info === null) {
            socket.emit(action, {
              data: result.data,
              stock: data.stock,
              action: action,
              auth: result.auth
            })
            return true
          }

          $('#message-info').html(result.info)
          $('#message-info').show()
          console.log(result.info)
          return

        }).catch((err) => {
          console.warn('Error during request...')
          console.error(err)
          return false
        })

      })
    }

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** INIT **********/
  /**********/

  return {
    init: () => {
      const handler = _handleClick()
      handler()
    }
  }

}