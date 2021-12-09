/**
 * Gets the values's raw type (Number, Boolean, String, etc)
 * @param  {any} value    Value to get the raw type from
 * @return {string}       The raw type description
 */
function toRawType (value) { 
    return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * Schema for variable type validation. Throws error if the validation fails
 * @param {any} value   Value to be validated
 * @constructor
 */
function Schema(value) {
    this.value = value;
}

/**
 * Validates if value is defined (NOT undefined). Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.defined = function() {
    if(typeof this.value === typeof void 0) {
        throw new Error('Value is UNdefined.');
    }
    return this;
}

/**
 * Validates if value is undefined. Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.undefined = function() {
    if(typeof this.value !== typeof void 0) {
        throw new Error('Value is Defined.');
    }
    return this;
}

/**
 * Validates if value is null. Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.null = function() {
    if(this.value !== null) {
        throw new Error('Value is NOT Null.');
    }
    return this;
}

/**
 * Validates if value is NOT null. Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.notNull = function() {
    if(this.value === null) {
        throw new Error('Value is Null.');
    }
    return this;
}

/**
 * Validates if value is a function Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.function = function() {
    if(
        !this.value ||
        toRawType(this.value) !== 'Function'
    ) {
        throw new Error('Value is NOT a Function.');
    }
    return this;
}

/**
 * Schema to validate a Number's value.
 * @param {Number} value  Value to be validated
 * @constructor
 */
function NumberValidation(value) {
    this.value = value;
}

/**
 * Validates if value is more than or equal to limit.
 * @param  {Number}  limit      The minimum value allowed.
 * @return {NumberValidation}   Returns instance of the validation Schema
 */
NumberValidation.prototype.min = function(limit) {
    try {
        validate(limit).number();
        if(this.value < limit) {
            throw new Error(`Value is less than ${limit}`);
        }
        
        return this;
    } catch(errorValidatingLimit) {
        throw errorValidatingLimit;
    }
}

/**
 * Validates if value is less than or equal to limit.
 * @param  {Number}  limit      The maximum value allowed.
 * @return {NumberValidation}   Returns instance of the validation Schema
 */
NumberValidation.prototype.max = function(limit) {
    try {
        validate(limit).number();
        if(this.value > limit) {
            throw new Error(`Value is more than ${limit}`);
        }
        
        return this;
    } catch(errorValidatingLimit) {
        throw errorValidatingLimit;
    }
}

/**
 * Validates if value is more than 0 (zero).
 * @return {NumberValidation}   Returns instance of the validation Schema
 */
NumberValidation.prototype.positive = function() {
    if(this.value <= 0) {
        throw new Error('Value is NOT Positive');
    }
    
    return this;
}

/**
 * Validates if the value is a number.
 * @return {Schema}   Returns instance of the validation Schema.
 */
Schema.prototype.number = function() {
    try {
        if(
            toRawType(this.value) !== 'Number'
        ) {
            throw new Error('Value is NOT a Number');
        }
        return new NumberValidation(this.value);
    } catch(errorValidatingNumber) {
        throw errorValidatingNumber;
    }
}

/**
 * Schema to validate a String's content
 * @param       {[type]} value  [description]
 * @constructor
 */
function StringValidation(value) {
    this.value = value;
}

/**
 * Validate if String is NOT empty
 * @return {StringValidation}   Returns instance of the validation Schema.
 */
StringValidation.prototype.notEmpty = function() {
    if(this.value === '') {
        throw new Error('Value is an empty String');
    }
    
    return this;
}

/**
 * Validate the String's length
 * @param  {Number} limit       The maximum value allowed.
 * @return {StringValidation}   Returns instance of the validation Schema.
 */
StringValidation.prototype.maxLength = function(limit) {
    try {
        validate(limit).number();
        if(this.value.length > limit) {
            throw new Error(`Value's length is more than ${limit}`);
        }
        
        return this;
    } catch(errorValidatingLimit) {
        throw errorValidatingLimit;
    }
}

/**
 * Validates if the value is a string.
 * @return {Schema}   Returns instance of the validation Schema.
 */
Schema.prototype.string = function() {
    try {
        if(
            toRawType(this.value) !== 'String'
        ) {
            throw new Error('Value is NOT a String');
        }
        return new StringValidation(this.value);
    } catch(errorValidatingString) {
        throw errorValidatingString;
    }
}

/**
 * Validates if the value is a boolean.
 * @return {Schema}   Returns instance of the validation Schema.
 */
Schema.prototype.boolean = function() {
    if(
        this.value !== false &&
        this.value !== true
    ) {
        throw new Error('Value is NOT a Boolean.');
    }
    return this;
}

/**
 * Validates if the value is an object.
 * @return {Schema}   Returns instance of the validation Schema.
 */
Schema.prototype.object = function() {
    if(
      toRawType(this.value) !== 'Object'
    ) {
        throw new Error('Value is NOT an Object.');
    }
    return this;
}

/**
 * Validates if the value is an HTMLElement.
 * @return {Schema}   Returns instance of the validation Schema.
 */
Schema.prototype.htmlElement = function() {
    if(
      !this.value instanceof HTMLElement
    ) {
        throw new Error('Value is NOT an HTMLElement.');
    }
    return this;
}

/**
 * Function that instantiate the validation Schema
 * @param  {[type]} variable               [description]
 * @return {[type]}          [description]
 */
function validate(variable) {
    const schema = new Schema(variable);
    
    return schema;
}

export default validate;
