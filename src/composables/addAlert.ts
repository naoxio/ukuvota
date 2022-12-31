export  function addAlert (list: Element, alert: any) {
    alert.style.display = "block"
    list.appendChild(alert)
    setTimeout(() => {
      list.removeChild(alert)
    }, 3000)
  }