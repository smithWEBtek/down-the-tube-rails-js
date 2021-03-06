// Hijack the click function for the 'firearms' button in the navigation.
const firearmsClickHandlers = () => {
  // Using data attribute for targeting instead of .class or #id
  $('[data-list-firearms-link]').on('click', (e) => {
    e.preventDefault()
    history.pushState(null, null, "firearms")
    // Create promise using fetch
    fetch('/firearms.json')
      // On success use .then to start working with the data returned from the promise.
      .then(res => res.json())
      // Start working with the json data response
      .then(firearms => {
        $('#app-container').html('')
        firearms.forEach(firearm => {
          let newFirearm = new Firearm(firearm)
          let firearmHtml = newFirearm.formatIndex()
          console.log(firearmHtml)
          $('#app-container').append(firearmHtml).wrapInner('<div class="d-md-flex flex-md-wrap"><div class="card-group"></div></div>')
        });
        $('#app-container').append('<div class="d-flex justify-content-around"><a class="btn btn-outline-success" href="/firearms/new">New Firearm</a></div>')
      })
  }) // End Firearms Link
  // Begin Firearms add link
}

// Prototype code for Firearm
function Firearm(firearm) {
  this.id = firearm.id
  this.name = firearm.name
  this.description = firearm.description
  this.firearm_type = firearm.firearm_type
  this.firearm_outings = firearm.outings
}

Firearm.prototype.formatIndex = function () {
  console.log(this)
  let firearmHtml = `
  <div class="p-3">
  <div class="card mb-3" style="min-width: 18rem;">
  <div class="card-body">
  <h1><a href="/firearms/${this.id}">${this.name}</a></h1>
    <br>
    <h4>Outings</h4>
    <p>//${this}</p>
  <div class="d-flex justify-content-around">
  <a href="/firearms/${this.id}" class="btn btn-primary">Show</a>
  </div>
  </div>
  </div>
  </div>
   `
  return firearmHtml
} // End Firearm prototype