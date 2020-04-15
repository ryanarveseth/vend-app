const Store = require('electron-store');

// Starts us off with an empty grouping
const defaultGrouping = [
    {
        "combos": [
            {
                "bevcat": "2",
                "brand": "",
                "description": "16z AHA Cans",
                "packSize": "753",
                "packType": "007"
            }
        ],
        "id": "1",
        "name": "AHA 16z",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "15",
                "brand": "",
                "description": "16z PT Body Armor",
                "packSize": "753",
                "packType": "018"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "23.7z PT Body Armor",
                "packSize": "937",
                "packType": "018"
            }
        ],
        "id": "2",
        "name": "Body Armor",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "40",
                "brand": "",
                "description": "JAVA",
                "packSize": "750",
                "packType": "007"
            }
        ],
        "id": "3",
        "name": "JAVA",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "40",
                "brand": "COS",
                "description": "Monster Reign",
                "packSize": "753",
                "packType": "007"
            }
        ],
        "id": "4",
        "name": "Monster Reign",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "40",
                "brand": "BK3",
                "description": "Full Throttle",
                "packSize": "753",
                "packType": "007"
            },
            {
                "bevcat": "40",
                "brand": "B1Y",
                "description": "NOS",
                "packSize": "753",
                "packType": "007"
            }
        ],
        "id": "5",
        "name": "Full Throttle / NOS",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "40",
                "brand": "",
                "description": "12Z COKE Energy - Sleek",
                "packSize": "766",
                "packType": "Z20"
            }
        ],
        "id": "6",
        "name": "Coke Energy",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "18",
                "brand": "",
                "description": "18.5Z GP Tea",
                "packSize": "757",
                "packType": "018"
            }
        ],
        "id": "7",
        "name": "Gold Peak Tea",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "18",
                "brand": "",
                "description": "15.5z Peace Tea",
                "packSize": "751",
                "packType": "007"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "16z Peace Tea",
                "packSize": "753",
                "packType": "007"
            }
        ],
        "id": "8",
        "name": "Peace Tea - 15/16z",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "18",
                "brand": "",
                "description": "23Z Peace Tea",
                "packSize": "795",
                "packType": "007"
            }
        ],
        "id": "9",
        "name": "Peace Tea - 23z",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "21",
                "brand": "",
                "description": "11.5Z Core Power",
                "packSize": "745",
                "packType": "018"
            },
            {
                "bevcat": "21",
                "brand": "CI0",
                "description": "Core Power",
                "packSize": "749",
                "packType": "018"
            }
        ],
        "id": "10",
        "name": "Core Power",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "7",
                "brand": "",
                "description": "16.9Z ZICO NTRAL COCONUT",
                "packSize": "791",
                "packType": "018"
            }
        ],
        "id": "11",
        "name": "Zico",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "2",
                "brand": "",
                "description": "700m Smartwater",
                "packSize": "538",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "",
                "description": "23.7z PT Smartwater",
                "packSize": "937",
                "packType": "018"
            }
        ],
        "id": "12",
        "name": "Smartwater - 700mL",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "2",
                "brand": "B52",
                "description": "20Z Smartwater",
                "packSize": "766",
                "packType": "018"
            }
        ],
        "id": "13",
        "name": "Smartwater - 20z",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "15",
                "brand": "",
                "description": "20Z Powerde",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "12Z Pwd/Body Armor",
                "packSize": "746",
                "packType": "018"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "16z PT Body Armor",
                "packSize": "753",
                "packType": "018"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "23.7z PT Body Armor",
                "packSize": "937",
                "packType": "018"
            }
        ],
        "id": "14",
        "name": "Powerade",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "18",
                "brand": "",
                "description": "12z Tea- FUZe",
                "packSize": "746",
                "packType": "007"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "16.9Z Tea",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "18.5Z GP Tea",
                "packSize": "757",
                "packType": "018"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "20Z Fuze",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "23Z Peace Tea",
                "packSize": "795",
                "packType": "007"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "16z Peace Tea",
                "packSize": "753",
                "packType": "007"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "15.5z Peace Tea",
                "packSize": "751",
                "packType": "007"
            }
        ],
        "id": "15",
        "name": "Tea (All-Cans)",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "41",
                "brand": "",
                "description": "16.9Z VW",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "",
                "description": "20Z VW****",
                "packSize": "766",
                "packType": "018"
            }
        ],
        "id": "16",
        "name": "VitaminWater",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "21",
                "brand": "",
                "description": "11.5Z Core Power",
                "packSize": "745",
                "packType": "018"
            },
            {
                "bevcat": "21",
                "brand": "",
                "description": "14Z YUP",
                "packSize": "749",
                "packType": "018"
            }
        ],
        "id": "17",
        "name": "Milk",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "17",
                "brand": "",
                "description": "12Z  MM Juice PET",
                "packSize": "746",
                "packType": "018"
            },
            {
                "bevcat": "7",
                "brand": "",
                "description": "10z Juice",
                "packSize": "741",
                "packType": "018"
            },
            {
                "bevcat": "7",
                "brand": "",
                "description": "12Z  MM Juice PET",
                "packSize": "746",
                "packType": "018"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "16.9Z MM ",
                "packSize": "791",
                "packType": "018"
            }
        ],
        "id": "18",
        "name": "Juice",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "5",
                "brand": "",
                "description": "12Z Cans CSD ",
                "packSize": "746",
                "packType": "007"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "Tumy Yummies",
                "packSize": "742",
                "packType": "018"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "12z MM Cans (Lemonade/Pink)",
                "packSize": "746",
                "packType": "007"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "12z Tea- FUZe",
                "packSize": "746",
                "packType": "007"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "300m Water",
                "packSize": "335",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "Diet Coke Slim Cans Recast",
                "packSize": "746",
                "packType": "Z20"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "16z Cans",
                "packSize": "753",
                "packType": "007"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "12Z Cans AHA",
                "packSize": "746",
                "packType": "007"
            }
        ],
        "id": "19",
        "name": "Cans",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "5",
                "brand": "",
                "description": "20z CSD",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "20z CSD - Contour",
                "packSize": "766",
                "packType": "029"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "20z CSD - Dimple",
                "packSize": "766",
                "packType": "030"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "16.9z MM Sparkling Juice",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "20z  MM (Lemonadeade/Pink)",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "16z PT Body Armor",
                "packSize": "753",
                "packType": "018"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "23.7z PT Body Armor",
                "packSize": "937",
                "packType": "018"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "700m Smartwater",
                "packSize": "538",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "",
                "description": "23.7z PT Smartwater",
                "packSize": "937",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "16.9z CSD - Bottle",
                "packSize": "791",
                "packType": "029"
            }
        ],
        "id": "20",
        "name": "Bottles",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "3",
                "brand": "",
                "description": "13.7Z Dunkin / McCafe",
                "packSize": "939",
                "packType": "018"
            }
        ],
        "id": "21",
        "name": "Coffee",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "2",
                "brand": "",
                "description": "16.9z Dasani",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "20Z Dasani",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "",
                "description": "16.9Z VW",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "",
                "description": "20Z VW****",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "300m Water",
                "packSize": "335",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "519",
                "description": "Dasani Flavors",
                "packSize": "766",
                "packType": "018"
            }
        ],
        "id": "22",
        "name": "Water-Dasani/VW",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "40",
                "brand": "",
                "description": "JAVA",
                "packSize": "750",
                "packType": "007"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "15z PT MSCL Mon Shke",
                "packSize": "750",
                "packType": "018"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "15Z Energy",
                "packSize": "751",
                "packType": "007"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "16Z Energy",
                "packSize": "753",
                "packType": "007"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "12Z COKE Energy - Sleek",
                "packSize": "766",
                "packType": "Z20"
            }
        ],
        "id": "23",
        "name": "Energy",
        "rename": false
    },
    {
        "combos": [
            {
                "bevcat": "3",
                "brand": "",
                "description": "13.7Z Dunkin / McCafe",
                "packSize": "939",
                "packType": "018"
            },
            {
                "bevcat": "2",
                "brand": "B52",
                "description": "20Z Smartwater",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "519",
                "description": "Dasani Flavors",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "16z AHA Cans",
                "packSize": "753",
                "packType": "007"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "12Z Cans AHA",
                "packSize": "746",
                "packType": "007"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "16.9z CSD - Bottle",
                "packSize": "791",
                "packType": "029"
            },
            {
                "bevcat": "7",
                "brand": "",
                "description": "16.9Z ZICO NTRAL COCONUT",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "",
                "description": "23.7z PT Smartwater",
                "packSize": "937",
                "packType": "018"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "700m Smartwater",
                "packSize": "538",
                "packType": "018"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "23.7z PT Body Armor",
                "packSize": "937",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "16z Cans",
                "packSize": "753",
                "packType": "007"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "12z PT Body Armor",
                "packSize": "746",
                "packType": "018"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "16z PT Body Armor",
                "packSize": "753",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "Diet Coke Slim Cans Recast",
                "packSize": "746",
                "packType": "Z20"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "300m Water",
                "packSize": "335",
                "packType": "018"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "15.5z Peace Tea",
                "packSize": "751",
                "packType": "007"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "16z Peace Tea",
                "packSize": "753",
                "packType": "007"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "23Z Peace Tea",
                "packSize": "795",
                "packType": "007"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "20Z Fuze",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "18.5Z GP Tea",
                "packSize": "757",
                "packType": "018"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "16.9Z Tea",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "18",
                "brand": "",
                "description": "12z Tea- FUZe",
                "packSize": "746",
                "packType": "007"
            },
            {
                "bevcat": "15",
                "brand": "",
                "description": "20Z Powerde",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "",
                "description": "20Z VW****",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "20Z Dasani",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "41",
                "brand": "",
                "description": "16.9Z VW",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "2",
                "brand": "",
                "description": "16.9z Dasani",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "7",
                "brand": "",
                "description": "12Z  MM Juice PET",
                "packSize": "746",
                "packType": "018"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "16.9Z MM ",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "7",
                "brand": "",
                "description": "10z Juice",
                "packSize": "741",
                "packType": "018"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "12Z  MM Juice PET",
                "packSize": "746",
                "packType": "018"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "20z  MM (Lemonadeade/Pink)",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "16.9z MM Sparkling Juice",
                "packSize": "791",
                "packType": "018"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "12z MM Cans (Lemonade/Pink)",
                "packSize": "746",
                "packType": "007"
            },
            {
                "bevcat": "17",
                "brand": "",
                "description": "Tumy Yummies",
                "packSize": "742",
                "packType": "018"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "12Z COKE Energy - Sleek",
                "packSize": "766",
                "packType": "Z20"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "16Z Energy",
                "packSize": "753",
                "packType": "007"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "15Z Energy",
                "packSize": "751",
                "packType": "007"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "15z PT MSCL Mon Shke",
                "packSize": "750",
                "packType": "018"
            },
            {
                "bevcat": "40",
                "brand": "",
                "description": "JAVA",
                "packSize": "750",
                "packType": "007"
            },
            {
                "bevcat": "21",
                "brand": "",
                "description": "14Z YUP",
                "packSize": "749",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "12Z Cans CSD ",
                "packSize": "746",
                "packType": "007"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "20z CSD",
                "packSize": "766",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "20z CSD - Contour",
                "packSize": "766",
                "packType": "029"
            },
            {
                "bevcat": "21",
                "brand": "",
                "description": "11.5Z Core Power",
                "packSize": "745",
                "packType": "018"
            },
            {
                "bevcat": "5",
                "brand": "",
                "description": "20z CSD - Dimple",
                "packSize": "766",
                "packType": "030"
            }
        ],
        "id": "24",
        "name": "All",
        "rename": false
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
                            ),
                    'rename': g.rename
                }
            )
        );

        return this.saveGroupings();
    }
}

module.exports = Grouping;