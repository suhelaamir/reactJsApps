import validator from 'validator';

class FormValidator {
    constructor(validations) {
        this.validations = validations;
    }

    validate(state, col) {
        debugger;
        let validation = this.valid();
        this.validations.forEach(rule => {

            if (!validation[rule.field].isInvalid) {
                debugger;
                let field_value = null;
                if (col === "") {
                    field_value = state[rule.field].toString();
                } else {
                    debugger;
                    field_value = state[col][rule.field].toString();
                }

                const args = rule.args || [];
                const validation_method = typeof rule.method === 'string' ? validator[rule.method] : rule.method;

                if (validation_method(field_value, ...args, state) !== rule.validWhen) {
                    debugger;
                    validation[rule.field] = { isInvalid: true, message: rule.message };
                    validation.isValid = false;
                }
            }
        });
        return validation;
    }

    valid() {
        const validation = {};

        this.validations.map(rule => (
            validation[rule.field] = { isInvalid: false, message: '' }
        ));

        return { isValid: true, ...validation }
    }
}

export default FormValidator;