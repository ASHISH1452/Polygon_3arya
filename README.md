## POLY_PROOF_MODULE_3_FINAL PROJECT


Polygon is asking you to design a new zkSNARK circuit that implements some logical operations. You need to implement the circuit and deploy a verifier on-chain to verify proofs generated from this circuit

For this project, you will create a circuit using the circom programming language

## Quick Start
Compile the Multiplier2() circuit and verify it against a smart contract verifier

```
pragma circom 2.0.0;

template Multiplier2 () {

   // Declaration of signals.
   signal input ina;
   signal input inb;
   signal six;
   signal siy;
   signal output ouq;

   component nandG = NAND();
   component notG = NOT();
   component andG = AND();

   nandG.a := ina;
   nandG.b := inb;
   six := nandG.out;

   norG.a := inb;
   norG.b := inb;
   siy := notG.out;

   andG.a := six;
   andG.b := siy;
   ouq := andG.out;

}

template NAND() {
    signal input a;
    signal input b;
    signal output out;

    out := ~(a & b);
}

template NOT() {
    signal input a;
    signal input b;
    signal output out;

    out := ~(a | b);
}

template AND() {
    signal input a;
    signal input b;
    signal output out;

    out := a & b;
}

component main = Multiplier2();




### Compile Step by Step 

1. `npm i` 
2. `npx hardhat circom`
3.  `npx hardhat run scripts/deploy.ts`
4.   `npx hardhat run scripts/deploy.ts --network fuji`



**adding circuits**   
To add a new circuit, you can run the `newcircuit` hardhat task to autogenerate configuration and directories i.e  
```
npx hardhat run scripts/deploy.ts --network fuji
```

## AUTHER
ASHISH PAL
https://www.linkedin.com/in/ashish-pal-66401224b/
21BCS11259@cuchd.in
