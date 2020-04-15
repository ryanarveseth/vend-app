const Store = require('electron-store');

// Starts us off with an empty grouping
const defaultRvcs = [
    {
        'name': '',
        'groups': [
            {
                'price': 0.00,
                'groupId': ''
            }
        ]
    }
];


class Rvc extends Store {
    constructor(settings) {
        super(settings);
        this.rvcs = this.get('rvcs') || defaultRvcs;
    }

    saveRvcs() {
        this.set('rvcs', this.rvcs);
        return this;
    }

    getRvcs() {
        this.rvcs = this.get('rvcs') || defaultRvcs;
        return this;
    }

    addRvc(rvc) {

        this.rvcs = [...new Set([...this.rvcs, rvc])];

        return this.saveRvcs();
    }

    setGroupings(rvcs) {
        this.rvcs = rvcs;

        return this.saveRvcs();
    }

    deleteRvc(rvc) {
        this.rvcs = this.rvcs.filter(g => 
            g.name !== rvc.name
        );
        return this.saveRvcs();
    }

    changeRvcName(index, newName) {
        this.rvcs[index].name = newName || '';
        return this.saveRvcs();
    }


    deleteGrouping(groupId) {
        this.rvcs = this.rvcs.map(r =>
            (
                {
                    'name': r.name,
                    'groups': 
                        r.groups.filter(g => 
                            g.id !== groupId
                            ) || []
                }
            )
        );

        return this.saveRvcs();
    }



}

module.exports = Rvc;