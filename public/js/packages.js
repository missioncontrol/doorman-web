function attach() {
  var items = [].slice.call(document.querySelectorAll('.package-item'))

  console.log(items);

  items.map(function (pkg) {
    pkg.addEventListener('click', function (ev) {
      console.log(JSON.parse(this.getAttribute('data-datum')))
      var log = this.querySelector('.package-log')

      var html = log.innerHTML
      log.innerText = 'Logged!'

      setTimeout(function () {
        log.innerHTML = html
      }, 600)
    }.bind(pkg))
  })

  document
    .querySelector('button.schedule')
    .addEventListener('click', function () {
      window.location.href = '/schedule'
    })
}

document.addEventListener('DOMContentLoaded', attach)
