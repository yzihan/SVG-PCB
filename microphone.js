const R_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}}
const C_1206 = {"1":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[-0.06,0],"layers":["F.Cu"],"index":1},"2":{"shape":"M -0.032,0.034L 0.032,0.034L 0.032,-0.034L -0.032,-0.034L -0.032,0.034","pos":[0.06,0],"layers":["F.Cu"],"index":2}}
const op_amp_SOT23_5 = {"O":{"shape":"M -0.01,0.02L 0.01,0.02L 0.01,-0.02L -0.01,-0.02L -0.01,0.02","pos":[-0.0375,-0.045],"layers":["F.Cu"],"index":1},"V-":{"shape":"M -0.01,0.02L 0.01,0.02L 0.01,-0.02L -0.01,-0.02L -0.01,0.02","pos":[0,-0.045],"layers":["F.Cu"],"index":2},"I+":{"shape":"M -0.01,0.02L 0.01,0.02L 0.01,-0.02L -0.01,-0.02L -0.01,0.02","pos":[0.0375,-0.045],"layers":["F.Cu"],"index":3},"I-":{"shape":"M -0.01,0.02L 0.01,0.02L 0.01,-0.02L -0.01,-0.02L -0.01,0.02","pos":[0.0375,0.045],"layers":["F.Cu"],"index":4},"V+":{"shape":"M -0.01,0.02L 0.01,0.02L 0.01,-0.02L -0.01,-0.02L -0.01,0.02","pos":[-0.0375,0.045],"layers":["F.Cu"],"index":5}}
const header_serial_Frev = {"G":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.15],"layers":["F.Cu"],"index":1},"5V":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,0.05],"layers":["F.Cu"],"index":2},"Tx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.05],"layers":["F.Cu"],"index":3},"Rx":{"shape":"M -0.05,0.025L 0.05,0.025L 0.05,-0.025L -0.05,-0.025L -0.05,0.025","pos":[0,-0.15],"layers":["F.Cu"],"index":4}};

// commands:
//  - SHIFT+ENTER: render
//  - drap & drop file: kicad import


// constants
const width = 0.86 // board width
const height = 0.69 // board height
const x = 1 // x origin
const y = 1 // y origin
const zt = 0 // top z
const zb = -0.06 // bottom z
const w = .015 // wire width
const mask = .004 // solder mask size
const border = 0.05 // rendering border

/* -- DECLARE_PCB -- */
let board = new PCB();

let interior = geo.translate(geo.rectangle(width, height), [x+width/2, y+height/2]);


/* -- ADD_COMPONENTS -- */
// let IC1 = board.add(ATtiny412, {translate: pt(x+.45, y+.44), name: 'IC1\nt412'});
// let C1 = board.add(C_1206, {translate: pt(IC1.posX, IC1.padY("VCC")+.08), name: 'C1 1uF'});
// let J1 = board.add(header_FTDI, {translate: pt(x+width-.23, IC1.posY-.1), name: 'J1\nserial\n5V'});
// let J2 = board.add(header_UPDI, {translate: pt(IC1.posX, y+.23), rotate: 90, name: 'J2\nUPDI'});
// let S1 = board.add(button_6mm, {translate: pt(J2.posX-.27, y+.2), rotate: 0, name: 'S1'});

let IC2 = board.add(op_amp_SOT23_5, {translate: pt(x+0.6, y+0.54), rotate: 90, name: 'IC2'});
let R7 = board.add(R_1206, {translate: pt(x+0.15, y+0.5), rotate: 90, name: 'R7'});
let R6 = board.add(R_1206, {translate: pt(x+0.25, y+0.5), rotate: 90, name: 'R6'});
let R5 = board.add(R_1206, {translate: pt(x+0.35, y+0.5), rotate: 90, name: 'R5'});
let R4 = board.add(R_1206, {translate: pt(x+0.45, y+0.5), rotate: 90, name: 'R4'});
let C = board.add(C_1206, {translate: pt(x+0.3, y+0.3), name: 'C'})
let J = board.add(header_serial_Frev, {translate: pt(x+0.55, y+0.2), rotate: 90, name: 'J3\nserial F'});
let MIC = board.add(C_1206, {translate: pt(x+0.05, y+0.38), rotate: 90, name: 'MIC'})

board.addShape("interior", interior);


