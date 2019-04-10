ParallelLifeGame = function(rowMax, colMax, unit) {
    this.rowMax = rowMax;
    this.colMax = colMax;
    this.unit   = unit;

    this.red   = new LifeGame(this.rowMax, this.colMax, this.unit);
    this.blue  = new LifeGame(this.rowMax, this.colMax, this.unit);
    this.green = new LifeGame(this.rowMax, this.colMax, this.unit);

    this.stage = new Konva.Stage({
        container: 'container',
        width:  this.colMax*this.unit,
        height: this.rowMax*this.unit
    });

    this.layer = new Konva.FastLayer();
    this.stage.add(this.layer);

    this.buildLifeMap = function() {
        const lifeMap = this.createLifeMap();
        for (let i=0; i<this.rowMax; i++) {
            for (let j=0; j<this.colMax; j++) {
                this.buildLife(lifeMap, i, j);
            }
        }
        this.lifeMap = lifeMap;
    }

    this.createLifeMap = function () {
        const lifeMap = [];
        for (let i=0; i<this.rowMax; i++) {
            lifeMap.push([]);
        }
        return lifeMap;
    }

    this.buildLife = function(lifeMap, row, col) {
        const life = {};

        life.shape = new Konva.Shape({
            x: col * unit,
            y: row * unit,
            fill: "#000",
            strokeWidth: 0, 
            sceneFunc: function (ctx, shape) {
                const l = unit;
                const x = col;
                const y = row;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(l, 0);
                ctx.lineTo(l, l);
                ctx.lineTo(0, l);
                ctx.closePath();
                ctx.fillStrokeShape(shape);
            }
        });
        this.layer.add(life.shape);

        lifeMap[row][col] = life;
    }

    this.updateLifeMap = function(lifeMap) {
        this.red.updateLifeMap();
        this.green.updateLifeMap();
        this.blue.updateLifeMap();
        for (let i=0; i<this.rowMax; i++) {
            for (let j=0; j<this.colMax; j++) {
                const life = lifeMap[i][j];
                const r = this.red.lifeMap[i][j];
                const g = this.green.lifeMap[i][j];
                const b = this.blue.lifeMap[i][j];
                if ( r.isAlive &&  g.isAlive &&  b.isAlive) life.shape.setFill('#fff');
                if ( r.isAlive &&  g.isAlive && !b.isAlive) life.shape.setFill('#ff0');
                if ( r.isAlive && !g.isAlive &&  b.isAlive) life.shape.setFill('#f0f');
                if ( r.isAlive && !g.isAlive && !b.isAlive) life.shape.setFill('#f00');
                if (!r.isAlive &&  g.isAlive &&  b.isAlive) life.shape.setFill('#0ff');
                if (!r.isAlive &&  g.isAlive && !b.isAlive) life.shape.setFill('#0f0');
                if (!r.isAlive && !g.isAlive &&  b.isAlive) life.shape.setFill('#00f');
                if (!r.isAlive && !g.isAlive && !b.isAlive) life.shape.setFill('#000');
            }
        }
    }

    _this = this;
    this.update = function() {
        _this.updateLifeMap(_this.lifeMap);
        _this.layer.draw();
    }

    this.buildLifeMap();
    this.layer.draw();
}
