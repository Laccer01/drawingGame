document.getElementById('lightTheme').addEventListener('click', function() {
    document.body.className = 'light';
    removeSnowflakes();

    var fenyek = document.getElementById('hiddenDiv')
    fenyek.hidden = true;

});

document.getElementById('darkTheme').addEventListener('click', function() {
    document.body.className = 'dark';
    removeSnowflakes();

    var fenyek = document.getElementById('hiddenDiv')
    fenyek.hidden = true;

});

document.getElementById('valentinesTheme').addEventListener('click', function() {
    document.body.className = 'valentines';
    removeSnowflakes();

    var fenyek = document.getElementById('hiddenDiv')
    fenyek.hidden = true;

});

function removeSnowflakes() {
    const existingSnowflakes = document.querySelectorAll('.snowflake');
    existingSnowflakes.forEach(function(snowflake) {
        snowflake.remove();
    });
}
document.getElementById('christmasTheme').addEventListener('click', function() {
    document.body.className = 'christmas';
    removeSnowflakes();
    var fenyek = document.getElementById('hiddenDiv')
    fenyek.removeAttribute("hidden");

    const numSnowflakes = 30; // Number of snowflakes

    // Function to generate random number between min and max
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Create and position snowflakes
    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '&#10052;'; // Snowflake Unicode
        snowflake.style.left = `${getRandomNumber(0, window.innerWidth)}px`;
        snowflake.style.animationDuration = `${getRandomNumber(5, 15)}s`;
        snowflake.style.animationDelay = `${getRandomNumber(0, 10)}s`;
        document.body.appendChild(snowflake);
    }
});






const topSelector = document.querySelector('.toppers');
    const topper = document.querySelector('.topper');
    function changeTopper() {
      topper.textContent = topSelector.value;
    }
    topSelector.addEventListener('change', changeTopper);

    const addButton = document.getElementById('add-present');
    const presents = document.querySelector('.present-container');
    function addPresent() {
      if (presents.textContent.length < 34) {
        presents.textContent += "🎁";
      }
    }
    addButton.addEventListener('click', addPresent);

    const colourPickers = document.querySelectorAll('.colour-picker');
    function changeColour() {
      document.documentElement.style.setProperty(`--${this.name}`, this.value);
    }
    colourPickers.forEach(picker => picker.addEventListener('change', changeColour));

const decSelector = document.querySelector('.decoration-select');
    const tree = document.querySelector('.tree-container');
    const triangles = document.querySelectorAll('#Triangle');
    let lightsContainer = document.getElementById('lights-container');
    function placeDecoration(e) {
      if (decSelector.value !== "" && decSelector.value !== "tinsel") {
        if (decSelector.value === "light") {      
          const light = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
          light.setAttribute("fill", "#FFFF00");
          light.setAttribute("cy", `${e.offsetY}`);
          light.setAttribute("cx", `${e.offsetX - 50}`);
          light.setAttribute("r", "1");
          lightsContainer.appendChild(light);
        } else {
          const decoration = document.createElement('div');
          decoration.textContent = decSelector.value;
          decoration.classList.add('decoration');
          decoration.style.top = `${e.offsetY + 70}px`;
          decoration.style.left = `${e.offsetX - 5}px`;
          tree.appendChild(decoration);
        }
      }
    }
    triangles.forEach(triangle => triangle.addEventListener('click', placeDecoration));

    let startX = 0;
    let startY = 0;
    const mainTree = document.querySelector(".main-tree");
    function startTinsel(e) {
      if (decSelector.value === "tinsel") {
        startX = e.offsetX - 50;
        startY = e.offsetY;
      }
    }
    function endTinsel(e) {
      if (decSelector.value === "tinsel") {
        const tinsel = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        let endX = e.offsetX - 50;
        let endY = e.offsetY;
        tinsel.classList.add("tinsel");
        tinsel.setAttribute("d", `M ${startX},${startY} C ${startX},${startY+18} ${endX},${endY+18} ${endX},${endY} `);
        mainTree.appendChild(tinsel);
      }
    }
    triangles.forEach(triangle => triangle.addEventListener('mousedown', startTinsel));
    triangles.forEach(triangle => triangle.addEventListener('mouseup', endTinsel));

    function twinkle() {
      if (lightsContainer.hasChildNodes()) {
        lightsContainer.querySelectorAll('circle').forEach(light => {
          light.setAttribute('r', `${Math.random()+1}`);
        });
      }
    }
    setInterval(twinkle, 500);
    twinkle();

    const snowButton = document.getElementById('snow-button');
    const stopButton = document.getElementById('stop-button');
    const snowContainer = document.querySelector('.snow-container');
    const sleighBellsSound = document.getElementById('sleigh-bells');
    let snowing = null;

    function letItSnow() {
      stopButton.classList.remove("hidden-button");
      snowButton.classList.add("hidden-button");
      function createFlake() {
        let flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.style.top = '0px';
        flake.style.left = `${Math.random() * window.innerWidth}px`;
        snowContainer.appendChild(flake);
        function snowfall() {
          let topValue = parseInt(flake.style.top.slice(0, flake.style.top.length-2), 10);
          if (topValue < 650) {
            flake.style.top = `${topValue + 1}px`;
          } else {
            flake.remove();
          }
        }
        setInterval(snowfall, (Math.random() * 100) + 10);
        snowfall();
      }

      snowing = setInterval(createFlake, 2000);
    }

    function stopSnow() {
      snowButton.classList.remove("hidden-button");
      stopButton.classList.add("hidden-button");
      clearInterval(snowing);
    }
    snowButton.addEventListener('click', letItSnow);
    stopButton.addEventListener('click', stopSnow);

    const catButton = document.getElementById("cat-button");
    const catSound = document.getElementById("cat-meow");
    const catWarning = document.getElementById("cat-warning");
    function dropDecs() {
      if (!document.querySelectorAll(".decoration").length) {
        catWarning.textContent = "Add some decorations first!";
      } else {
        catWarning.textContent = "";
        Array.from(document.querySelectorAll(".decoration")).filter((dec, index) => index % 2 === 1).forEach(decoration => {
          decoration.style.top = `${(Math.random()*30)+610}px`;
          decoration.style.transform = `rotate(${(Math.random()*180)-90}deg)`;
        });
      }
    }
    catButton.addEventListener('click', dropDecs);