/* -- ADD_WIRES -- */


board.wire(path(MIC.pad("1"),
                pt(MIC.padX("1"), J.posY),
                J.pad("G"),), w);

board.wire(path(MIC.pad("2"),
                R7.pad("1"),), w);

board.wire(path(R7.pad("1"),
               pt(R7.padX("1"), C.posY),
               C.pad("1"),),w);

board.wire(path(R5.pad("1"),
               pt(R5.padX("1"), C.posY),),w);


board.wire(path(R5.pad("2"),
                R4.pad("2"),), w);

board.wire(path(R7.pad("2"),
                pt(R7.padX("2"), R7.padY("2")+0.09),
                pt(R7.padX("2")+0.65, R7.padY("2")+0.09),
                pt(R7.padX("2")+0.65, R7.padY("2")-0.46),
                pt(J.padX("5V"), R7.padY("2")-0.46),
                J.pad("5V"),),w);

board.wire(path(IC2.pad("I-"),
                pt(R4.padX("2"), IC2.padY("I-")),),w);

board.wire(path(IC2.pad("O"),
                pt(IC2.padX("O"), R4.padY("1")),
               R4.pad("1"),),w);

board.wire(path(R7.pad("2"),
                pt(R7.padX("2"), IC2.padY("V+")),
  pt(1.55, 1.5),
               ),w);

board.wire(path(R6.pad("1"),
               pt(R6.padX("1"), R6.padY("1")-0.07),
  pt(1.3, 1.37),
  pt(1.3, 1.2),
               ),w);

board.wire(path(J.pad("Tx"),
               pt(J.padX("Tx"), R4.padY("1")),
               ),w);


// board.wire(path(J1.pad("GND"),
//                 pt(IC1.padX("GND"), J1.padY("GND")),
//                 IC1.pad("GND"),), w);

// board.wire(path(C1.pad("1"),
//                 pt(C1.padX("1"), C1.padY("1")+.06),
//                 pt(J1.posX+.1, C1.padY("1")+.06),
//                 pt(J1.posX+.1, J1.padY("VCC")),
//                 J1.pad("VCC"),), w);

// board.wire(path(pt(C1.padX("2"), J1.padY("GND")),
//                 pt(IC1.padX("GND"), J1.padY("GND")),
//                 IC1.pad("GND"),), w);

// board.wire(path(J2.pad("UPDI"),
//                 pt(IC1.posX+.03, J2.posY),
//                 pt(IC1.posX+.03, IC1.padY("UPDI")),
//                 IC1.pad("UPDI"),), w);

// board.wire(path(J2.pad("GND"),
//                 pt(IC1.posX, J2.posY),
//                 pt(IC1.posX, IC1.padY("GND")),
//                 IC1.pad("GND"),), w);

// board.wire(path(IC1.pad("PA6"),
//                 pt(IC1.padX("PA6")-.16, IC1.padY("PA6")),
//                 pt(IC1.padX("PA6")-.16, J2.posY-.2),
//                 pt(J1.posX-.08, J2.posY-.2),
//                 pt(J1.posX-.08, J1.padY("Rx")),
//                 J1.pad("Rx"),), w);

// board.wire(path(IC1.pad("PA7"),
//                 pt(IC1.padX("PA7")-.13, IC1.padY("PA7")),
//                 pt(IC1.padX("PA7")-.13, J2.posY-.17),
//                 pt(J1.posX-.11, J2.posY-.17),
//                 pt(J1.posX-.11, J1.padY("Tx")),
//                 J1.pad("Tx"),), w);

// board.wire(path(S1.pad("R2"),
//                 pt(J2.padX("GND"), S1.padY("R1")),
//                 J2.pad("GND"),), w);

// board.wire(path(S1.pad("L2"),
//                 pt(S1.padX("L2"), IC1.padY("PA1")),
//                 IC1.pad("PA1"),), w);


// rendering
renderPCB({
  pcb: board,
  layerColors: {
    "interior": "#002d00ff",
    "B.Cu": "#ff4c007f",
    "F.Cu": "#ff8c00cc",
    "drill": "#ff3300e5",
    "padLabels": "#ffff99e5",
    "componentLabels": "#00e5e5e5",
  },
  limits: {
    x: [x-border, x+width+border],
    y: [y-border, y+height+border]
  },
  mm_per_unit: 25.4
})
