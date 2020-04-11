const Store = require('electron-store');

class Combinations extends Store {
    constructor(settings) {
        super(settings);
        this.combos = this.get('combos') || [];
    }

    getCombos() {
        this.combos = this.get('combos') || [];
        return this;
    }
}

module.exports = Combinations;