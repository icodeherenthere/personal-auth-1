var bidButton = document.getElementsByClassName("bidButton");
var trash = document.getElementsByClassName("fa-trash");

Array.from(bidButton).forEach(function(element) {
      element.addEventListener('click', function(){
        const carName = this.parentNode.parentNode.childNodes[1].innerText
        const bidPrice = parseFloat(this.parentNode.parentNode.querySelector('.bid').value)
        fetch('info/bidPrice', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'carName': carName,
            'bidPrice': bidPrice
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const carName = this.parentNode.parentNode.childNodes[1].innerText
        const img = this.parentNode.parentNode.childNodes[3].innerText
        const askPrice = this.parentNode.parentNode.childNodes[5].innerText
        const bidPrice = parseFloat(this.parentNode.parentNode.querySelector('.bid').value)
        fetch('info', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'carName': carName,
            'img': img,
            'askPrice': askPrice,
            'bidPrice': bidPrice
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
