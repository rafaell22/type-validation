/**
 * Gets the values's raw type (Number, Boolean, String, etc)
 * @param  {any} value    Value to get the raw type from
 * @return {string}       The raw type description
 */
function toRawType (value) { 
    return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * Structure for a validation error
 * @param       {string} error  Error message
 * @param       {string} type   Type of the validation that failed
 * @param       {any}    value  Value that didn't pass the validation
 * @constructor
 */
class ValidationError extends Error {
  constructor(message, type, value, error) {
    super(message);
    this.message = message;
    this.error = error;
    this.type = type;
    this.value = value;
  }
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
        throw new ValidationError(
            'Value is UNdefined.',
            'undefined',
            this.value
        );
    }
    return this;
}

/**
 * Validates if value is undefined. Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.undefined = function() {
    if(typeof this.value !== typeof void 0) {
        throw new ValidationError(
            'Value is Defined.',
            'defined',
            this.value
        );
    }
    return this;
}

/**
 * Validates if value is null. Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.null = function() {
    if(this.value !== null) {
        throw new ValidationError(
            'Value is NOT Null.',
            'null',
            this.value
        );
    }
    return this;
}

/**
 * Validates if value is NOT null. Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.notNull = function() {
    if(this.value === null) {
        throw new ValidationError(
            'Value is Null.',
            'notNull',
            this.value
        );
    }
    return this;
}

/**
 * Validates if value is a function Throws error otherwise.
 * @return {Schema}   Returns instance of the validation Schema
 */
Schema.prototype.function = function() {
    if(
        toRawType(this.value) !== 'Function' &&
        toRawType(this.value) !== 'AsyncFunction'
    ) {
        throw new ValidationError(
            'Value is NOT a Function.',
            'function',
            this.value
        );
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
            throw new ValidationError(
                `Value is less than ${limit}`,
                'number.min',
                this.value
            );
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
            throw new ValidationError(
                `Value is more than ${limit}`,
                'number.max',
                this.value
            );
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
        throw new ValidationError(
            'Value is NOT Positive',
            'number.positive',
            this.value
        );
    }
    
    return this;
}

/**
 * Validates if number is an integer
 * @return {NumberValidation}   Returns instance of the validation Schema
 */
NumberValidation.prototype.integer = function() {
    try {
        if(!Number.isInteger(this.value)) {
            throw new Error(`Value is not an integer`);
        }
        
        return this;
    } catch(errorValidatingInteger) {
        throw errorValidatingInteger;
    }
}

/**
 * Validates if the value is a number.
 * @return {Schema}   Returns instance of the validation Schema.
 */
Schema.prototype.number = function() {
    try {
        if(
            toRawType(this.value) !== 'Number' ||
            isNaN(this.value)
        ) {
            throw new ValidationError(
                'Value is NOT a Number',
                'number',
                this.value
            );
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
        throw new ValidationError(
            'Value is an empty String',
            'string.notEmpty',
            this.value
        );
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
            throw new ValidationError(
                `Value's length is more than ${limit}`,
                'string.maxLength',
                this.value
            );
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
            throw new ValidationError(
                'Value is NOT a String',
                'string',
                this.value
            );
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
        throw new ValidationError(
            'Value is NOT a Boolean.',
            'boolean',
            this.value
        );
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
        throw new ValidationError(
            'Value is NOT an Object.',
            'object',
            this.value
        );
    }
    return this;
}

/**
 * Schema to validate an Array's value.
 * @param {Array} value  Value to be validated
 * @constructor
 */
function ArrayValidation(value) {
    this.value = value;
}

/**
 * Validate the type of the items in an array
 * @param  {Function/string} callback               Callback function or method names to validate the array items against. For multiple methods, use dot notation ('number.integer')
 * @return {ArrayValidation}                        Instance of the array validation schema
 */
ArrayValidation.prototype.items = function(callback) {
    let itemsValidation;
    try {
      validate(callback).function();
      itemsValidation = (function() {
        for (const item of this.value) {
            try {
                callback(item);
            } catch(errorValidatingItem) {
                throw errorValidatingItem;
            }
        }
      }).bind(this);
    } catch (errorValidatingFunction) {
      try {
        validate(callback).string();
        itemsValidation = (function() {
          const methods = callback.split('.');
          
          for (const item of this.value) {
              try {
                  let validation = validate(item);
                  for(let methodIndex = 0; methodIndex < methods.length; methodIndex++) {
                    validation = validation[methods[methodIndex]]()
                  }
              } catch(errorValidatingItem) {
                  throw errorValidatingItem;
              }
          }
        }).bind(this);
      } catch (errorValidatingString) {
        throw new ValidationError(
            'Callback argument is NOT valid',
            'items',
            this.value,
            errorValidatingString
        );
      }
    }
    
    try {
      itemsValidation();
    } catch (errorValidatingItems) {
      throw new ValidationError(
          errorValidatingItems,
          'items',
          this.value,
      );
    }
    
    return this;
}

/**
 * Validates if the value is an array.
 * @return {Schema}   Returns instance of the validation Schema.
 */
Schema.prototype.array = function() {
    if(
      toRawType(this.value) !== 'Array'
    ) {
        throw new ValidationError(
            'Value is NOT an Array.',
            'array',
            this.value
        );
    }
    return new ArrayValidation(this.value);
}

/**
 * Validates if the value is an HTMLElement.
 * @return {Schema}   Returns instance of the validation Schema.
 */
Schema.prototype.htmlElement = function() {
    if(
      !this.value instanceof HTMLElement
    ) {
        throw new ValidationError(
            'Value is NOT an HTMLElement.',
            'htmlElement',
            this.value
        );
    }
    return this;
}

/**
 * Validates if the value is one of the allowed values
 * @return {Schema}   Returns instance of the validation Schema.
 */
StringValidation.prototype.values = NumberValidation.prototype.values = Schema.prototype.values = function(...args) {
    if(
      !args.some(value => value === this.value)
    ) {
        throw new ValidationError(
            'Value is NOT in list of allowed values.',
            'values',
            this.value
        );
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