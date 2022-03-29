const l1 = [2,4,3], l2 = [5,6,4]
const addTwoNumbers = function(l1, l2) {
	return [l1, l2].reduce((total, el) => {
		const cur = el.reverse().join('')
		const sum = +total + +cur
		return Array.from(String(sum))
	}, 0)
};
addTwoNumbers(l1, l2)
