import {extend as extendSanitizer} from "indicative/sanitizer";
import {getValue, patchValue, skippable} from "indicative-utils";
import {AbstractValidator} from "../validator/AbstractValidator";

class Recurrence extends AbstractValidator {
    protected rules = {}
    protected messages = {}
    protected runSanitizer = true
    public action = async (body: object) => {
        this.messages = {};
        this.rules = {
            "type": "required|integer",
            "product": "required|string"
        };
        console.log('Recurrence Rules', this.rules)
        return await this.validate(body);
    }

    protected configureAdditionalSanitizer() {
        extendSanitizer('array', {
            sanitize(data, field: string) {
                let fieldValue = getValue(data, field)
                if (typeof (fieldValue) !== 'string') {
                    return
                }
                patchValue(data, field, fieldValue.split(','))
            }
        })
    }

    protected configureAdditionalValidators() {
    }
}

export default new Recurrence();