export default function addAlert (list: Element, alert: any) {
  const a = alert.cloneNode(true)
  a.visible = true
  list.appendChild(a)
  setTimeout(() => {
    list.removeChild(a)
  }, 3000)
}