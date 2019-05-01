function quantityAvail(itemQuantity) {
	console.log(`this is itemQuantity: `, itemQuantity);
	return parseInt(itemQuantity - 1);
}

module.exports = quantityAvail;
