const Store = require('electron-store');

const defaultProducts = [
    {
        "description": "13.7Z Dunkin / McCafe",
        "packSize": "939",
        "packType": "018",
        "bevcat": "3",
        "brand": ""
    },
    {
        "description": "12Z Cans CSD ",
        "packSize": "746",
        "packType": "007",
        "bevcat": "5",
        "brand": ""
    },
    {
        "description": "20z CSD",
        "packSize": "766",
        "packType": "018",
        "bevcat": "5",
        "brand": ""
    },
    {
        "description": "20z CSD - Contour",
        "packSize": "766",
        "packType": "029",
        "bevcat": "5",
        "brand": ""
    },
    {
        "description": "20z CSD - Dimple",
        "packSize": "766",
        "packType": "030",
        "bevcat": "5",
        "brand": ""
    },
    {
        "description": "11.5Z Core Power",
        "packSize": "745",
        "packType": "018",
        "bevcat": "21",
        "brand": ""
    },
    {
        "description": "14Z YUP",
        "packSize": "749",
        "packType": "018",
        "bevcat": "21",
        "brand": ""
    },
    {
        "description": "JAVA",
        "packSize": "750",
        "packType": "007",
        "bevcat": "40",
        "brand": ""
    },
    {
        "description": "15z PT MSCL Mon Shke",
        "packSize": "750",
        "packType": "018",
        "bevcat": "40",
        "brand": ""
    },
    {
        "description": "15Z Energy",
        "packSize": "751",
        "packType": "007",
        "bevcat": "40",
        "brand": ""
    },
    {
        "description": "16Z Energy",
        "packSize": "753",
        "packType": "007",
        "bevcat": "40",
        "brand": ""
    },
    {
        "description": "12Z COKE Energy - Sleek",
        "packSize": "766",
        "packType": "Z20",
        "bevcat": "40",
        "brand": ""
    },
    {
        "description": "Tumy Yummies",
        "packSize": "742",
        "packType": "018",
        "bevcat": "17",
        "brand": ""
    },
    {
        "description": "12z MM Cans (Lemonade/Pink)",
        "packSize": "746",
        "packType": "007",
        "bevcat": "17",
        "brand": ""
    },
    {
        "description": "16.9z MM Sparkling Juice",
        "packSize": "791",
        "packType": "018",
        "bevcat": "5",
        "brand": ""
    },
    {
        "description": "20z  MM (Lemonadeade/Pink)",
        "packSize": "766",
        "packType": "018",
        "bevcat": "17",
        "brand": ""
    },
    {
        "description": "12Z  MM Juice PET",
        "packSize": "746",
        "packType": "018",
        "bevcat": "17",
        "brand": ""
    },
    {
        "description": "10z Juice",
        "packSize": "741",
        "packType": "018",
        "bevcat": "7",
        "brand": ""
    },
    {
        "description": "16.9Z MM ",
        "packSize": "791",
        "packType": "018",
        "bevcat": "17",
        "brand": ""
    },
    {
        "description": "12Z  MM Juice PET",
        "packSize": "746",
        "packType": "018",
        "bevcat": "7",
        "brand": ""
    },
    {
        "description": "16.9z Dasani",
        "packSize": "791",
        "packType": "018",
        "bevcat": "2",
        "brand": ""
    },
    {
        "description": "16.9Z VW",
        "packSize": "791",
        "packType": "018",
        "bevcat": "41",
        "brand": ""
    },
    {
        "description": "20Z Dasani",
        "packSize": "766",
        "packType": "018",
        "bevcat": "2",
        "brand": ""
    },
    {
        "description": "20Z VW****",
        "packSize": "766",
        "packType": "018",
        "bevcat": "41",
        "brand": ""
    },
    {
        "description": "12Z Pwd/Body Armor",
        "packSize": "746",
        "packType": "018",
        "bevcat": "15",
        "brand": ""
    },
    {
        "description": "20Z Powerde",
        "packSize": "766",
        "packType": "018",
        "bevcat": "15",
        "brand": ""
    },
    {
        "description": "12z Tea- FUZe",
        "packSize": "746",
        "packType": "007",
        "bevcat": "18",
        "brand": ""
    },
    {
        "description": "16.9Z Tea",
        "packSize": "791",
        "packType": "018",
        "bevcat": "18",
        "brand": ""
    },
    {
        "description": "18.5Z GP Tea",
        "packSize": "757",
        "packType": "018",
        "bevcat": "18",
        "brand": ""
    },
    {
        "description": "20Z Fuze",
        "packSize": "766",
        "packType": "018",
        "bevcat": "18",
        "brand": ""
    },
    {
        "description": "23Z Peace Tea",
        "packSize": "795",
        "packType": "007",
        "bevcat": "18",
        "brand": ""
    },
    {
        "description": "16z Peace Tea",
        "packSize": "753",
        "packType": "007",
        "bevcat": "18",
        "brand": ""
    },
    {
        "description": "15.5z Peace Tea",
        "packSize": "751",
        "packType": "007",
        "bevcat": "18",
        "brand": ""
    },
    {
        "description": "300m Water",
        "packSize": "335",
        "packType": "018",
        "bevcat": "2",
        "brand": ""
    },
    {
        "description": "Diet Coke Slim Cans Recast",
        "packSize": "746",
        "packType": "Z20",
        "bevcat": "5",
        "brand": ""
    },
    {
        "description": "16z PT Body Armor",
        "packSize": "753",
        "packType": "018",
        "bevcat": "15",
        "brand": ""
    },
    {
        "description": "16z Cans",
        "packSize": "753",
        "packType": "007",
        "bevcat": "5",
        "brand": ""
    },
    {
        "description": "23.7z PT Body Armor",
        "packSize": "937",
        "packType": "018",
        "bevcat": "15",
        "brand": ""
    },
    {
        "description": "700m Smartwater",
        "packSize": "538",
        "packType": "018",
        "bevcat": "2",
        "brand": ""
    },
    {
        "description": "23.7z PT Smartwater",
        "packSize": "937",
        "packType": "018",
        "bevcat": "41",
        "brand": ""
    },
    {
        "description": "16.9Z ZICO NTRAL COCONUT",
        "packSize": "791",
        "packType": "018",
        "bevcat": "7",
        "brand": ""
    },
    {
        "description": "16.9z CSD - Bottle",
        "packSize": "791",
        "packType": "029",
        "bevcat": "5",
        "brand": ""
    },
    {
        "description": "12Z Cans AHA",
        "packSize": "746",
        "packType": "007",
        "bevcat": "2",
        "brand": ""
    },
    {
        "description": "16z AHA Cans",
        "packSize": "753",
        "packType": "007",
        "bevcat": "2",
        "brand": ""
    },
    {
        "description": "Core Power",
        "packSize": "749",
        "packType": "018",
        "bevcat": "21",
        "brand": "CI0"
    },
    {
        "description": "20Z Smartwater",
        "packSize": "766",
        "packType": "018",
        "bevcat": "2",
        "brand": "B52"
    },
    {
        "description": "Full Throttle",
        "packSize": "753",
        "packType": "007",
        "bevcat": "40",
        "brand": "BK3"
    },
    {
        "description": "NOS",
        "packSize": "753",
        "packType": "007",
        "bevcat": "40",
        "brand": "B1Y"
    },
    {
        "description": "Dasani Flavors",
        "packSize": "766",
        "packType": "018",
        "bevcat": "41",
        "brand": "519"
    },
    {
        "description": "Monster Reign",
        "packSize": "753",
        "packType": "007",
        "bevcat": "40",
        "brand": "COS"
    }
];


class Combination extends Store {
    constructor(settings) {
        super(settings);
        this.combos = this.get('combos') || defaultProducts;
    }

    saveCombos() {
        this.set('combos', this.combos);
        return this;
    }

    getCombos() {
        this.combos = this.get('combos') || defaultProducts;
        return this;
    }

    addCombo(combo) {

        this.combos = [...new Set([...this.combos, combo])];

        return this.saveCombos();
    }

    deleteCombo(combo) {
        this.combos = this.combos.filter(c => 
            c.bevcat !== combo.bevcat ||
            c.packSize !== combo.packSize ||
            c.packType !== combo.packType ||
            c.brand !== combo.brand
        );
        return this.saveCombos();
    }
}

module.exports = Combination;