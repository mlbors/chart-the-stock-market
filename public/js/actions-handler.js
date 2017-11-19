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

  /*
   * @var Object _socket
   */

  let _socket = io.connect(window.location.origin)

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
      data: {
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
  /********** ACTION CLICK **********/
  /**********/

  _actionClick = () => {
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

      _makeRequest(url, type, action, JSON.stringify(data)).then((result) => {

        if (result.error !== null) {
          console.warn('Error during request...')
          console.error(result.error)
          return false
        }

        if (result.info === null) {

          if (action === 'add') {
            $('#stock-adder').hide()
            $('input#stock-name').val('')
          }

          _socket.emit(action, {
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

   /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE CLICK **********/
  /**********/

  _handleActionsClick = () => {
    return () => {
      _actionClick()
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** INIT **********/
  /**********/

  return {
    init: () => {
      const handler = _handleActionsClick()
      handler()
    }
  }

}