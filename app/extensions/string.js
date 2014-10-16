alert("dladflaf");

String.prototype.endsWith = function(value) {
	if (value.length > this.length)
		return false;
	return value.length <= this.length && this.substring(this.length - value.length, value.length) === value;
}