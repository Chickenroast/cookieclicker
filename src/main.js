// import "./scss/styles.scss";

document.addEventListener("DOMContentLoaded", function () {
  // NOS DECLARATIONS

  let i = 1;
  let points = 0;
  let autoClickEnabled = false;
  let autoClickInterval;
    
  const x2 = document.getElementById("boutonpop");
  const pointsElement = document.getElementById("scoreclickbonus");
  const startButton = document.getElementById("boutonautoclick");
  const cookieclic = document.getElementById("cookie1");
  const pointsnobonus = document.getElementById("scoreclick");
  const pointsmoney = document.getElementById("scoremoney");
  const multi = document.getElementById("boutonmulti");
  let coutmulti = 10;
  let multiMultiplier = 1;
  let nouveau = 5;
  let costx2 = 10000;
  let costAuto = 150;
 
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("accept-cookies");

  const svgElement = document.querySelector(".zoomable-svg");
  const clicSound = document.getElementById("clicSound");
  const clicSound2 = document.getElementById("clicSound2");

  // Affichez le cookie banner

  acceptButton.addEventListener("click", () => {
    // Masquez le cookie banner lors du clic
    cookieBanner.style.display = "none";
  });

  // FONCTION COCHON

  svgElement.addEventListener("click", function () {
    svgElement.classList.add("accelerate");
    clicSound.play();
    setTimeout(() => {
      svgElement.classList.remove("accelerate");
    }, 50); // Réglez la durée du clic en millisecondes
  });

  //FONCTION COOKIECLICK ------------------------------------------------------------------------------------------------

  cookieclic.addEventListener("click", function () {
    points += i;
    pointsnobonus.textContent = points;
    let moneyValue = parseInt(pointsmoney.textContent);
    moneyValue++;
    const iconHtml = '<i class="fa-solid fa-dollar-sign"></i>';
    if (multiMultiplier !== 1) {
      moneyValue = moneyValue + nouveau - 6;
      pointsmoney.innerHTML = iconHtml + ' '+ moneyValue  ;
    } else {
      pointsmoney.innerHTML = iconHtml + ' '+ moneyValue ;
    }
      pointsmoney.textContent = moneyValue;

         
    checkMulti();
    checkx2();
    checkAuto();
        
  });

cookieclic.addEventListener("click", function () {
  const dollarIcon = document.getElementById("dollar-icon");

    // Ajoute une classe CSS pour l'animation de rotation
    dollarIcon.classList.add("rotate-animation");

    // Supprime la classe après un court délai pour réinitialiser l'animation
    setTimeout(() => {
        dollarIcon.classList.remove("rotate-animation");
    }, 1000); // Réinitialisation de l'animation après 1 seconde (vous pouvez ajuster la durée selon vos préférences)
});


  // bouton multi //
 
  
  // bouton multi --------------------------------------------------------------------------------------------------

  /*étendre le bouton multi*/
  function multiOff() {
    multi.disabled = true;
  }

  /*allumé le bouton multi*/
  function multiOn() {
    multi.disabled = false;
  }

  
  // Appelez cette fonction pour mettre à jour le texte du bouton lorsque nécessaire
  function augCoutMulti() {
    multiMultiplier++;
    nouveau += 5;
    updateButtonText(); // Met à jour le texte du bouton
  }

  /*Vérifie si on a assez d'argent pour acheter un bouton multi, si oui le bouton est allumé, si non il est éteint */
  function checkMulti() {
    let moneyValue = parseInt(pointsmoney.textContent);
    if (moneyValue >= coutmulti * multiMultiplier) {
      multiOn();
    } else {
      multiOff();
    }
  }
  function updateButtonText() {
    let x = coutmulti * multiMultiplier;
    const buttonText = `${x}`;
    const bonusText = `+5 x${multiMultiplier - 1}`;
    const iconHtml = '<i class="fa-solid fa-dollar-sign"></i>';
    multi.innerHTML = `<div>${iconHtml} ${buttonText}</div><div>${bonusText}</div>`;
    return x;
  }

  // Déclarer une variable globale pour stocker le texte initial du bouton
  let initialButtonText = multi.innerHTML;

  // Gérer le clic sur le bouton multi
  multi.addEventListener("click", function () {
    let moneyValue = parseInt(pointsmoney.textContent);
    pointsmoney.textContent = moneyValue - coutmulti * multiMultiplier;

    updateButtonText();
    augCoutMulti();
    checkMulti();
    checkx2();
    checkAuto();

    // Déclencher un délai de 4 secondes pour réinitialiser le texte du bouton
    setTimeout(function () {
      multi.innerHTML = initialButtonText;
    }, 4000); // Réinitialisation après 4 secondes
  });

  // ...

  //FONCTION AUTOCLICK -------------------------------------------------------------------------

  function autoClickOn(){
    startButton.disabled = false;

  }

  function autoClickOff(){
    startButton.disabled = true;
  }

  /*Vérifie si on a assez d'argent pour acheter un bouton auto, si oui le bouton est allumé, si non il est éteint */
  function checkAuto() {
    let moneyValue = parseInt(pointsmoney.textContent);
    if (moneyValue >= 150 && !autoClickEnabled) {
      autoClickOn();
    } else {
      autoClickOff();
    }
  }

  startButton.addEventListener("click", () => {
    clicSound2.play();
    if (!autoClickEnabled && costAuto >= 150) {
      subtractPoints(150);
      startAutoClick();
      autoClickEnabled = true;
      autoClickOff();
    }
  });

  function autoClick() {
    clicSound2.play();
    addPoints(+1);
    checkMulti();
    checkx2();
       
  }

  function startAutoClick() {
    // TEMPS DU CLICK
    autoClickInterval = setInterval(autoClick, 500);
  }

  /**
   * @description rajouter des points dans html
   * @param {number} value
   */

  function addPoints() {
    let moneyValue = parseInt(pointsmoney.textContent);
    moneyValue++;
    pointsmoney.textContent = moneyValue;
  }

  function subtractPoints(value) {
    pointsmoney.textContent -= value;
  }

  // Appelez cette fonction au chargement de la page pour initialiser le score.
  function initializeGame() {
    points = 0;
    pointsElement.textContent = 0;
    pointsmoney.textContent = 0;
  }

  // bouton score X2 ----------------------------------------------------

  /*étendre le bouton x2*/
  function x2Off(){
    x2.disabled = true;
  }
  
  /*allumé le bouton x2*/
  function x2On(){
    x2.disabled = false;
  }
  
  // check if x2 is Enabled
  let isX2Enabled = true;
 
  /*Vérifie si on a assez d'argent pour acheter un bouton x2, si oui le bouton est allumé, si non il est éteint */
function checkx2(){ 
  let moneyValue = parseInt(pointsmoney.textContent);
  if (moneyValue >= costx2 && isX2Enabled ){
    x2On();
  } else if (countdownStarted && isX2Enabled){
    x2On();
  } else {
    x2Off();
  }
}

// Déclarer une variable globale pour stocker le texte initial du bouton x2
let x2ButtonText = x2.innerHTML;

// check if countdown has started //
let countdownStarted = false;

function countdownx2(){
  var count = 5;
  var countdown = setInterval(function() {
    count--;
    x2.innerText = count + ' seconds left';
    if (count === 0) {
      clearInterval(countdown);
      x2.innerHTML = x2ButtonText;
      isX2Enabled = false;
    }
  }, 1000);
}

x2.addEventListener('click', function(){
  if (!countdownStarted) {
    countdownStarted = true;
    countdownx2();
    let moneyValue = parseInt(pointsmoney.textContent);
    if (moneyValue >= costx2) {
      pointsmoney.textContent = moneyValue - costx2; // Deduct the cost of x2
    }
  }
  
  let moneyValue = parseInt(pointsmoney.textContent);
  pointsmoney.textContent = moneyValue * 2; 
  

  setTimeout(function() {
    
    pointsmoney.textContent = parseInt(pointsmoney.textContent) - costx2;
  }, 5000);
  
});


// function to disable all buttons

function loadbutton(){
  multiOff();
  x2Off();
  autoClickOff()
};
  
  initializeGame();
  window.onload = loadbutton(); // on load disable buttons
});

