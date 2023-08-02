template Multiplier2 () {  

   // Declaration of signals.  
   signal input ina;  
   signal input inb; 
   signal six;
   signal siy; 
   signal output ouq;  

   component andG= AND();
   component notG= NOT();
   component orG= OR();

   andG.a <== ina;
   andG.b <== inb;
   six <== andG.out;

   notG.in <== inb;
   siy <== notG.out;

   orG.a <==six;
   orG.b <==siy;
   ouq <== orG.out;

}
template AND() {
    signal input a;
    signal input b;
    signal output out;

    out <== a*b;
}

template OR() {
    signal input a;
    signal input b;
    signal output out;

    out <== a + b - a*b;
}

template NOT() {
    signal input in;
    signal output out;

    out <== 1 + in - 2*in;
}
component main = Multiplier2();
