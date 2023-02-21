const chai = require('chai');
const expect = chai.expect;

const {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Jane';
        const text = 'Hey!Whats up!';
        const message = generateMessage(from, text);
        expect(message.from).to.equal(from);
        expect(message.text).to.equal(text);
        expect(message.createdAt).to.be.a('number');
    });
});