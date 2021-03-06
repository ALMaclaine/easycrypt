const chai = require('chai');
const { ezEncrypt, ezDecrypt, ezCompare } = require('../easycrypt');
const randstring = require('../randomstring.js');

describe('EasyCrypt', () => {
  describe('Output Tests', () => {
    it('Encrypt should give back string with 3 segments seperated by + signs', () => {
      const input = 'Easy';
      const crypted = ezEncrypt(input);
      const numSegments = crypted.split(':').length;
      chai.expect(numSegments === 4).to.be.true;
    });
    it('Encrypt and decrypt should give back salted password', () => {
      const input = 'Easy';
      const crypted = ezEncrypt(input);
      const salt = crypted.split(':')[1];
      const decrypted = ezDecrypt(crypted);
      chai.expect(input === decrypted.slice(0, input.length)).to.be.true;
      chai.expect(salt === decrypted.slice(input.length)).to.be.true;
    });
    it('ezCompare works', () => {
      const input = 'Easy';
      const crypted1 = ezEncrypt(input);

      chai.expect(ezCompare(input, crypted1)).to.be.true;
    });
  });
  it('passes massive random test', () => {
    for(let i = 0; i < 10000; i++) {
      const length = Math.floor(Math.random() * 24) + 4;
      const randpass = randstring(length);
  
      const crypted = ezEncrypt(randpass);
      const comp = ezCompare(randpass, crypted);

      if(!comp) {
        console.log(randpass);
      }
      chai.expect(comp).to.be.true;
    }
  });
});
