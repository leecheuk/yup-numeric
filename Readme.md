# yup-numeric

yup methods for validating numeric strings. Methods to validate whether string contains a valid number.

## Installation
```bash
npm install yup-numeric
```

## Usage
```ts
import { numeric } from 'yup-numeric';

const schema = numeric();
const value = '1.0000000000000000000000000000000000001';

const result = await schema.validate(value);
```

## API

### `numeric().gte(num: number|string|Ref, message?: string)`
Value must be greater than or equal to `num`.

### `numeric().lte(num: number|string|Ref, message?: string)`
Value must be less than or equal to `num`.

### `numeric().eq(num: number|string|Ref, message?: string)`
Value must be equal to `num`.

### `numeric().gt(num: number|string, message?: string)`
Value must be greater than `num`.

### `numeric().lt(num: number|string, message?: string)`
Value must be less than `num`.

### `numeric().min(num: number|string|Ref, message?: string)`
Set a minimum value for the numeric string value.

### `numeric().max(num: number|string|Ref, message?: string)`
Set a maximum value for the string value.

### `numeric().integer(message?: string)`
Validates the string value is an integer.

### `numeric().moreThan(num: number|string|Ref, message?: string)`
Value must be greater than `num`.

### `numeric().lessThan(num: number|string|Ref, message?: string)`
Value must be less than `num`.
