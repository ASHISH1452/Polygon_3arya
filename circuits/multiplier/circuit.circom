template Multiplier2 () {

   // Declaration of signals.
   signal input ina;
   signal input inb;
   signal six;
   signal siy;
   signal output ouq;

   component nandG = NAND();
   component norG = NOR();
   component andG = AND();

   nandG.a := ina;
   nandG.b := inb;
   six := nandG.out;

   norG.a := inb;
   norG.b := inb;
   siy := norG.out;

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

template NOR() {
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
