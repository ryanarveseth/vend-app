const Store = require('electron-store');

// Starts us off with an empty grouping
const defaultGrouping = [
    {
        'name': 'New Group',
        'combos': [],
        'rename': false
    }
];


class Grouping extends Store {
    constructor(settings) {
        super(settings);
        this.groupings = this.get('groupings') || defaultGrouping;
    }

    saveGroupings() {
        this.set('groupings', this.groupings);
        return this;
    }

    getGroupings() {
        this.groupings = this.get('groupings') || defaultGrouping;
        return this;
    }

    addGrouping(grouping) {

        this.groupings = [...new Set([...this.groupings, grouping])];

        return this.saveGroupings();
    }

    setGroupings(groupings) {
        this.groupings = groupings;

        return this.saveGroupings();
    }

    deleteGrouping(grouping) {
        this.groupings = this.groupings.filter(g => 
            g.name !== grouping.name
        );
        return this.saveGroupings();
    }

    changeGroupingName(index, newName) {
        this.groupings[index].name = newName || '';
        return this.saveGroupings();
    }

    deleteCombo(combo) {

        this.groupings = this.groupings.map(g =>
            (
                {
                    'name': g.name,
                    'combos': 
                        g.combos.filter(c => 
                            c.packSize !== combo.packSize &&
                            c.packType !== combo.packType && 
                            c.brand !== combo.brand &&
                            c.bevcat !== combo.bevcat
                            ) || [],
                    'rename': g.rename
                }
            )
        );

        return this.saveGroupings();
    }
}

module.exports = Grouping;