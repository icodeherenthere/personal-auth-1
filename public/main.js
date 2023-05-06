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

// retrieve targetDate from localStorage, or set a new target date
let targetDate = new Date(localStorage.getItem("targetDate"));
if (!targetDate || targetDate < new Date()) {
  targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1);
  localStorage.setItem("targetDate", targetDate);
}

// update the countdown every second
setInterval(updateCountdown, 1000);

function updateCountdown() {
  // get the current date and time
  let currentDate = new Date();

  // calculate the time remaining until the target date
  let timeRemaining = targetDate.getTime() - currentDate.getTime() + (1000 * 60 * 60 * 49);

  // calculate the number of hours, minutes, and seconds remaining
  let hoursRemaining = 0
  let minutesRemaining = 0
  let secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
  // let hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  // let minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  // let secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  // update the HTML to display the time remaining
  document.getElementById("hours").textContent = hoursRemaining.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutesRemaining.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = secondsRemaining.toString().padStart(2, "0");
  
  if(hoursRemaining === 24 && minutesRemaining === 0){
    alert('24 hr left!')
  }

  if(hoursRemaining === 12 && minutesRemaining === 0){
    alert('12 hr left!')
  }
  if(hoursRemaining === 6 && minutesRemaining === 0){
    alert('6 hr left!')
  }

  if(hoursRemaining === 1 && minutesRemaining === 0){
  alert('1 hr left!')
  }

  if (timeRemaining <= 0) {
    // get the bid price of the item
    let newPrice = `${info[i].bidPrice}`;
    
    // compare the current price to the initial price
    if (newPrice > currentPrice) {
      alert("Winner!");
    } else {
      alert("No winner.");
    }
  }
  console.log(timeRemaining, "here")

}
updateCountdown()

