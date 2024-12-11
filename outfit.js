// Variables for elements
const avatarImage = document.getElementById('avatarImage');
const leftPopup = document.getElementById('leftPopup');
const rightPopup = document.getElementById('rightPopup');
const leftPopupContent = document.getElementById('leftPopupContent');
const rightPopupContent = document.getElementById('rightPopupContent');

// State tracking for popups
let leftPopupVisible = false;
let rightPopupVisible = false;

const itemsprev = {
    accessories: ['accessory1prev.png','accessory2prev.png','accessory3prev.png','accessory4prev.png'],
    additionals: [ 'additional1prev.png','additional2prev.png'],
    shoes: ['shoe1prev.png','shoe2prev.png',],
    tops: ['top1prev.png','top2prev.png','top3prev.png','top4prev.png','top5prev.png'],
    bottoms: ['bottom1prev.png','bottom2prev.png','bottom3prev.png','bottom4prev.png','bottom5prev.png'],
    dresses: ['dress1prev.png','dress2prev.png', 'dress3prev.png'],
};
const itemsavatar = {
    accessories: ['accessory1.png', 'accessory2.png','accessory3.png', 'accessory4.png'],
    additionals: ['additional1.png','additional2.png'],
    shoes: ['shoe1.png', 'shoe2.png'],
    tops: ['top1.png', 'top2.png', 'top3.png', 'top4.png', 'top5.png'],
    bottoms: ['bottom1.png','bottom2.png', 'bottom3.png', 'bottom4.png', 'bottom5.png'],
    dresses: ['dress1.png','dress2.png','dress3.png'],
};

function openPopup(category, side) {
    const content = itemsprev[category]
        .map(image => `<img src="assets/images/preview/${image}" onclick="selectItem('${image}')">`)
        .join('');

    if (side === 'left') {
        if (leftPopupVisible) {
            closePopup('left');
        } else {
            leftPopupContent.innerHTML = content;
            leftPopup.style.display = 'block';
            leftPopup.style.top = '25%';
            leftPopup.style.left = '15%';
            leftPopupVisible = true;
        }
    } else if (side === 'right') {
        if (rightPopupVisible) {
            closePopup('right');
        } else {
            rightPopupContent.innerHTML = content;
            rightPopup.style.display = 'block';
            rightPopup.style.top = '25%';
            rightPopup.style.right = '15%';
            rightPopupVisible = true;
        }
    }
}

function closePopup(side) {
    if (side === 'left') {
        leftPopup.style.display = 'none';
        leftPopupVisible = false; // Update state
    } else if (side === 'right') {
        rightPopup.style.display = 'none';
        rightPopupVisible = false; // Update state
    }
}
function selectItem(image) {
    const category = getCategory(image); // Determine the category of the item
    const layerId = `${category}-layer`; // Use the category as a unique ID for the layer

    // Check for mutual exclusivity: dresses and bottoms cannot coexist
    if (category === 'dresses') {
        const bottomLayer = document.getElementById('pants-layer'); // Check if a bottom is already on
        if (bottomLayer) {
            bottomLayer.remove(); // Remove the bottom layer if a dress is selected
        }
    } else if (category === 'pants') {
        const dressLayer = document.getElementById('dresses-layer'); // Check if a dress is already on
        if (dressLayer) {
            dressLayer.remove(); // Remove the dress layer if a bottom is selected
        }
    }

    // Check if a layer of the same type already exists
    const existingLayer = document.getElementById(layerId);
    if (existingLayer) {
        // If a layer of the same type exists, replace it
        existingLayer.src = `assets/images/avatar/${image.replace('prev', '')}`;
    } else {
        // If no layer exists, add a new one
        const newLayer = document.createElement('img');
        newLayer.src = `assets/images/avatar/${image.replace('prev', '')}`;
        newLayer.id = layerId; // Use the category ID to ensure only one layer per type
        newLayer.className = `avatar-layer ${category}`; // Assign category class
        document.getElementById('avatarLayers').appendChild(newLayer);
    }
}

// Helper function to determine category based on the image name
function getCategory(image) {
    if (image.includes('shoes')) {
        return 'shoes';
    } else if (image.includes('shirt') || image.includes('top')) {
        return 'shirts';
    } else if (image.includes('pant') || image.includes('bottom')) {
        return 'pants';
    } else if (image.includes('dress')) {
        return 'dresses';
    } else if (image.includes('accessory')) {
        return 'accessories';
    }
    return ''; // Default to no category
}



    
    
