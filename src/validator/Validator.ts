import TEMPLATE from '../Templates/index'

interface Body {
    product: string
}

class Validator {
    public check = async (body: Body) => {
        if (body.product) {
            console.log('Find template', body.product)
            const template = TEMPLATE.find((element) => element.product === body.product);
            if (template && typeof template.action == 'function') {
                console.log('Execute template action')
                return template.action(body);
            }
        }
        console.log('Template not found')
        throw 'Template not found';
    }
}

export default new Validator();