window.addEventListener("load", function() {

    const containerElm = document.getElementById("container");
    const width  = containerElm.clientWidth;
    const height = containerElm.clientHeight;

    const opt = {
        unit : 4,
        fps  : 2
    }

    opt.rowMax = Math.floor(height/opt.unit),
    opt.colMax = Math.floor(width /opt.unit),

    PLG = new ParallelLifeGame(opt.rowMax, opt.colMax, opt.unit);

    setInterval(PLG.update, 1000/opt.fps);
});
