// Helpers
const $ = (sel, el = document) => el.querySelector(sel)

// Prepare elements
const input = $('[list=data]')
const list = $('#data')
const main = $('main')
const templateRoom = $('#room')

// Prepare data
let allData = []


// List event
input.addEventListener('change', (e) => {
  const datum = allData.find((d) => d.english === input.value)
  if (!datum) return

  switch (datum.type) {
    case 'room': return showRoom(datum)
  }
})

// Show element
const showRoom = (datum) => {
  // Populate template
  const content = templateRoom.content
  $('h1', content).textContent = datum.french
  $('h2', content).textContent = datum.english
  $('p', content).textContent = datum.text

  // Empty main and clone template
  main.innerHTML = ''
  const el = document.importNode(content, true)
  main.append(el)
}

// Add data to the list independently of the source
const addDataToList = (data) => {
  // Add english values to the list
  const options = data.map((d) => new Option(d.english))
  list.append.apply(list, options)

  // Add data to allData
  allData = allData.concat(data)
}

d3.tsv('rooms.tsv', (err, data) => {
  // Add type
  data.forEach((d) => d.type = 'room')
  addDataToList(data)
})