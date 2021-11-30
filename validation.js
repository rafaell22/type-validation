/**
 * @constructor
 * Schema for variable type validation. Throws error if the validation fails
 * @param {any} value Value to be validated
 * */
function Schema(value) {
    this.value = value;
}

Schema.prototype.defined = function() {
    if(typeof this.value === typeof void 0) {
        throw new Error('Value is UNdefined.');
    }
    return this;
}

Schema.prototype.undefined = function() {
    if(typeof this.value !== typeof void 0) {
        throw new Error('Value is Defined.');
    }
    return this;
}

Schema.prototype.null = function() {
    if(this.value !== null) {
        throw new Error('Value is NOT Null.');
    }
    return this;
}

Schema.prototype.notNull = function() {
    if(this.value === null) {
        throw new Error('Value is Null.');
    }
    return this;
}

Schema.prototype.function = function() {
    if(
        !this.value ||
        !this.value.constructor ||
        this.value.constructor.name !== 'Function'
    ) {
        throw new Error('Value is NOT a Function.');
    }
    return this;
}

function NumberValidation(value) {
    this.value = value;
}

NumberValidation.prototype.min = function(min) {
    if(this.value < min) {
        throw new Error(`Value is less than ${min}`);
    }
    
    return this;
}

NumberValidation.prototype.max = function(max) {
    if(this.value > max) {
        throw new Error(`Value is more than ${max}`);
    }
    
    return this;
}

NumberValidation.prototype.positive = function() {
    if(this.value <= 0) {
        throw new Error('Value is NOT Positive');
    }
    
    return this;
}

Schema.prototype.number = function() {
    try {
        validate(this.value).defined().notNull();
        if(
            this.value.constructor.name !== 'Number'
        ) {
            throw new Error('Value is NOT a Number');
        }
        return new NumberValidation(this.value);
    } catch(errorValidatingNumber) {
        throw errorValidatingNumber;
    }
}

function StringValidation(value) {
    this.value = value;
}

StringValidation.prototype.notEmpty = function() {
    if(this.value === '') {
        throw new Error('Value is an empty String');
    }
    
    return this;
}

StringValidation.prototype.maxLength = function(length) {
    if(this.value.length > length) {
        throw new Error(`Value's length is more than ${length}.`);
    }
    
    return this;
}

Schema.prototype.string = function() {
    try {
        validate(this.value).defined().notNull();
        if(
            this.value.constructor.name !== 'String'
        ) {
            throw new Error('Value is NOT a String');
        }
        return new StringValidation(this.value);
    } catch(errorValidatingString) {
        throw errorValidatingString;
    }
}

Schema.prototype.boolean = function() {
    if(
        this.value !== false &&
        this.value !== true
    ) {
        throw new Error('Value is NOT a Boolean.');
    }
    return this;
}

function validate(variable) {
    const schema = new Schema(variable);
    
    return schema;
}

export default validate;