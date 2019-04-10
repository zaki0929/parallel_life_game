LifeGame = function(rowMax, colMax, unit){
    this.rowMax = rowMax;
    this.colMax = colMax;
    this.unit   = unit;

    this.buildLifeMap = function() {
        const lifeMap = this.createLifeMap();
        for (let i=0; i<this.rowMax; i++) {
            for (let j=0; j<this.colMax; j++) {
                this.buildLife(lifeMap, i, j);
            }
        }
        this.lifeMap = lifeMap;
    }

    this.createLifeMap = function() {
        const lifeMap = [];
        for (let i=0; i<this.rowMax; i++) {
            lifeMap.push([]);
        }
        return lifeMap;
    }

    this.buildLife = function(lifeMap, row, col) {
        const life = {};

        life.turnON = function() {
            this.isAlive = true;
        }

        life.turnOFF = function() {
            this.isAlive = false;
        }

        if (Math.floor(Math.random()*10) < 5) {
            life.turnON();
        } else {
            life.turnOFF();
        }

        lifeMap[row][col] = life;
    }

    this.updateLifeMap = function() {
        const nextLifeMap = this.createLifeMap();
        for (let i=0; i<this.rowMax; i++) {
            for (let j=0; j<this.colMax; j++) {
                nextLifeMap[i][j] = this.getNextIsAlive(i, j, this.lifeMap);
            }
        }
        for (let i=0; i<this.rowMax; i++) {
            for (let j=0; j<this.colMax; j++) {
                const life = this.lifeMap[i][j];
                if (nextLifeMap[i][j]) {
                    life.turnON();
                } else {
                    life.turnOFF();
                }
            }
        }
    }

    this.getNextIsAlive = function(row, col, lifeMap) {
       const life = lifeMap[row][col];
       const aliveNum = this.getAliveNum(row, col, lifeMap);
       if (life.isAlive) {
           return aliveNum == 2 || aliveNum == 3;
       } else {
           return aliveNum == 3;
       }
    }

    this.getAliveNum = function(row, col, lifeMap) {
        let aliveNum = 0;
        if (this.getIsAlive(row-1, col-1, lifeMap)) aliveNum++;
        if (this.getIsAlive(row  , col-1, lifeMap)) aliveNum++;
        if (this.getIsAlive(row+1, col-1, lifeMap)) aliveNum++;
        if (this.getIsAlive(row+1, col  , lifeMap)) aliveNum++;
        if (this.getIsAlive(row+1, col+1, lifeMap)) aliveNum++;
        if (this.getIsAlive(row  , col+1, lifeMap)) aliveNum++;
        if (this.getIsAlive(row-1, col+1, lifeMap)) aliveNum++;
        if (this.getIsAlive(row-1, col  , lifeMap)) aliveNum++;
        return aliveNum;
    }
    
    this.getIsAlive = function(row, col, lifeMap) {
        if (row == -1) row = rowMax-1;
        if (col == -1) col = colMax-1;
        if (row == rowMax) row = 0;
        if (col == colMax) col = 0;
        return lifeMap[row][col].isAlive;
    }

    this.buildLifeMap();
}
