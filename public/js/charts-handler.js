/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Charts Handler
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 */

/**************************/
/***** CHARTS HANDLER *****/
/**************************/

/*
 * @var String _id chart's id
 */

const ChartsHandler = (id) => {

  /**********/
  /********** VARS **********/
  /**********/

  /*
   * @var String _id chart's id
   * @var Object _ctx context
   * @var Object _chart the chart
   * @var Object _socket
   */

  let _id = id
  let _ctx = $('#' + _id)
  let _chart
  let _socket = io.connect(window.location.origin)

  /************************************************************/
  /************************************************************/

  /**********/
  /********** GET DATA **********/
  /**********/

  _getData = () => {
    return $.ajax({
      url: window.location.origin + '/stocks/',
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

  /************************************************************/
  /************************************************************/

  /**********/
  /********** GENERATE COLOR **********/
  /**********/

  /*
   * @return String
   */

  _generateColor = () => {
    let r = Math.floor(Math.random() * 200)
    let g = Math.floor(Math.random() * 200)
    let b = Math.floor(Math.random() * 200)
    let color = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.75)'
    return color
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** GENERATE COLORS **********/
  /**********/

  /*
   * @return Array
   */

  _generateColors = (size) => {
    let colors = []
    for (let i= 0; i < size; i++) {
      colors.push(_generateColor())
    }
    return colors
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** REMOVE ELEMENT **********/
  /**********/

  /*
   * @var String label
   * @var Object data
   */

  _removeElement = (label, data) => {

    const removalIndex = _chart.data.datasets.indexOf(data)
    if (removalIndex >= 0) {
      _chart.data.datasets.splice(removalIndex, 1)
      _chart.data.labels.splice(removalIndex, 1)
    }

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** UPDATE CHART **********/
  /**********/

  /*
   * @var String label
   * @var Object data
   */

  _updateChart = (label, data) => {

    _chart.data.labels.push(label)
    _chart.data.datasets.forEach((dataset) => {
      dataset.borderColor = _generateColor()
      dataset.borderWidth = 1
      dataset.data.push(data)
    })
    _chart.update()

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** DISPLAY CHART **********/
  /**********/

  /*
   * @var Object data
   */

  _displayChart = (data) => {
    
    const colors = _generateColors(data.labels.length)
    data.datasets[0].borderColor = colors
    data.datasets[0].borderWidth = 1

    console.log(data)

    _chart = new Chart(_ctx, {
      type: 'line',
      data: data
    })

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** HANDLE LIST **********/
  /**********/

  /*
   * @return Promise
   */

  _handleList = () => {
    return new Promise((resolve) => {
      if ($('#stocks-list').length > 0) {
        resolve()
        return
      }
      $('#no-stocks').hide()
      $('#stocks-options').after('<div class="row"><div class="col-md-12"><ul id="stocks-list"></ul></div></div>')
      resolve()
      return
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** ADD LIST ITEM **********/
  /**********/

  /*
   * @var String stock
   * @var Bool auth
   */

  _addListItem = (stock, auth) => {

    let str = '<li id=' + stock + '>'
    if (auth) {
      str = '<a class="btn btn-default action" href="#" data-action="remove" data-stock="' + stock + '">' + stock + '</a>'
    }
    str +='</li>'

    _handleList().then(() => {
      $('#stocks-list').append(str)
      return
    }).catch((err) => {
      console.warn('Error while updating list...')
      console.error(err)
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** REMOVE LIST ITEM **********/
  /**********/

  /*
   * @var String stock
   */

  _removeListItem = (stock) => {
    ('#stocks-list li#' + stock).remove()

    if ($('#stocks-list').length === 0) {
      $('#stocks-list').hide()
      $('#no-stocks').show()
    }
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** UPDATE LIST **********/
  /**********/

  /*
   * @var String action
   * @var String stock
   * @var Bool auth
   */

  _updateList = (action, stock, auth) => {

    switch(action) {

      case 'add':
        _addListItem(stock, auth)
        break

      case 'delete':
        _removeListItem(stock)
        break

    }

  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** LISTEN ADD EVENT **********/
  /**********/

  _listenAddEvent = () => {
    _socket.on('add', (data) => {
      _updateList('add', data.stock, data.auth)
      _updateChart(data.stock, data.data) 
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** LISTEN DELETE EVENT **********/
  /**********/

  _listenRemoveEvent = () => {
    _socket.on('delete', (data) => {
      _updateList('delete', data.stock, data.auth)
      _removeElement(data.stock, data.data) 
    })
  }

  /************************************************************/
  /************************************************************/

  /**********/
  /********** LISTEN EVENTS **********/
  /**********/

  _listenEvents = () => {
    _listenAddEvent()
    _listenRemoveEvent()
  }

  /************************************************************/
  /************************************************************/

  return {

    /**********/
    /********** INIT **********/
    /**********/

    init: () => {
      _listenEvents()
    },

    /************************************************************/
    /************************************************************/

    /**********/
    /********** GENERATE CHART **********/
    /**********/

    generateChart: () => {
      _getData().then((data) => {

        if (data.error !== null) {
          console.warn('Error during chart generation...')
          console.error(data.error)
          return false
        }

        _displayChart(data.chartData)
        return
        
      }).catch((err) => {
        console.warn('Error during chart generation...')
        console.error(err)
        return false
      })
    }
      
  }

}
