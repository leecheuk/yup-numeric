import { beforeAll, describe, expect, it } from "vitest";
import { ValidationError, addMethod, string } from "yup";
import { addNumericMethods } from "./numeric";

describe('numeric', () => {
  beforeAll(() => {
    addNumericMethods(addMethod, string);
  });

  it('should resolve validation when given a valid value', async () => {
    const schema = string().numeric();
    const value = '1.0000000000000000000000000000000000001'
    const result = await schema.validate(value)

    expect(result).toBe(result);
  });

  it('should reject validation when given an alphabet-only string', async () => {
    const schema = string().numeric('Invalid numeric string');
    const value = 'lol'
    const result = schema.validate(value)

    expect(result).rejects.toEqual(new ValidationError('Invalid numeric string'));
  });

  it('should reject validation when given an alphanumeric string', async () => {
    const schema = string().numeric('Invalid numeric string');
    const value = '1.123lol.123'
    const result = schema.validate(value)

    expect(result).rejects.toEqual(new ValidationError('Invalid numeric string'));
  });

  it('should reject validation when given a dot value', async () => {
    const schema = string().numeric('Invalid numeric string');
    const value = '.'
    const result = schema.validate(value)

    expect(result).rejects.toEqual(new ValidationError('Invalid numeric string'));
  });

  it('should reject validation when given an empty string', async () => {
    const schema = string().numeric('Invalid numeric string');
    const value = ''
    const result = schema.validate(value)

    expect(result).rejects.toEqual(new ValidationError('Invalid numeric string'));
  });

  it('should reject validation when given null', async () => {
    const schema = string().numeric('Invalid numeric string');
    const value = null
    const result = schema.validate(value)

    expect(result).rejects.toEqual(new ValidationError('this cannot be null'));
  });

  it('should reject validation when given undefined', async () => {
    const schema = string().numeric('Invalid numeric string');
    const value = undefined
    const result = await schema.validate(value)

    expect(result).toBe(value);
  });
});
