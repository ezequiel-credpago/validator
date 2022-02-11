import {validate} from 'indicative/validator'

export abstract class AbstractValidator {
    protected abstract rules: { string: string } | {}
    protected abstract messages: { string: string } | {}
    protected runSanitizer = false
    protected sanitizerSchema: { string: string } | {}

    protected configureAdditionalValidators() {
    }

    protected configureAdditionalSanitizer() {
    }

    public validate = async (body) => {
        this.configureAdditionalValidators()
        this.configureAdditionalSanitizer()
        console.log('Execute final validator')
        return await validate(body, this.rules, this.messages, {removeAdditional: true});
    }
}