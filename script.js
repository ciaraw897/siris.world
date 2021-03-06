//RANDOM NUMBER BUTTON
function buttonClick() {
  return Math.floor(Math.random()*1000);
}

//CURRENT DATE
var today = new Date();
var day = today.getDay();
var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
 
document.getElementById("displayDateTime").innerHTML = dateTime + ' <br> Day :- ' + daylist[day];

//METAMASK
// var tipButton = document.querySelector('.tip-button')
// tipButton.addEventListener('click', function() {
//   if (typeof web3 === 'undefined') {
//     return renderMessage('You need to install MetaMask to use this feature. https://metamask.io')
//   }

//   var user_address = web3.eth.accounts[0]
//   web3.eth.sendTransaction({
//     to: YOUR_ADDRESS,
//     from: user_address,
//     value: web3.toWei('1', 'ether'),
//   }, function (err, transactionHash) {
//     if (err) return renderMessage('Oh no!: ' + err.message)

//     // If you get a transactionHash, you can assume it was sent,
//     // or if you want to guarantee it was received, you can poll
//     // for that transaction to be mined first.
//     renderMessage('Thanks for your support!')
//   })
// })

//CONFETTI
//-----------Var Inits--------------
var siriicon = document.querySelector('.siriicon')
const canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 1500;
const gravity = 0.5;
const terminalVelocity = 4;
const drag = 0.075;
const colors = [
  { front : '#CDB4DB', back: '#CDB4DB'},
  { front : '#FFC8DD', back: '#FFC8DD'},
  { front : '#FFAFCC', back: '#FFAFCC'},
  { front : '#FFDCE9', back: '#FFDCE9'},
  { front : '#ff69b4', back: '#ff69b4'}
  ];

//-----------Functions--------------
resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      
      //confetti size
      dimensions: {
        x: randomRange(12, 14),
        y: randomRange(14, 16) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });

  }
};

//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  //this is what makes it go again without doing anything else
  //commenting out for now because it's annoying
  //now only one set goes on load
 // if (confetti.length === 0) initConfetti();

  window.requestAnimationFrame(render);
};

//---------Execution--------
initConfetti();

//----------Resize----------
window.addEventListener('resize', function () {
  resizeCanvas();
});

//------------Click------------
siriicon.addEventListener('click', function () {
  render();
});