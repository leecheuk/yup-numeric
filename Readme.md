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

