/*--------------------
Vars
--------------------*/
let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));

/*--------------------
Items
--------------------*/



const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");
const fon = document.querySelector('.fon');
const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);

fon.style.setProperty("transform",`translateY(${(-1510*(zIndex-1))}px)`);
  };

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;    

    animate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

/*--------------------
Listeners
--------------------*/
document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);






let speed = 0;
const setScaleDelorian = () => {
  const delorian = document.querySelector(".delorian");

    let scale = 1 / (scrollY / 10000) - scrollY / 6000;
    delorian.style.transform = `scale(${scale > 0 ? scale : 0})`;

    speed = Math.floor(scrollY / 70) - 32;

    if (speed >= 88) speed = 88;
    if (speed <= 0) speed = 0;


    document.querySelector(".speed").innerHTML = speed;
    document.querySelector(".speed").style.fontSize=`${speed*7}px` ;
};

window.addEventListener("scroll", () => {
  setScaleDelorian();

  scrollY > 5500 ? document.querySelector("body").classList.add("dark") : document.querySelector("body").classList.remove("dark");
});

const bloc = document.querySelectorAll(".galary .text");
const img = document.querySelectorAll(".galary .img");
const back = document.querySelectorAll(".galary span");

for (let i = 0; i < bloc.length; i++) {
  bloc[i].onclick = function () {
    img[i].classList.toggle("revers");
  };
}