let resetClicked = false; // Variable pour suivre si le bouton Reset a été cliqué


// // le bouton RESET
document.getElementById('resetButton').addEventListener('click', function() {
  // Réinitialisation : rechargement de la page
  
  location.reload();
  return resetClicked = "true";
});



// let resetClicked = false; // Variable pour suivre si le bouton Reset a été cliqué

// // Fonction pour ouvrir la fenêtre modale au chargement de la page
function openModalOnLoad() {
  if (!resetClicked) { // Vérifier si le bouton Reset n'a pas été cliqué
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("myModal").style.display = "block";
  }
}

// Appeler la fonction pour ouvrir la fenêtre modale au chargement de la page
window.addEventListener("DOMContentLoaded", openModalOnLoad);

// Écouter le clic sur le bouton RESET
document.getElementById("resetButton").addEventListener("click", function () {
  resetClicked = true; // Le bouton Reset a été cliqué
  // Réinitialiser les valeurs ou effectuer d'autres actions de réinitialisation ici
  document.getElementById("modalOverlay").style.display = "none"; // Cacher la fenêtre modale
  document.getElementById("myModal").style.display = "none";
});

// Fermer la fenêtre modale lorsque le bouton "Fermer" est cliqué
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("modalOverlay").style.display = "none";
  document.getElementById("myModal").style.display = "none";
});




// // Fonction pour ouvrir la fenêtre modale au chargement de la page
// function openModalOnLoad() {
//   if (!resetClicked) { // Vérifier si le bouton Reset n'a pas été cliqué
//     document.getElementById("modalOverlay").style.display = "block";
//     document.getElementById("myModal").style.display = "block";
//   }
// }

// // Appeler la fonction pour ouvrir la fenêtre modale au chargement de la page
// window.addEventListener("DOMContentLoaded", openModalOnLoad);

// // Écouter le clic sur le bouton RESET
// document.getElementById("resetButton").addEventListener("click", function () {
//   resetClicked = true; // Le bouton Reset a été cliqué
//   // Réinitialiser les valeurs ou effectuer d'autres actions de réinitialisation ici
//   document.getElementById("modalOverlay").style.display = "none"; // Cacher la fenêtre modale
//   document.getElementById("myModal").style.display = "none";
// });

// // Fermer la fenêtre modale lorsque le bouton "Fermer" est cliqué
// document.getElementById("closeModal").addEventListener("click", function () {
//   document.getElementById("modalOverlay").style.display = "none";
//   document.getElementById("myModal").style.display = "none";
// });