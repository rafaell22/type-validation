# type-validation

Library to validate variable typing and values during runtime. It is built to be used as an ES6 module.

The library follows the concept that typing or value mismatch is an error, so it throws errors if the validation fails. Here are some example usage:

```javascript
import validate from './libraries/type-validation/validation';

const value = -1;

try {
    validate(value).number().positive();
} catch(errorValidatingValue) {
    console.log(errorValidatingValue); // logs "Value is NOT Positive"
}
```

## Available Validations

### defined()
Validates if value is defined (NOT `undefined`)

### undefined()
Validates if the value is `undefined`

### null()
Validates if the value is equal to `null`

### notNull()
Validates if the value is NOT equal to `null`

### function()
Validates if the value is a `function`

### number()
Validates if the values is a `number`

#### number().min(limit)
Validates if the `number` is more than or equal to `limit`
- `limit` - the minimum value allowed

#### number().max(limit)
Validates if the `number` is less than or equal to `limit`
- `limit` - the maximum value allowed

#### number().positive()
Validates if the `number` is more than 0 (zero)

### string()
Validates if the value is a `string`

#### string().notEmpty()
Validates if the `string` is NOT an empty `string` (`''`)

#### string().maxLength(limit)
Validates if the `string`'s length is less than or equal to the `limit`
- `limit` - the maximum allowed length

### boolean()
Validates if the value is a `boolean`

### object()
Validates if the value is an `object`

### array()
Validates if the value is an `array`

### htmlElement()
Validates if the value is an `HTMLElement`

### values()
Validates if the value is in a list of values
