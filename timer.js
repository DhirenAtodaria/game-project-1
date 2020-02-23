function createProgressbar() {
    const progressbar = document.getElementById("progressbar1");
    progressbar.className = 'progressbar';
    const progressbarinner = document.createElement('div');
    progressbarinner.className = 'inner';
    progressbarinner.style.animationDuration = "5s";

    progressbarinner.addEventListener('animationend', () => {console.log("hello?")});
    progressbar.appendChild(progressbarinner);  
    progressbarinner.style.animationPlayState = 'running';
}
  