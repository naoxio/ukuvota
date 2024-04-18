export default function addAlert (list: Element, alert: any, timeout = 3000) {
  const a = alert.cloneNode(true)
  a.visible = true
  a.style.display = "flex"
  list.appendChild(a)
  if (timeout !== -1) {
    setTimeout(() => {
      list.removeChild(a)
    }, timeout)
  }
  return a
}
