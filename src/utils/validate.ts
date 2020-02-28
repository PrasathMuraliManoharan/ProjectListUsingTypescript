export interface Valitable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(validatableInput: Valitable) {
    let isValid = true;

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if (validatableInput.minLength !== undefined &&
        typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength;
    }

    if (validatableInput.maxLength !== undefined &&
        typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength;
    }
    if (validatableInput.min !== undefined &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max !== undefined &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}