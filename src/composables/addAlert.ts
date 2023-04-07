export  function addAlert (list: Element, alert: any) {
    alert.visible = true

    list.appendChild(alert)
    setTimeout(() => {
      list.removeChild(alert)
    }, 3000)
  }