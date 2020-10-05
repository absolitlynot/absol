// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
    
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      5,      1,      1.4,    1,      15,     2.9], 
    swarm:              [40,    0.25,  0.05,   0.32,   0.85,   0.8,    0.85,   4,      1,      1,      1,      5,      1],  
    drone:              [85,    0.25,  0.1,    0.6,    1.8,    2.5,    3,      1.9,    0.75,   1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],
    start:              [1.5,   0.5,   1.5,      0.9,    0.9,    0.82,   0.9,    0.5,    0.7/1,  1,      1.01,   1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    weakling:           [1,     1,     1,      1,      1,      1.1,    1,      1,      1,      1,      1,      1,      1],
     atrap:             [100000,0,     1,      0,      0.005,  0.005,  0.005,  1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1], 
        miniminion:     [0.6,   1,     2,      0.8,    0.25,   0.25,    0.8,   1,      1,      1,      1,      2,      1], 
        single:         [1.05,  1,     1,      1,      1,      1.04,   1.04,   1.04,   1,      1,      1,      1,      1], 
    bugs:               [0.9,   2,     1,      1,      1.1,    1.1,    1.1,    1,      1,      1,      1,      2,      1],
    mugglesmall:        [1,     0.9,   1,      1,      0.95,   1,      1,      1,      1.02,   1,      1,      1,      1],
    mugglebig:          [1,     1.1,   1,      1,      1.05,   1,      1,      1,      1.02,   1,      1.02,   1,      1],
      sniper:           [1.35,  1,     0.25,   1,      1,      0.82,   1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.1],
        rifle:          [0.8,   0.8,   1.5,    1,      0.9,    0.9,    0.9,    1.1,    1,      1,      1,      2,      1],     
        assass:         [1.6,   1,     0.25,   1,      1.1,    1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.85,   0.8,    1.1,    0.82,   1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            handle:     [1,     1.1,   1,      1.4,    1,      1.05,   1,      1,      1,      1,      1,      1,      1],  
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.9,   1.7,    0.8,    0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.4,   1.25,   1.05,   1.5,    0.95,   0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [0.72,  0.5,   1,      0.7,    0.5,    0.45,   1,      1,      0.65,   1.5,    1.25,   0.5,    1.1],
            barri:      [1,     1,     1,      0.95,   1.1,    1.1,    1.10,   1,      1,      0.9,    1,      1,      1],
            megagun:    [1,     0.9,   1,      1.02,   1,      1,      1,      1,      0.9,    1,      1,      1,      1],
            flame:      [1,     0.6,   1,      0.8,    2,      0.5,    1,      1,      1,      1,      1.25,   0.5,    1.1],
            stream:     [1.1,   0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],  
             miniliner: [1,     0.2,   1,      0.925,  1,      0.9,    1,      1,      1,      1,      1.02,   1,      1],
        shotgun:        [8,     0.5,   1,      1.5,    1,      0.6,    0.8,    1.9,    0.6,    1,      1.2,    1.2,    1],
          weakshotgun:  [1,     1,     1,      1,      0.9,    0.9,    0.9,    1,      1,      1,      1,      1,      1],
          trapshot:     [1.05,  1,     1,      0.7,    1,      0.9,    1,      1,      1,      1,      1,      4.5,    1],
    flank:              [0.9,   1.2,   1,      1,      1.,     0.8,    0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.6,   0.75,  0.5,    0.9,    0.95,   0.85,   1,      0.8,    1,      0.8,    1.3,    1,      1.25],
            magician:   [1.1,   1,     1,      1,      0.95,   0.95,   0.95,   1,      1,      1,      0.95,   1,      0.9],
             magician2: [1.15,  0,     1,      1,      0.9,    0.95,   0.95,   1,      1,      1,      1,      1,      1],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      1.9,    1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        drive:          [1.5,   1,     1,      1,      1,      0.9,    1,      0.9,    0.9,    0.9,    1,      1,      1],
        destroy:        [2.5,   1.8,   0.5,    1,      1.9,    1.8,    1,      0.60,   0.5,    1,      2,      1,      3],   
            anni:       [0.85,  1.25,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],    
            hive:       [0.85,  0.8,   1,      0.8,    0.7,    0.6,    1,      1,      1,      1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],  
            shots:      [1.15,  0.9,   1,      1,      0.86,   0.9,    0.8,    1,      1,      1,      1,      1,      1],
    twin:               [1,     0.5,   0.9,    0.95,   0.85,   0.7,    0.9,    1,      1,      1,      1,      1.2,    1],
        bulwark:        [1,     1,     1,      1,      1,      0.95,   1,      1,      0.95,   1,      1,      1,      1],        
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.9,    0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.5,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.65,   1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.72,   1,      1,      1,      0.1,    1,      1], 
        ception:        [1.4,   0.6,   1,      1,      0.6,    0.6,    0.6,    1.1,    1,      1,      1,      1,      1],
        followturret:   [0.8,   0.8,   1,      1,      0.9,    0.9,    0.9,    1.1,    0.95,   1,      1,      1,      1],
        mortalturret:   [1,     0.8,   1,      1,      0.9,    0.9,    0.9,    1.2,    1.2,    1.1,    1,      1,      1],
        bulletturret:   [5,     1,     1,      1,      0.5,    0.52,   0.5,    0.7,    0.8,    1,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        hom:            [1.2,   1,     1,      0.5,    0.95,   1,      1,      0.7,    1.1,    1,      1,      2,      1],
        bees:           [0.6,   0.25,  1,      1.1,    0.9,    0.7,    0.6,    1,      1,      1.1,    0.25,   1,      1],  //0.55
          swarmerbees:  [1.15,  1,     1,      0.9,    1,      1,      1,      0.8,    1,      1,      1,      1,      1],
          colony:       [1.1,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],          
        dead:           [5,     0.25,  0.1,    0.6,    1.5,    2.5,    3,      2,      0.75,   1,      1,      0.1,    1],   
        carrier:        [1.4,   1,     1,      1,      1,      0.8,    1,      1.3,    1.15,   1.2,    1,      1,      1],
         funky:         [1,     5.5,   1,      1.2,    1.1,    1.09,   1,      0.6,    1.3,    1,      1.02,   1,      1],
        socialmedia:    [1.2,   1.2,   1,      1,      1.15,   1.15,   1.15,   0.9,    0.8,    1,      1.1,    1,      1],
        sandy:          [0.9,   1,     1,      1,      1.05,   1,      1,      0.7,    1,      1.5,    1,      1,      1],
         storm:         [1.1,   0,     1,      0.8,    1.1,    1.15,   1,      0.8,    0.5,    1.2,    1,      1,      1.02],
         mud:           [1.25,  1,     1,      1,      0.98,   1,      1,      1,      1,      0.95,   1,      1,      1],
        creeper:        [1,     1,     1,      1.05,   1.1,    1,      1,      1,      1,      1.3,    1,      1,      1],
         creepster:     [0.9,   1.2,   1,      1,      0.95,   1,      1,      1,      1,      1.05,   1,      1,      1],
    bulb:               [1,     1,     1,      1,      1.5,    0.75,   0.8,    2,      0.6,    1,      1,      2,      1],
      seed:             [0.99,  1,     1,      1,      1.1,    1,      1,      1,      1,      1,      1,      1,      1],
     hexatrap:          [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],  
     beenest:           [36,    1,     0.25,   0.6,    1,      0.8,    0.9,    3.5,    1,      1,      1,      15,     3], 
     machinetrap:       [0.4,   0.8,   1,      0.3,    0.7,    0.7,    0.7,    1,      1,      1,      1,      2.5,    1],
    block:              [1.5,   2,     0.1,    1.5,    1.5,    1,      0.9,    1.5,    2.1,    0.8,    1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1.08,   0.5,    1,      1,      0.75,   0.75,   1.333,  1,      1,      1], 
        engin:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.6,    1,      1,      1],
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      1,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
         bitweak:       [1,     1,     1,      1,      0.8,    0.8,    0.8,    1,      1,      1,      0.8,    1,      1], 
         tinyweak:      [1,     1,     1,      1,      0.9,    0.9,    0.9,    1,      1,      1,      1,      1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    0.7,    1,      1,      0.1,    0.5,    1,      1], 
         heavymaster:   [6,     1,     1,      0.9,    0.4,    0.6,    0.6,    1,      1,      0.1,    0.5,    1,      1],
        sunchip:        [50,    1,     1,      0.85,   1,      0.6,    0.12,   0.12,   0.75,   1,      1,      1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lessstat:           [1,     1,     1,      1,      0.9,    0.9,    0.9,    1,      1,      1,      1,      1,      1],
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
    norecoil:           [1,     0,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
     morereload:        [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
     tinymorereload:    [0.9,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
     halfreload:        [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
     lessreload:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
     threequartersrof:  [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
       bitlessreload:   [1.2,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    verydense:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1], 
    lessrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.8,    1,      1,      1],    
    morerange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      1.2,    1,      1,      1],
    doublerange:        [1,     1,     1,      1,      1,      1,      1,      1,      1,      2,      1,      1,      1],
      bitmoresize:      [1,     1,     1,      1,1,    1,      1,      1,      1,      1,      1,      1,      1,      1],
      lesssize:         [1,     1,     1,      0.7,    1,      1,      1,      1,      1,      1,      1,      1,      1], 
      bitlesssize:      [1,     1,     1,      0.9,    1,      1,      1,      1,      1,      1,      1,      1,      1], 
      small:            [1,     1,     1,      0.4,    1,      1,      1,      1,      1,      1,      1,      1,      1], 
      doublesize:       [1,     1,     1,      2,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    bitmorepower:       [1,     1,     1,      1,      1,      1.2,    1.2,    1,      1,      1,      1,      1,      1],
    bitlessdamage:      [1,     1,     1,      1,      1,      0.8,    1,      1,      1,      1,      1,      1,      1],
    bitmoredamage:      [1,     1,     1,      1,      1,      1.1,    1,      1,      1,      1,      1,      1,      1],
    morespray:          [1,     1,     1,      0.7,    1,      1,      1,      1,      1,      1,      1,      5,      1], 
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],       
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,     0.5,     5,      1,      10], 
};

const dfltskl = 9

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
}
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
}

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    INVISIBLE: [0.08, 0.04],
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
        dfltskl,
    ],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,
        HETERO: 2,
    },
    FOOD: {
        LEVEL: -1,
    },
}

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
}

const basePolygonDamage = 1
const basePolygonHealth = 2
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15500,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 70 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 4125,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 120 * basePolygonDamage,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 50 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Pentagon',
    VALUE: 375,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 15 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
}
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 5 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
}
exports.orange = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Orange',
    VALUE: 20,
    SHAPE: 1,
    SIZE: 5,
    COLOR: 12,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 8 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
}
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: 2 * basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
}
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 1,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
}

exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
}
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 100,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
}
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 50,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
}

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage / 4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
}
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 1, //10000
        SHIELD: 1, //10000
        REGEN: 1, //1000
        DAMAGE: 1,
        RESIST: 1, //100
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
}
exports.babyObstacle = {
    PARENT: [exports.obstacle],
    SIZE: 25,
    SHAPE: -7,
    LABEL: 'Gravel',
}
exports.racket = {
    PARENT: [exports.obstacle],
    SIZE: 20,
    SHAPE: 0,
    LABEL: 'Racket',
}

// WEAPONS
const wepHealthFactor = 0.5
const wepDamageFactor = 1.5
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
}
exports.mountbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'autospin',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
  GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [9, 6, 0, 7, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.slow, g.halfrange]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.bullet,
                },
            },
            {
                POSITION: [9, 6, 0, 7, 0, 180, 1/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.slow, g.halfrange]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.bullet,
                },
            },
            {
                POSITION: [9, 6, 0, 7, 0, 300, 2/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.slow, g.halfrange]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.bullet,
                },
            },
        ],
}
exports.flame = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    MOTION_TYPE: 'flame',
    BODY: {
        PENETRATION: 0.2,
        SPEED: 0,
        RANGE: 90,
        DENSITY: 0,
        HEALTH: 0.7 * wepHealthFactor,
        DAMAGE: 5 * wepDamageFactor,
        PUSHABILITY: 1,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    //DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
}
exports.casing = {
    PARENT: [exports.bullet],
    LABEL: 'Shell',
    TYPE: 'swarm',
}
exports.rocketshape = {
    PARENT: [exports.bullet],
    LABEL: 'Homing',
    TYPE: 'swarm',
      SHAPE: [
        [2, 0],
        [-2, 1],
        [-1, 0],
        [-2, -1],
    ],
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    BODY: {
        RESIST: 1.1,
        FOV: 1.6,
          }, 
}
exports.hom = {
    PARENT: [exports.rocketshape],
    AI: { FARMER: true},
    INDEPENDENT: true,
}
exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
}
exports.bees = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1,
        HEALTH: 0.3 * wepHealthFactor,
        DAMAGE: 1.3 * wepDamageFactor,
        SPEED: 1,
        RESIST: 1.5,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.7,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
}
exports.bee = {
    PARENT: [exports.swarm],
    PERSISTS_AFTER_DEATH: true,
    SHAPE: 4,
    LABEL: 'Drone',
    HITS_OWN_TYPE: 'hardWithBuffer',
}
exports.growbullet = {
    PARENT: [exports.bullet],
    MOTION_TYPE: 'grow',
}
exports.undead = {
    PARENT: [exports.bee],
    LABEL: 'Undead',
    SHAPE: 4,
    NECRO: true,
}
exports.triangledrone = {
    PARENT: [exports.bullet],
    PERSISTS_AFTER_DEATH: true,
    SHAPE: 3,
    LABEL: 'Drone',
    HITS_OWN_TYPE: 'hardWithBuffer',
}
exports.autobee ={
  PARENT: [exports.bee],
  AI: { FARMER: true},
  INDEPENDENT: true,
}
exports.autoswarm = {
    PARENT: [exports.swarm],
    AI: { FARMER: true },
    INDEPENDENT: true,
}
exports.instaswarm = {
    PARENT: [exports.swarm],
    PERSISTS_AFTER_DEATH: true,
    SHAPE: 5,
    LABEL: 'Picture',
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.6,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 2.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
},
}

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3,
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 550, //used to be 450
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
}
exports.bulbs = {
    LABEL: 'Thrown Bulb',
    TYPE: 'trap',
    CAN_GO_OUTSIDE_ROOM: true,
    ACCEPTS_SCORE: false,
    SHAPE: -0,
    MOTION_TYPE: 'slightgrow', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        RANGE: 500, //used to be 450
        DENSITY: 2,
        RESIST: 2.5,
        SPEED: 0,
    },
}
exports.seeds = {
    LABEL: 'Thrown Bulb',
    TYPE: 'trap',
    CAN_GO_OUTSIDE_ROOM: true,
    ACCEPTS_SCORE: false,
    SHAPE: -0,
    MOTION_TYPE: 'bitgrow', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        RANGE: 500, //used to be 450
        DENSITY: 2,
        RESIST: 2.5,
        SPEED: 0,
    },
}
exports.beenest = {
    PARENT: [exports.trap],
    TYPE: 'Nest',
    LABEL: 'Thrown Nest',
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 550, //used to be 450
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: false,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [7, 9.5, 0.6, 7, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.lessreload, g.lessreload, g.halfreload, g.verydense]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [7, 9.5, 0.6, 7, 0, 180, 1/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.lessreload, g.lessreload, g.halfreload, g.verydense]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
            {
                POSITION: [7, 9.5, 0.6, 7, 0, 300, 2/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm,  g.bees, g.lessreload, g.lessreload, g.halfreload, g.verydense]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
        ],
}
exports.fog = {
    PARENT: [exports.trap],
    TYPE: 'Nest',
    LABEL: 'Fog',
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 550, //used to be 450
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: false,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [9, 6, 0, 7, 0, 60, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.halfreload, g.slow, g.halfrange, g.lowpower]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.bullet,
                },
            },
            {
                POSITION: [9, 6, 0, 7, 0, 180, 1/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.halfreload, g.slow, g.halfrange, g.lowpower]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.bullet,
                },
            },
            {
                POSITION: [9, 6, 0, 7, 0, 300, 2/3],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.halfreload, g.slow, g.halfrange, g.lowpower]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.bullet,
                },
            },
        ],
}

exports.block = {
    LABEL: 'Set Trap',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',
    CONTROLLERS: ['goToMasterTarget'],
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
}
exports.grave = {
  LABEL: 'Set Grave',
  PARENT: [exports.block],
    LABEL: 'Grave',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    SHAPE: 4,
    MAX_CHILDREN: 8,
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
      
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.sunchip, g.lesssize, g.lessreload]),
                        TYPE: exports.undead,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,  
                        CONTROLLERS: ['nearestDifferentMaster'],
                     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.sunchip, g.lesssize, g.lessreload]),
                        TYPE: exports.undead,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,
                        CONTROLLERS: ['nearestDifferentMaster'],
                    }, },
            ],
        }
exports.rollingstone = {
  LABEL: 'Set Trap',
  PARENT: [exports.block],
    LABEL: 'Rolling Stone',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    SHAPE: -9,
    COLOR: 17,
    MAX_CHILDREN: 8,
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
        }
exports.boomerang = {
    LABEL: 'Boomerang',
    PARENT: [exports.trap],
    CONTROLLERS: ['boomerang'],
    MOTION_TYPE: 'motor',
    HITS_OWN_TYPE: 'never',
    SHAPE: -5,
    BODY: {
        SPEED: 1.25,
        RANGE: 120,
    },
}

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster',
    ],
    AI: { BLIND: true },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
}
exports.rocketbullet = {
    PARENT: [exports.bullet],
    LABEL: 'Rocket',
    TYPE: 'Rocket',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    BODY: {
        PENETRATION: 1,
        SPEED: 2,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.8 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    GUNS: [
        {
            POSITION: [10, 5, 0, 5, 0, 180, 0.9],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.mini, g.bitlessspeed, g.slow, g.halfrange, g.halfrange, g.halfrange, g.halfrange, g.doublereload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.mini,
            },
        },
    ],
}
  exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
exports.autosunchip = {
    PARENT: [exports.sunchip],
    AI: {
        BLIND: true,
        FARMER: true,
    },
    INDEPENDENT: true,
}
exports.gunchip = {
    PARENT: [exports.drone],
    SHAPE: -2,
    NECRO: true,
    HITS_OWN_TYPE: 'hard',
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true,
    },
    DRAW_HEALTH: false,
}

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 6, 1, 0, -2, 130, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skim,
                    g.doublereload,
                    g.lowpower,
                    g.muchmorerecoil,
                    g.morespeed,
                    g.morespeed,
                ]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 230, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skim,
                    g.doublereload,
                    g.lowpower,
                    g.muchmorerecoil,
                    g.morespeed,
                    g.morespeed,
                ]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
}
exports.hypermissile = {
    PARENT: [exports.missile],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 6, 1, 0, -2, 150, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skim,
                    g.doublereload,
                    g.lowpower,
                    g.morerecoil,
                    g.morespeed,
                ]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 210, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skim,
                    g.doublereload,
                    g.lowpower,
                    g.morerecoil,
                    g.morespeed,
                ]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 6, 1, 0, -2, 90, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skim,
                    g.doublereload,
                    g.lowpower,
                    g.morerecoil,
                    g.morespeed,
                ]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 270, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.skim,
                    g.doublereload,
                    g.lowpower,
                    g.morerecoil,
                    g.morespeed,
                ]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
            },
        },
    ],
}
exports.snake = {
    PARENT: [exports.bullet],
    LABEL: 'Snake',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.snake,
                    g.snakeskin,
                    g.morerecoil,
                ]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
            },
        },
        {
            POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                NEGATIVE_RECOIL: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.snake,
                    g.morerecoil,
                ]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }],
            },
        },
    ],
}
exports.minihive = {
    PARENT: [exports.bullet],
    LABEL: 'Mini Hive',
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: false,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
    AI: { NO_LEAD: true },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 9.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.swarmerbees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                     POSITION: [7, 9.5, 0.6, 7, 0, 120, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.swarmerbees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 240, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.swarmerbees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },    },
    ]
}
exports.hive = {
    PARENT: [exports.bullet],
    LABEL: 'Hive',
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: false,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
    AI: { NO_LEAD: true },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 9.5, 0.6, 7, 0, 36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.swarmerbees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                     POSITION: [7, 9.5, 0.6, 7, 0, 108, 1/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.swarmerbees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 180, 2/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.swarmerbees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },    },
              {
            POSITION: [7, 9.5, 0.6, 7, 0, 252, 3/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.swarmerbees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },    },
              {
            POSITION: [7, 9.5, 0.6, 7, 0, 324, 4/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees, g.swarmerbees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },    },
    ]
}
exports.hive2 = {
    PARENT: [exports.bullet],
    LABEL: 'Hive',
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: false,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
    AI: { NO_LEAD: true },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                     POSITION: [7, 9.5, 0.6, 7, 0, 180, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 252, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },    },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.hive1 = {
    PARENT: [exports.bullet],
    LABEL: 'Hive',
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: 'turnWithSpeed',
    INDEPENDENT: false,
    CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
    AI: { NO_LEAD: true },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
}
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    INVISIBLE: [0, 0],
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    ALPHA: 1,
    SIZE: 12,
    MAX_CHILDREN: 0,
    DAMAGE_EFFECTS: false,
    CAN_BE_ON_LEADERBOARD: true,
    BODY: {
        // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH,
        DAMAGE: base.DAMAGE,
        PENETRATION: base.PENETRATION,
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
}
exports.genericTank2 = {
    LABEL: 'Spectator',
    TYPE: 'tank',
    DAMAGE_CLASS: 0,
    INVISIBLE: [0, 1],
    DANGER: -1,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    ALPHA: 1,
    SIZE: 12,
    MAX_CHILDREN: 0,
    DAMAGE_EFFECTS: false,
    CAN_BE_ON_LEADERBOARD: false,
    BODY: {
        // def
        ACCELERATION: base.ACCEL * 1.5,
        SPEED: base.SPEED * 1.7,
        SHIELD: 10000,
        REGEN: 10000,
        HEALTH: 10000,
        DAMAGE: 0,
        PENETRATION: base.PENETRATION,
        FOV: base.FOV * 2,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.2,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
}
let gun = {}

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    DANGER: 0,
    BODY: {
        FOV: 0.8,
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
//                    g.power,
                    g.morerecoil,
                    g.turret,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.autoautoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    DANGER: 0,
    BODY: {
        FOV: 0.8,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
    CONTROLLERS: [
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
//                    g.power,
                    g.morerecoil,
                    g.turret,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}

exports.overdriveSquare = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    SHAPE: 4
};
exports.invisibleround = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    SHAPE: 0
};
exports.twinfake = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    GUNS: [
    //CONTROLLERS: ['nearestDifferentMaster'],
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 7.5, 1, 0,  5.5, 0, 0], },
      {
            POSITION: [18, 7.5, 1, 0, -5.5, 0, 0],        
        },   ],
                                
};
exports.followerfake = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0],
        },
    ],
}
exports.flankfake = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
        },
    ],
}
exports.shooterfake = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
                GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [ 20,     7,      1,      0,      0,      0,      0.25 ],
 }, {
                  POSITION: [ 20,     3,      1,       0,      0,     0,     0.25  ],
}, {
                  POSITION: [ 17,     4,      1,       0,      0,     0,     0.25  ],
}, {
                  POSITION: [ 17,     5,      1,       0,      0,     0,     0.25  ],
 },
  ],                              
};
exports.machineAutoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    DANGER: 0,
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 11, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.morerecoil,
                    g.turret,
                    g.mach,
                    g.slow,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.autoSmasherTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    DANGER: 0,
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 6, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.morerecoil,
                    g.turret,
                    g.fast,
                    g.mach,
                    g.pound,
                    g.morereload,
                    g.morereload,
                    g.destroy,
                ]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
        {
            POSITION: [20, 6, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.morerecoil,
                    g.turret,
                    g.fast,
                    g.mach,
                    g.pound,
                    g.morereload,
                    g.morereload,
                    g.destroy,
                ]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
    ],
}
exports.oldAutoSmasherTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    COLOR: 16,
    DANGER: 0,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, -5.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.lotsmorrecoil,
                    g.morereload,
                ]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
        {
            POSITION: [20, 7, 1, 0, 5.75, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.lotsmorrecoil,
                    g.morereload,
                ]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
    ],
}
exports.autobulletturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    COLOR: 16,
    DANGER: 0,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.bulletturret]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
    ],
}

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.autotankgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.automagiciangun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
    CONTROLLERS: [
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 14,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.magician, g.magician2]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.automalcolmgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
    CONTROLLERS: [
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 17,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.magician, g.magician2]),
                TYPE: exports.bullet,
                COLOR: 17,
            },
        },
    ],
}
exports.bugeyes = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0, 
    COLOR: 17,
}
exports.bugeye = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 5,
}
exports.black = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 9,
}
exports.blue = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 10,
}
exports.gray = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 0,
}
 exports.graydark = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 7,
 } 
 exports.poisongreen = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 11,
 }
exports.orange = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 2,
}
exports.pink = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 5,
}
 exports.pinkdark = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 4,
 }
exports.purple = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 14,
}
exports.white = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 6,
}

exports.white2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 8,
}
exports.yellow = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 1,
}
exports.autotwingun = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto Twin',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.auto]),
                TYPE: exports.bullet,
            },
        },
        {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.auto]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.twincept = {
    PARENT: [exports.genericTank],
    LABEL: 'bullet',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
      CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 10,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.ception]),
                TYPE: exports.bullet,
            },
        },
        {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.ception]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.sand = {
    PARENT: [exports.genericTank],
    LABEL: 'swarm',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
      CONTROLLERS: [
        'spin',
    ],
    COLOR: 10,
    GUNS: [
      {
                  POSITION: [7, 7.5, 0.6, 7, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,

                ]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 270, 1/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,
                ]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 180, 2/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,
                ]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
      {
                    POSITION: [7, 7.5, 0.6, 7, 0, 0, 3/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,
                ]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
    ],
}
exports.lavaball = {
    PARENT: [exports.genericTank],
    LABEL: 'swarm',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
      CONTROLLERS: [
        'spin',
    ],
    COLOR: 2,
    GUNS: [
      {
                  POSITION: [7, 7.5, 0.6, 7, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,

                ]),
                TYPE: exports.swarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 270, 1/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,
                ]),
                TYPE: exports.swarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 180, 2/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,
                ]),
                TYPE: exports.swarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
      {
                    POSITION: [7, 7.5, 0.6, 7, 0, 0, 3/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,
                ]),
                TYPE: exports.swarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
    ],
}
exports.sandstormturret = {
    PARENT: [exports.genericTank],
    LABEL: 'swarm',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
      CONTROLLERS: [
        'spin',
    ],
    COLOR: 10,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([                    
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 45, 0.125],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([                    
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 90, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([                    
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 135, 0.375],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([                    
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([                    
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 225, 0.625],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([                    
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 275, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([                    
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 320, 0.825],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([                    
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.ception,
                    g.storm,]),
                TYPE: exports.autoswarm,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.shotcept = {
    PARENT: [exports.genericTank],
    LABEL: 'bullet',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
      CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 10,
    GUNS: [
        /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
            POSITION: [4, 3, 1, 11, -3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [4, 3, 1, 11, 3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [4, 4, 1, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 12, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 11, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 3, 1, 13, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 3, 1, 13, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 2, 1, 13, 2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 2, 1, 13, -2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.ception]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [15, 14, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.mach,
                    g.shotgun,
                    g.fake,
                ]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [8, 14, -1.3, 4, 0, 0, 0],
        },
    ],
}
exports.spinnerturret = {
    PARENT: [exports.genericTank],
    LABEL: 'bullet',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    COLOR: 16,
    AI: { FARMER: true },
    INDEPENDENT: true,
        CONTROLLERS: [
        'spin'
    ],
    FACING_TYPE: 'autospin',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.ception, g.morereload]),
                TYPE: exports.bullet,
                AUTOFIRE: true,
                FACING_TYPE: 'autospin',
            },
        },
        {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 0, 120, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.ception, g.morereload]),
                TYPE: exports.bullet,
                AUTOFIRE: true,
                FACING_TYPE: 'autospin',
            },
        },
              {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 0, 240, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.ception, g.morereload]),
                TYPE: exports.bullet,
                AUTOFIRE: true,
                FACING_TYPE: 'autospin',
            },
        },
    ],
}
exports.shootcept = {
    PARENT: [exports.genericTank],
    LABEL: 'bullet',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
      CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 10,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.ception, g.shots, g.ception]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.ception, g.shots, g.ception]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.ception, g.shots, g.ception]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.ception, g.shots, g.ception]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
    ],
}
exports.basiccept = {
    PARENT: [exports.genericTank],
    LABEL: 'bullet',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: false },
    INDEPENDENT: false,
      CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 10,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.followcept = {
    PARENT: [exports.genericTank],
    LABEL: 'swarm',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
      CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
      GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.ception, g.followturret]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ], 
}
exports.mortalturret = {
    PARENT: [exports.genericTank],
    LABEL: 'powder',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    AI: { FARMER: true },
    INDEPENDENT: true,
      CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.mortalturret,
                    g.twin,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.mortalturret,
                    g.twin,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.autofollowergun = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto Follower',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
      GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.auto]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.autobeehivegun = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto beehive',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 4, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees, g.auto
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, 2, 40, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees, g.auto
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, -2, -40, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees, g.auto
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
    ],
}
exports.autocruisergun = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto Cruiser',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.auto]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.auto]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.autoshootergun = {
    PARENT: [exports.genericTank],
    LABEL: 'School Shooter',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
                GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [ 20,     7,      1,      0,      0,      0,      0.25 ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                  POSITION: [ 20,     3,      1,       0,      0,     0,     0.25  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                  POSITION: [ 17,     4,      1,       0,      0,     0,     0.25  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                  POSITION: [ 17,     5,      1,       0,      0,     0,     0.25  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, },
                  ],
            };
exports.autotrappergun = {
    PARENT: [exports.genericTank],
    LABEL: 'Automatic trap',
    DANGER: 0,
    BODY: {
        FOV: 1,
    },
    CONTROLLERS: [
        'onlyAcceptInArc',
        'canRepel',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 12, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.trap, g.auto]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.nou = {
    PARENT: [exports.genericTank],
    LABEL: 'Automatic trap',
    DANGER: 0,
    BODY: {
        FOV: 1,
    },
    CONTROLLERS: [
        'onlyAcceptInArc',
        'canRepel',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 12, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.auto]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.autoterrorizergun = {
    PARENT: [exports.genericTank],
    LABEL: 'Hostage',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
     {
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [13, 2, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.auto, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
    ],
}
exports.overdrivedrone = makeAuto(exports.drone, 'Overdrive Drone', {
    type: exports.autobulletturret,
    DANGER: 0,
    size: 10,
})
exports.drive = makeAuto(exports.bullet, 'Bullet Bullet', {
    type: exports.autobulletturret,
    DANGER: 0,
    size: 10,
})
exports.drivetrap = makeAuto(exports.trap, 'Trap Bullet', {
    type: exports.autobulletturret,
    DANGER: -1,
    size: 10,
})
exports.trapbox = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3,
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1],
            TYPE: exports.autobulletturret,
        }
    ]
};
exports.auto5gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.auto,
                    g.five, g.lessreload, g.slow
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.heavy3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 2,
        SPEED: 0.9,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.masterGun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 16,
    MAX_CHILDREN: 6, //6
    AI: {
        NO_LEAD: true,
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 14, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.heavymasterGun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 16,
    MAX_CHILDREN: 7, //6
    AI: {
        NO_LEAD: true,
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 14, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.heavymaster]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.sniper3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 5,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.auto,
                    g.assass,
                    g.autosnipe,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5, 9, -1.5, 8, 0, 0, 0],
        },
    ],
}
exports.bansheegun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    INDEPENDENT: true,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [26, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.auto,
                    g.lessreload,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.bansheegun2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    INDEPENDENT: true,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.auto,
                    g.lessreload,
                    g.destroy
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.auto4gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 4, 1, 0, -3.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.auto,
                    g.gunner,
                    g.twin,
                    g.power,
                    g.slow,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.auto,
                    g.gunner,
                    g.twin,
                    g.power,
                    g.slow,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.bigauto4gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.auto,
                    g.gunner,
                    g.twin,
                    g.twin,
                    g.power,
                    g.halfreload,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [14, 5, 1, 0, 4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.auto,
                    g.gunner,
                    g.twin,
                    g.twin,
                    g.power,
                    g.halfreload,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 5, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.auto,
                    g.gunner,
                    g.twin,
                    g.twin,
                    g.power,
                    g.halfreload,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 16, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 16, 1.1, 20, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto, g.halfreload]),
                TYPE: exports.block,
            },
        },
    ],
}
exports.smasherBody = {
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
}
exports.spikeBody = {
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
}
exports.spikeBody1 = {
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: ['fastspin'],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
}
exports.spikeBody2 = {
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: ['reversespin'],
    COLOR: 9,
    SHAPE: 3,
    INDEPENDENT: true,
}
exports.megasmashBody = {
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
}
exports.dominationBody = {
    LABEL: '',
    DANGER: 0,
    CONTROLLERS: ['dontTurn'],
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
}
exports.baseSwarmTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Protector',
    DANGER: 0,
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ['nearestDifferentMaster'],
    AI: {
        NO_LEAD: true,
        LIKES_SHAPES: true,
    },
    INDEPENDENT: true,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                TYPE: [
                    exports.swarm,
                    { INDEPENDENT: true, AI: { LIKES_SHAPES: true } },
                ],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.baseGunTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Protector',
    DANGER: 0,
    BODY: {
        FOV: 5,
    },
    ACCEPTS_SCORE: false,
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 12, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [11, 13, 1, 6, 0, 0, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [7, 13, -1.3, 6, 0, 0, 0],
        },
    ],
}
exports.baseProtector = {
    PARENT: [exports.genericTank],
    LABEL: 'Base',
    DANGER: 0,
    SIZE: 64,
    DAMAGE_CLASS: 0,
    ACCEPTS_SCORE: false,
    SKILL: skillSet({
        rld: 1,
        dam: 1,
        pen: 1,
        spd: 1,
        str: 1,
    }),
    BODY: {
        // def
        SPEED: 0,
        HEALTH: 10000,
        DAMAGE: 10,
        PENETRATION: 0.25,
        SHIELD: 1000,
        REGEN: 100,
        FOV: 1,
        PUSHABILITY: 0,
        HETERO: 0,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [25, 0, 0, 0, 360, 0],
            TYPE: exports.dominationBody,
        },
        {
            POSITION: [12, 7, 0, 45, 100, 0],
            TYPE: exports.baseSwarmTurret,
        },
        {
            POSITION: [12, 7, 0, 135, 100, 0],
            TYPE: exports.baseSwarmTurret,
        },
        {
            POSITION: [12, 7, 0, 225, 100, 0],
            TYPE: exports.baseSwarmTurret,
        },
        {
            POSITION: [12, 7, 0, 315, 100, 0],
            TYPE: exports.baseSwarmTurret,
        },
    ],
    GUNS: [
        /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
            POSITION: [4.5, 11.5, -1.3, 6, 0, 45, 0],
        },
        {
            POSITION: [4.5, 11.5, -1.3, 6, 0, 135, 0],
        },
        {
            POSITION: [4.5, 11.5, -1.3, 6, 0, 225, 0],
        },
        {
            POSITION: [4.5, 11.5, -1.3, 6, 0, 315, 0],
        },
        {
            POSITION: [4.5, 8.5, -1.5, 7, 0, 45, 0],
        },
        {
            POSITION: [4.5, 8.5, -1.5, 7, 0, 135, 0],
        },
        {
            POSITION: [4.5, 8.5, -1.5, 7, 0, 225, 0],
        },
        {
            POSITION: [4.5, 8.5, -1.5, 7, 0, 315, 0],
        },
    ],
}

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.3,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster',
        'mapAltToFire',
        'minion',
        'canRepel',
        'hangOutNearMaster',
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
                WAIT_TO_CYCLE: true,
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.miniminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Miniminion',
    TYPE: 'miniminion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.3,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 3.5,
        SHIELD: 0,
        DAMAGE: 0.6,
        RESIST: 1,
        PENETRATION: 0.9,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster',
        'mapAltToFire',
        'minion',
        'canRepel',
        'hangOutNearMaster',
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.miniminion]),
                WAIT_TO_CYCLE: true,
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.follion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion',
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster',
        'mapAltToFire',
        'minion',
        'canRepel',
        'hangOutNearMaster',
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.minion]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.flinion = {
    PARENT: [exports.genericTank],
    LABEL: 'Flinion',
    TYPE: 'Flinion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster',
        'mapAltToFire',
        'minion',
        'canRepel',
        'hangOutNearMaster',
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.twinion = {
    PARENT: [exports.genericTank],
    LABEL: 'Twinion',
    TYPE: 'Twinion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster',
        'mapAltToFire',
        'minion',
        'canRepel',
        'hangOutNearMaster',
    ],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0,  5.5, 0, 0],
        }, {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.twin]),
                WAIT_TO_CYCLE: true,
                TYPE: exports.bullet,
            },      
            POSITION: [20, 8, 1, 0, -5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.twin]),
                WAIT_TO_CYCLE: true,
                TYPE: exports.bullet,
            }, },
         
    ],
}
         exports.shootion = {
            PARENT: [exports.genericTank],
                 LABEL: 'Shooter Minion',
                 TYPE: 'minion',
                 DAMAGE_CLASS: 0,
                 HITS_OWN_TYPE: 'hardWithBuffer',
                 FACING_TYPE: 'smoothToTarget',
                 BODY: {
                   FOV: 0.5,
                   SPEED: 3,
                   ACCELERATION: 0.4,
                   HEALTH: 5,
                   SHIELD: 0,
                   DAMAGE: 1.2,
                   RESIST: 1,
                   PENETRATION: 1,
                   DENSITY: 0.4,
    },
                 AI: {
                     BLIND: true,
                 },
                 DRAW_HEALTH: false,
                 CLEAR_ON_MASTER_UPGRADE: true,
                 GIVE_KILL_MESSAGE: false,
                 CONTROLLERS: [
                 'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
                GUNS: [{/*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [ 20,     7,      1,      0,      0,      0,      0.25 ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.minion, g.shots]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                  POSITION: [ 20,     3,      1,       0,      0,     0,     0.25  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.minion, g.shots]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                  POSITION: [ 17,     4,      1,       0,      0,     0,     0.25  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.minion, g.shots]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                  POSITION: [ 17,     5,      1,       0,      0,     0,     0.25  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.minion, g.shots]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, },
                  ],
            };
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    DANGER: 0,
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.minion,
                    g.turret,
                    g.power,
                    g.auto,
                    g.notdense,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: exports.pillboxTurret,
        },
    ],
}
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: [
        'canRepel',
        'onlyAcceptInArc',
        'mapAltToFire',
        'nearestDifferentMaster',
    ],
    LABEL: '',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 14, -0.5, 9, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.arty,
                    g.arty,
                    g.skim,
                ]),
                TYPE: exports.hypermissile,
            },
        },
        {
            POSITION: [17, 15, 1, 0, 0, 0, 0],
        },
    ],
}
exports.skimboss = {
    PARENT: [exports.genericTank],
    LABEL: 'Elite Skimmer',
    BODY: {
        HEALTH: 300,
        DAMAGE: 2,
        SHIELD: 200,
    },
    SHAPE: 3,
    COLOR: 2,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [15, 5, 0, 60, 170, 0],
            TYPE: exports.skimturret,
        },
        {
            POSITION: [15, 5, 0, 180, 170, 0],
            TYPE: exports.skimturret,
        },
        {
            POSITION: [15, 5, 0, 300, 170, 0],
            TYPE: exports.skimturret,
        },
    ],
}
exports.nestler = {
    PARENT: [exports.genericTank],
    LABEL: 'Nestler',
    BODY: {
        HEALTH: 300,
        DAMAGE: 2,
        SHIELD: 200,
    },
    SHAPE: 3,
    COLOR: 13,
    FACING_TYPE: 'autospin',
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 120, 0],
        },  {
            POSITION: [7, 5.6, 0.6, 7, 0, 180, 0],
                                PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
         /*  PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.bees]),
                TYPE: exports.bee,
                SYNCS_SKILLS: false,
                STAT_CALCULATOR: gunCalcNames.swarm,
            }, */
            },
        {
            POSITION: [3, 7, 1.7, 15, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lessrange, g.lessreload]),
                TYPE: exports.beenest,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },  {
            POSITION: [7, 5.6, 0.6, 7, 0, 60, 0],
                      PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
         /*  PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.bees]),
                TYPE: exports.bee,
                SYNCS_SKILLS: false,
                STAT_CALCULATOR: gunCalcNames.swarm,
            }, */
            },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lessrange, g.lessreload]),
                TYPE: exports.beenest,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 240, 0],
        },  {
            POSITION: [7, 5.6, 0.6, 7, 0, 300, 0],
                                PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
         /*  PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.bees]),
                TYPE: exports.bee,
                SYNCS_SKILLS: false,
                STAT_CALCULATOR: gunCalcNames.swarm,
            }, */
            },
        {
            POSITION: [3, 7, 1.7, 15, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lessrange, g.lessreload]),
                TYPE: exports.beenest,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, 
    
  ]
}

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true }
    if (options.type != null) {
        turret.type = options.type
    }
    if (options.size != null) {
        turret.size = options.size
    }
    if (options.independent != null) {
        turret.independent = options.independent
    }

    let output = JSON.parse(JSON.stringify(type))
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [turret.size, 0, 0, 180, 360, 1],
        TYPE: [
            turret.type,
            {
                CONTROLLERS: ['nearestDifferentMaster'],
                INDEPENDENT: turret.independent,
            },
        ],
    }
    if (type.GUNS != null) {
        output.GUNS = type.GUNS
    }
    if (type.TURRETS == null) {
        output.TURRETS = [autogun]
    } else {
        output.TURRETS = [...type.TURRETS, autogun]
    }
    if (name == -1) {
        output.LABEL = 'Auto-' + type.LABEL
    } else {
        output.LABEL = name
    }
    output.DANGER = type.DANGER + 1
    return output
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type))
    let spawner = {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    }
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS
    }
    if (type.GUNS == null) {
        output.GUNS = [spawner]
    } else {
        output.GUNS = [...type.GUNS, spawner]
    }
    if (name == -1) {
        output.LABEL = 'Hybrid ' + type.LABEL
    } else {
        output.LABEL = name
    }
    return output
}
// effects
exports.poisonEffect = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    SIZE: 3,
    BODY: {
      RANGE: 30,
    },
    FACING_TYPE: 'autospin',
    COLOR: 11,
};


exports.slowEffect = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    SIZE: 3,
    FACING_TYPE: 'autospin',
    BODY: {
      RANGE: 30,
    },
    COLOR: 3,
};
exports.iceEffect = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    SIZE: 3,
    BODY: {
      RANGE: 30,
    },
    FACING_TYPE: 'autospin',
    COLOR: 10,
};
exports.burnOverlay = {
    SHAPE: 0,
    COLOR: 2,
};
exports.cumOverlay = { //UWU CUM YUMMIE CRACKER YUMMIE
    SHAPE: 0,
    COLOR: 8,
};
exports.cumbullet = {       
    PARENT: [exports.bullet],
 TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: exports.cumOverlay,
    }],
};
exports.burnEffect = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    SIZE: 8,
    FACING_TYPE: 'autospin',
    COLOR: 12,
    BURN: true,
    BURN_TO_APPLY: 3,
    SHOWBURN: false,
    BODY: {
      RANGE: 30,
      DAMAGE: 10.25 * wepDamageFactor,
    },
    TURRETS: [{
        /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: exports.burnOverlay,
    }],
};
exports.shoccbullet = {       
    PARENT: [exports.bullet],
    SHOCK: true,
    SHOCK_TO_APPLY: 3,
    SHOWSHOCK: false,
};
exports.poisonbullet = {       
    PARENT: [exports.bullet],
    POISON_TO_APPLY: 0.06,
    POISON: true,
    SHOW_POISON: true
};
exports.weakpoisonbullet = {       
    PARENT: [exports.bullet],
    POISON_TO_APPLY: 0.03,
    POISON: true,
    SHOW_POISON: true
};
exports.poisondrone = {       
    PARENT: [exports.drone],
    POISON_TO_APPLY: 0.06,
    POISON: true,
    SHOW_POISON: true
};
exports.firebullet = {       
    PARENT: [exports.bullet],
    BURN: true,
    BURN_TO_APPLY: 1,
    SHOWBURN: true,
};
exports.icebullet = {
    PARENT: [exports.bullet],
    ICE_TO_APPLY: 0.05,
    ICE: true,
    SHOW_ICE: true
};
exports.fireswarm = {       
    PARENT: [exports.swarm],
    BURN: true,
    BURN_TO_APPLY: 1,
    SHOWBURN: true,
};
exports.icedrone = {
    PARENT: [exports.drone],
    ICE_TO_APPLY: 0.05,
    ICE: true,
    SHOW_ICE: true,
};
exports.iceswarm = {
    PARENT: [exports.swarm],
    ICE_TO_APPLY: 0.05,
    ICE: true,
    SHOW_ICE: true,
};
exports.weakling = {
    PARENT: [exports.genericTank],
    LABEL: 'Weakling',
    DANGER: 6,
    SIZE: 10,
      BODY: {
        SPEED: 7,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.weakling,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.abilitist = {
    PARENT: [exports.genericTank],
    LABEL: 'Abilitist',
    DANGER: 6,
    SIZE: 10,
      BODY: {
        SPEED: 7,
      },
    TURRETS: 
    [{  /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  14,     0,      0,      0,     360,  1,], 
        TYPE: exports.purple,
    },
     {
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.yellow, 
     }
    ],
  GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.drive,
                ]),
                TYPE: exports.drive,
            },
        },
    ],
}
exports.alchemist = {
    PARENT: [exports.genericTank],
    LABEL: 'alchemist',
    DANGER: 6,
    SIZE: 10,
      BODY: {
        SPEED: 7,
      },
    TURRETS: 
    [
     {
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.poisongreen, 
     }
    ], 
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.weakpoisonbullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 1.5, 1, 0, 0, 0, 0],
            COLOR: 14,
            },
    ],
}
exports.zombie = {
    PARENT: [exports.genericTank],
    LABEL: 'Zombie',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    TURRETS: 
    [
     {
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.poisongreen, 
     }
    ], 
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.weakpoisonbullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.weakpoisonbullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 1.5, 1, 0, 2.5, 0, 0],
            COLOR: 14,
            },              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 1.5, 1, 0, -2.5, 0, 0],
            COLOR: 14,
            },
    ],
}
exports.loner = {
    PARENT: [exports.genericTank],
    LABEL: 'Loner',
    DANGER: 6,
    SIZE: 10,
      BODY: {
        SPEED: 7,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.single,
                ]),
                TYPE: exports.bullet,
            },
        },
                         {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [11, 5, -1.8, 0, 0, 0, 0],
        },
    ],
}
exports.couple = {
    PARENT: [exports.genericTank],
    LABEL: 'Couple',
    DANGER: 6,
    SIZE: 10,
      BODY: {
        SPEED: 7,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2.5, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.single,
                    g.twin,
                ]),
                TYPE: exports.bullet,
            },
        },
                         {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [11, 5, -1.8, 0, 2.5, 0, 0],
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2.5, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.single,
                    g.twin,
                ]),
                TYPE: exports.bullet,
            },
        },
                         {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [11, 5, -1.8, 0, -2.5, 0, 0],
        },
    ],
}
exports.muggle = {
    PARENT: [exports.genericTank],
    LABEL: 'Muggle',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.lessreload,
                    g.mugglesmall,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 4, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.lessreload,
                    g.mugglebig,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.bulb = {
    PARENT: [exports.genericTank], //omgabulb
    LABEL: 'Bulb', 
      DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
                          {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb]),
                TYPE: exports.bulbs,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, 0, 0],
            },
    ],
}
exports.seed = {
    PARENT: [exports.genericTank], //omgabulb
    LABEL: 'Seed', 
      DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
                          {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 4, 1, 0, 0, 0, 0],
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, 0, 0],
                            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.seed]),
                TYPE: exports.seeds,
            },
            },
    ],
}
exports.lavender = {
    PARENT: [exports.genericTank], //omgabulb
    LABEL: 'Lavender', 
      DANGER: 6,
    SIZE: 10.5,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
                          {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 4, 1, 0, 0, 0, 0],
            },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, 0, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.seed]),
                TYPE: exports.seeds,
            },
            }, 
      {
                  /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 4, 1, 0, 0, 20, 0.5],
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, 20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.seed]),
                TYPE: exports.seeds,
            },
            },
      {
                  /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 4, 1, 0, 0, -20, 0.5],
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.seed]),
                TYPE: exports.seeds,
            },
            },
    ],
}
exports.sprinkler = {
    PARENT: [exports.genericTank], 
    LABEL: 'Sprinkler', 
      DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
                          {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb]),
                TYPE: exports.bulbs,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, 0, 0],
            },        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 2, 1, 0, -2.5, -15, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 2, 1, 0, 2.5, 15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.flower = {
    PARENT: [exports.genericTank], 
    LABEL: 'Flower', 
      DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
                          {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 4, 1, 0, 0, 0, 0],
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.seed]),
                TYPE: exports.seeds,
            },
            },       {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 2, 1, 0, -2.5, -15, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 2, 1, 0, 2.5, 15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.piranhaplant = {
    PARENT: [exports.genericTank], 
    LABEL: 'Piranha Plant', 
      DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
                   {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, -2, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lessstat, g.lessstat, g.bitlessdamage]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.bitlessdamage]),
                TYPE: exports.bulbs,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, 0, 0],
            },        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 2, 1, 0, -2.5, -15, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 2, 1, 0, 2.5, 15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.venusflytrap = {
    PARENT: [exports.genericTank], 
    LABEL: 'Venus Flytrap', 
      DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
                   {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, -2, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            }, },        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 2, 1, 0, -2.5, -15, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 2, 1, 0, 2.5, 15, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.mortal = {
    PARENT: [exports.genericTank],
    LABEL: 'Mortal',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.twin,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.twin,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.animal = {
    PARENT: [exports.genericTank],
    LABEL: 'Animal',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
      {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, -2, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.start]), 
                TYPE: exports.bullet,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, -2.5, -5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.twin,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 2.5, 5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.twin,
                ]),
                TYPE: exports.bullet,
            },
        },         
    ],
}
exports.arbok = {
    PARENT: [exports.genericTank],
    LABEL: 'Arbok',
    DANGER: 6,
    SIZE: 14,
        BODY: {
        SPEED: 7,
      },
      TURRETS: 
    [
     {
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.poisongreen, 
     }
    ],
    GUNS: [
      {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, -2, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flank, g.start]), 
                TYPE: exports.poisonbullet,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, -2.5, -5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.poisonbullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 2.5, 5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                ]),
                TYPE: exports.poisonbullet,
            },
        },     
            {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 1.5, 1, -2, 0, 0, 0],
            },
    ],
}
exports.minor = {
    PARENT: [exports.genericTank],
    LABEL: 'Minor',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload, g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13.5, 2.5, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload, g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.fly = {
    PARENT: [exports.genericTank],
    LABEL: 'Fly',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 8,
      },
      TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [4, 5, -2, 270, 0, 1],
            TYPE: exports.bugeyes,
        },
        {
            POSITION: [4, 5, 2, 90, 0, 1],
            TYPE: exports.bugeyes,
        }, 
   /*     {        
            POSITION: [6, 8, 0, 0, 0, 1],
            TYPE: exports.bugeyes,
        }, */
                {
            POSITION: [2, 5, 2.1, 90, 0, 1],
            TYPE: exports.bugeye,
        },
                {
            POSITION: [2, 5, -2.1, 270, 0, 1],
            TYPE: exports.bugeye,
        },
    ],
    GUNS: [
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13.5, 2.5, 1, 8, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                    g.bugs,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13.5, 2.5, 1, 8, 0, 250, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                    g.bugs,
                ]),
                TYPE: exports.bullet,
            },
        }, 
    ],
}
exports.fly2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Ant',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 9,
      },
      TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [4, 5, -2, 270, 0, 1],
            TYPE: exports.bugeyes,
        },
        {
            POSITION: [4, 5, 2, 90, 0, 1],
            TYPE: exports.bugeyes,
        }, 
   /*     {        
            POSITION: [6, 8, 0, 0, 0, 1],
            TYPE: exports.bugeyes,
        }, */
                {
            POSITION: [2, 5, 2.1, 90, 0, 1],
            TYPE: exports.bugeye,
        },
                {
            POSITION: [2, 5, -2.1, 270, 0, 1],
            TYPE: exports.bugeye,
        },
    ],
    GUNS: [
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13.5, 2.5, 1, 8, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                    g.bugs,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13.5, 2.5, 1, 8, 0, 250, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                    g.bugs,
                ]),
                TYPE: exports.bullet,
            },
        },
      {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13.5, 2.5, 1, 8, 0, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                    g.bugs,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13.5, 2.5, 1, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                    g.bugs,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.bachelor = {
    PARENT: [exports.genericTank],
    LABEL: 'Bachelor',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload, g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload, g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload, g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.junior = {
    PARENT: [exports.genericTank],
    LABEL: 'Junior',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 7,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload, g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload, g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload, g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
       {
                  POSITION: [15, 2.5, 1, 0, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 225, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 315, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,g.tinymorereload
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.senior = {
    PARENT: [exports.genericTank],
    LABEL: 'Senior',
    DANGER: 6,
    SIZE: 10,
        BODY: {
        SPEED: 8,
      },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
       {
                  POSITION: [15, 2.5, 1, 0, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 225, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 315, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY  here*/
            POSITION: [15, 2.5, 1, 0, 0, 22.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 67.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 112.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 157.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
       {
                  POSITION: [15, 2.5, 1, 0, 0, 202.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 247.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 292.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 2.5, 1, 0, 0, 337.5, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.tinymorereload,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.basic = {
    PARENT: [exports.genericTank], //omgabasic
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.anchor = {
    PARENT: [exports.genericTank], //omgabasic
    LABEL: 'Anchor',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 2, 1, 0, -5.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 2, 1, 0, 5.5, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.arty]),
                TYPE: exports.bullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7.5, 5, 0.6, 5, -6.5, -20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
      {
            POSITION: [7.5, 5, 0.6, 5, 6.5, 20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
{
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        }, },
    ],
}
exports.homing = {
    PARENT: [exports.genericTank], 
    LABEL: 'Homing',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18.5, 8, -0.6, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.hom]),
                TYPE: exports.hom,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [1, 8, -0.6, 16.5, 0, 0, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [1, 6, -0.6, 15.5, 0, 0, 0],
        },
    ],
}
exports.hooming = {
    PARENT: [exports.genericTank], //omgabasic
    LABEL: 'Hooming',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [25, 0.1, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.doublesize, g.doublesize, g.doublesize, g.doublesize, g.doublesize, g.doublesize, g.doublesize, g.doublesize, g.doublesize]),
                TYPE: exports.hom,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.areaCloser = {
    PARENT: [exports.genericTank],
    SIZE: 50,
    COLOR: 11,
    FOV: 3,
    LABEL: "I'm supposed to  be gray",
    BODY: {
        SHIELD: 10000,
        REGEN: 10000,
        HEALTH: 10000,
        DAMAGE: 0,
        DENSITY: 1,
        RESIST: 10000,
        PUSHABILITY: 0,
        FOV: 2,
        SPEED: 15,
        ACCELERATION: 2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op, g.halfreload]),
                TYPE: exports.bullet
            },
        },
    ],
}
exports.autobasic = {
    PARENT: [exports.genericTank], 
    LABEL: 'Auto-Basic',
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.autoautoTurret,
    }],  
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.feather2 = {
    PARENT: [exports.genericTank], 
    LABEL: 'Feather',
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.followcept,
    }],  
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.basicpg2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Page 2',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.tankWithRock = {
    PARENT: [exports.genericTank],
    LABEL: 'I have only one small egg (dirty people will understand)',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 1],
            TYPE: exports.obstacle,
        },
    ]
}
exports.driver = {
    PARENT: [exports.genericTank],
    LABEL: 'Driver',
    //CONTROLLERS: ['nearestDifferentMaster'],
    TURRETS: 
    [{  /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  14,     0,      0,      0,     360,  1,], 
        TYPE: exports.purple,
    },
     {
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.yellow, 
     }
    ], 
  GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.drive]),
                TYPE: exports.drive,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.mount = {
    PARENT: [exports.genericTank],
    LABEL: 'Mount',
    //CONTROLLERS: ['nearestDifferentMaster'], 
  GUNS: [
        {            POSITION: [15, 3, 1, -13, 0, 0, 0],
        },       {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.drive, g.drive]),
                TYPE: exports.mountbullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.testbed = {
    ALPHA: 1,
    PARENT: [exports.genericTank],
    LABEL: 'Testbed',
    RESET_UPGRADES: true,
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //LEVEL: -1,
    BODY: {
        // def
        SHIELD: 10000,
        REGEN: 10000,
        HEALTH: 10000,
        DAMAGE: 0,
        DENSITY: 0.01,
        PUSHABILITY: 0,
        FOV: 2,
        SPEED: 15,
        ACCELERATION: 2,
    },
    DRAW_HEALTH: false,
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    TURRETS: [],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: [exports.bullet, { SHAPE: 5 }],
            },
        },
    ],
    CAN_BE_ON_LEADERBOARD: true,
}
exports.testbed2 = {
    ALPHA: 1,
    PARENT: [exports.genericTank],
    LABEL: 'Bosses',
    RESET_UPGRADES: false,
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //LEVEL: -1,
    BODY: {
        // def
        SHIELD: 10000,
        REGEN: 10000,
        HEALTH: 10000,
        DAMAGE: 0,
        DENSITY: 0.01,
        RESIST: 10000,
        PUSHABILITY: 0,
        FOV: 2,
        SPEED: 15,
        ACCELERATION: 2,
    },
    DRAW_HEALTH: false,
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    TURRETS: [],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: [exports.bullet, { SHAPE: 5 }],
            },
        },
    ],
    CAN_BE_ON_LEADERBOARD: true,
}
exports.testbed3 = {
    ALPHA: 1,
    PARENT: [exports.genericTank],
    LABEL: 'idek what this is for lol',
    RESET_UPGRADES: false,
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //LEVEL: -1,
    BODY: {
        // def
        SHIELD: 10000,
        REGEN: 10000,
        HEALTH: 10000,
        DAMAGE: 0,
        DENSITY: 0.01,
        RESIST: 10000,
        PUSHABILITY: 0,
        FOV: 2,
        SPEED: 15,
        ACCELERATION: 2,
    },
    DRAW_HEALTH: false,
    SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    TURRETS: [],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: [exports.bullet, { SHAPE: 5 }],
            },
        },
    ],
    CAN_BE_ON_LEADERBOARD: true,
}

exports.single = {
    PARENT: [exports.genericTank],
    LABEL: 'Single',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
        },
    ],
}
exports.notsingle = {
    PARENT: [exports.genericTank],
    LABEL: 'Not Single',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.twin]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 5.5, 0, 0],
        },
              {
            POSITION: [5.5, 15, 1, 0, 5.5, 0, 0], },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.twin]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, -5.5, 0, 0],
        },
                    {
            POSITION: [5.5, 15, 1, 0, -5.5, 0, 0], },
    ],
}
exports.singleguard = {
    PARENT: [exports.genericTank],
    LABEL: 'Single Guard',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
        },
        {
            POSITION: [19, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 120, 0],
        },
        {
            POSITION: [19, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 240, 0],
        },
    ],
}

let smshskl = 12 //13;
exports.smash = {
    PARENT: [exports.genericTank],
    LABEL: 'Smasher',
    DANGER: 6,
    BODY: {
        SPEED: base.speed * 1.5,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2,
    },
    TURRETS: [
        {
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: exports.smasherBody,
        },
    ],
    IS_SMASHER: true,
    SKILL_CAP: [
        smshskl,
        0,
        0,
        0,
        0,
        smshskl,
        smshskl,
        smshskl,
        smshskl,
        smshskl,
    ],
    STAT_NAMES: statnames.smasher,
}
exports.shark = {
    PARENT: [exports.genericTank],
    LABEL: 'Shark',
    DANGER: 6,
    BODY: {
        SPEED: base.speed * 1.5,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2,
    },
      IS_SMASHER: true,
    SKILL_CAP: [
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
],
    STAT_NAMES: statnames.smasher,
    TURRETS: [
        {
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: exports.smasherBody,
        },
    ],
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
exports.megasmash = {
    PARENT: [exports.genericTank],
    LABEL: 'Mega-Smasher',
    DANGER: 7,
    BODY: {
        SPEED: base.speed * 1.55,
        FOV: base.FOV * 1.1,
        DENSITY: base.DENSITY * 4,
    },
    IS_SMASHER: true,
    SKILL_CAP: [
        smshskl,
        0,
        0,
        0,
        0,
        smshskl,
        smshskl,
        smshskl,
        smshskl,
        smshskl,
    ],
    STAT_NAMES: statnames.smasher,
    TURRETS: [
        {
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [24, 0, 0, 0, 360, 0],
            TYPE: exports.megasmashBody,
        },
    ],
}
exports.spike = {
    PARENT: [exports.genericTank],
    LABEL: 'Spike',
    DANGER: 7,
    BODY: {
        SPEED: base.speed * 1.5,
        DAMAGE: base.DAMAGE * 1.1,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2,
    },
    IS_SMASHER: true,
    SKILL_CAP: [
        smshskl,
        0,
        0,
        0,
        0,
        smshskl,
        smshskl,
        smshskl,
        smshskl,
        smshskl,
    ],
    STAT_NAMES: statnames.smasher,
    TURRETS: [
        {
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [20.5, 0, 0, 0, 360, 0],
            TYPE: exports.spikeBody,
        },
        {
            POSITION: [20.5, 0, 0, 120, 360, 0],
            TYPE: exports.spikeBody,
        },
        {
            POSITION: [20.5, 0, 0, 240, 360, 0],
            TYPE: exports.spikeBody,
        },
    ],
}
exports.weirdspike = {
    PARENT: [exports.genericTank],
    LABEL: 'Spike',
    DANGER: 7,
    BODY: {
        SPEED: base.speed * 1.5,
        DAMAGE: base.DAMAGE * 1.15,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 1.5,
    },
    IS_SMASHER: true,
    SKILL_CAP: [
        smshskl,
        0,
        0,
        0,
        0,
        smshskl,
        smshskl,
        smshskl,
        smshskl,
        smshskl,
    ],
    STAT_NAMES: statnames.smasher,
    TURRETS: [
        {
            /** SIZE     X       Y     ANGLE    ARC */
            POSITION: [20.5, 0, 0, 0, 360, 0],
            TYPE: exports.spikeBody1,
        },
        {
            POSITION: [20.5, 0, 0, 180, 360, 0],
            TYPE: exports.spikeBody2,
        },
    ],
}
exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', {
    type: exports.autoSmasherTurret,
    size: 10,
})
exports.autosmash.SKILL_CAP = [
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
    smshskl,
]
exports.twin = {
    //here is code for twin. omgatwin
    PARENT: [exports.genericTank], //parent is parent of the tank
    LABEL: 'Twin', //label is label of the tank (best explaination)
    //jk, label is the tank name in game
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            },
        },
        {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.machinetwin = {
        PARENT: [exports.genericTank],
        LABEL: 'Machinetwin',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    16,     7,     1.4,     4,      5.5,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
                TYPE: exports.bullet,
            }, },
               {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    16,     7,     1.4,     4,      -5.5,      0,      0.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.twin]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.autotwin = {
    PARENT: [exports.genericTank], 
    LABEL: 'Marvel', 
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.mortalturret,
    }],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            },
        },
        {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.twinception = {
    PARENT: [exports.genericTank], 
    LABEL: 'Twinception',
        TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.twincept,
    }],  
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            },
        },
        {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.shotgunception = {
    PARENT: [exports.genericTank], 
    LABEL: 'Shotception',
        TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.shotcept,
    }],  
    GUNS: [
        /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
            POSITION: [4, 3, 1, 11, -3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [4, 3, 1, 11, 3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [4, 4, 1, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 12, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 11, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 3, 1, 13, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 3, 1, 13, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 2, 1, 13, 2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 2, 1, 13, -2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [15, 14, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.mach,
                    g.shotgun,
                    g.fake,
                ]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [8, 14, -1.3, 4, 0, 0, 0],
        },
    ],
}
exports.thicctwin = {
    //here is code for twin.
    PARENT: [exports.genericTank], //parent is parent of the tank
    LABEL: 'Thicc Twin', //label is label of the tank (best explaination)
    //jk, label is the tank name in game
      BODY: {
        SPEED: base.SPEED * 1,
        ACCELERATION: base.ACCEL * 1.2,
        FOV: 1.1,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [200, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            },
        },
        {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [200, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.gunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Gunner',
    DANGER: 6,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.dandelion = {
    PARENT: [exports.genericTank],
    LABEL: 'Dandelion',
    DANGER: 6,
    GUNS: [
                                {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 4, 1, 0, 0, 0, 0],
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.seed]),
                TYPE: exports.seeds,
            },
            },  
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.machinegunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gunner',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 3, 4.0, -3, 5, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [14, 3, 4.0, -3, -5, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [14, 3, 4.0, 0, 2.5, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [14, 3, 4.0, 0, -2.5, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [14, 3, 4.0, 3, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.machgun,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.autogunner = makeAuto(exports.gunner)
exports.nailgun = {
    PARENT: [exports.genericTank],
    LABEL: 'Nailgun',
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.twin,
                    g.nail,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.twin,
                    g.nail,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.twin,
                    g.nail,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0],
        },
    ],
}

exports.double = {
    PARENT: [exports.genericTank],
    LABEL: 'Double Twin',
    DANGER: 6,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.autodouble = {
    PARENT: [exports.genericTank],
    LABEL: 'Thor',
    DANGER: 6,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.mortalturret,
    }],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.tripletwin = {
    PARENT: [exports.genericTank],
    LABEL: 'Triple Twin',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.spam,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.spam,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.spam,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.spam,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.spam,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.spam,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.split = {
    PARENT: [exports.genericTank],
    LABEL: 'Hewn Double',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.twin,
                    g.double,
                    g.hewn,
                    g.morerecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, -5.5, -25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.twin,
                    g.double,
                    g.hewn,
                    g.morerecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.double,
                    g.hewn,
                    g.morerecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.double,
                    g.hewn,
                    g.morerecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.double,
                    g.hewn,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.double,
                    g.hewn,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}

exports.bent = {
    PARENT: [exports.genericTank],
    LABEL: 'Triple Shot',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, -2, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.blackwidow = {
    PARENT: [exports.genericTank],
    LABEL: 'Black Widow',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.mortalturret,
    }],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, -2, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.tripleswarm = {
    PARENT: [exports.genericTank],
    LABEL: 'Triple Swarmer',
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, -2, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
            },
        },
    ],
}
exports.bentdouble = {
    PARENT: [exports.genericTank],
    LABEL: 'Bent Double',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 8, 1, 0, -1, -25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.bent,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, 1, 25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.bent,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.bent,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, -1, 155, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.bent,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, 1, -155, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.bent,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.bent,
                    g.double,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.penta = {
    PARENT: [exports.genericTank],
    LABEL: 'Penta Shot',
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.85,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 8, 1, 0, -3, -30, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 3, 30, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, -2, -15, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, 2, 15, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid')
exports.triple = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.05,
    },
    LABEL: 'Triplet',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 10, 1, 0, 5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 10, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.quint = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    LABEL: 'Quintuplet',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 10, 1, 0, -5, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.triple,
                    g.quint,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 10, 1, 0, 5, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.triple,
                    g.quint,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 10, 1, 0, -3, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.triple,
                    g.quint,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 10, 1, 0, 3, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.triple,
                    g.quint,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.triple,
                    g.quint,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.dual = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    BODY: {
        ACCEL: base.ACCEL * 0.8,
        FOV: base.FOV * 1.1,
    },
    LABEL: 'Dual',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 7, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.dual,
                    g.lowpower,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Small',
            },
        },
        {
            POSITION: [18, 7, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.dual,
                    g.lowpower,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Small',
            },
        },
        {
            POSITION: [16, 8.5, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 8.5, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                TYPE: exports.bullet,
            },
        },
    ],
}

exports.sniper = { //omgasniper
    PARENT: [exports.genericTank],
    LABEL: 'Sniper',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.snipertest = { //omgasniper
    PARENT: [exports.genericTank],
    LABEL: 'Sniper',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [21, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            },
        },
              {
            POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
        },
    ],
}
exports.trisniper2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Tri Sniper',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8.5,    1,      0,      0,      0,      0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            },    },   
          {
            POSITION: [24, 8.5,    1,      0,      0,      120,    0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            },  },    
          {
            POSITION: [24, 8.5,    1,      0,      0,      240,    0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.bodyguard = {
    PARENT: [exports.genericTank],
    LABEL: 'Bodyguard',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8.5,    1,      0,      0,      0,      0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flank]),
                TYPE: exports.bullet,
            },    },   
          {
            POSITION: [21.12, 8.5,    1,      0,      0,      180,    0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flank]),
                TYPE: exports.bullet,
            },  },    
    ],
}
exports.rifle = {
    PARENT: [exports.genericTank],
    LABEL: 'Rifle',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.225,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

            POSITION: [20, 10.5, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [24, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.assassin = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Assassin',
    BODY: {
        ACCELERATION: base.ACCEL * 0.65,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.4,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
        },
    ],
}
exports.tennisracket = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Tennis Racket',
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.4,
    },
    TURRETS: [
             
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.stalker = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    TOOLTIP: 'Stay still to turn invisible.',
    LABEL: 'Stalker',
    BODY: {
        ACCELERATION: base.ACCEL * 0.55,
        SPEED: base.SPEED * 0.95,
        FOV: base.FOV * 1.35,
    },
    INVISIBLE: [0.08, 0.04],
    TURRETS: [
             
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 8.5, -2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.stalker2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Stalker2',
    DANGER: 7,
    TOOLTIP: 'Stay still to turn invisible.',
    BODY: {
        ACCELERATION: base.ACCELERATION * 0.55,
        SPEED: base.SPEED * 0.95,
        FOV: base.FOV * 1.35,
    },
    INVISIBLE: [0.08, 0.04],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 8.5, -2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.removedtanks = {
    PARENT: [exports.genericTank],
    LABEL: 'Removed Tanks',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 12, 0.6, 7, 0, 0, 0],
        },
    ],
}
exports.misctanks = {
    PARENT: [exports.genericTank],
    LABEL: 'Misc Tanks',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 12, 0.6, 7, 0, 0, 0],
        },
    ],
}
exports.misctanks2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Misc Page 2',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 12, 0.6, 7, 0, 0, 0],
        },
    ],
}
exports.specialtanks = {
    PARENT: [exports.genericTank],
    LABEL: 'Special Tanks',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 12, 0.6, 7, 0, 0, 0],
        },
    ],
}
exports.specialtankspage2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Special Tanks Page 2',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 12, 0.6, 7, 0, 0, 0],
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 12, 0.6, 7, 0, 180, 0],
        },
    ],
}
exports.workinprogress = {
    PARENT: [exports.genericTank],
    LABEL: 'Work In Progress',
    GUNS: [
      
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 12, 0.6, 7, 0, 0, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 8, -0.6, 7, 0, 0, 0],
        },
    ],
}
exports.betatanks = {
    PARENT: [exports.genericTank],
    LABEL: 'Beta Tanks',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 12, 0.6, 7, 0, 0, 0],
        },
    ],
}
exports.eventtester = {
    PARENT: [exports.genericTank],
    LABEL: 'Event Tester',
    GUNS: [
                   {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 4, 0.7, 7, 0, 0, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 12, 0.7, 7, 0, 0, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 8, 0.7, 7, 0, 0, 0],
        },
      
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 6, 0.7, 7, 0, 0, 0],
        },

    ],
}
exports.flankassassin = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Crussade',
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.4,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
            POSITION: [27, 8.5, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 8, 0, 180, 0],
            POSITION: [15, 5, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5, 85, -1.6, 8, 0, 90, 0],
            POSITION: [15, 5, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5, 85, -1.6, 8, 0, 270, 0],
        },
    ],
}
exports.ranger = {
    PARENT: [exports.genericTank],
    LABEL: 'Ranger',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.5,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [32, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
        },
    ],
}
exports.thiccranger = {
    PARENT: [exports.genericTank],
    LABEL: ' thicc Ranger',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 1,
        FOV: base.FOV * 2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [320, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
        },
    ],
}
exports.autoass = makeAuto(exports.assassin, '')

exports.hunter = {
    PARENT: [exports.genericTank],
    LABEL: 'Hunter',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.huntguard2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Huntguard',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [24, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 120, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [24, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 240, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.huntguard = {
    PARENT: [exports.genericTank],
    LABEL: 'Huntguard',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.flank,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21.12, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.flank,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18.48, 12, 1, 0, 0, 180, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.flank]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.pub = {
    PARENT: [exports.genericTank],
    LABEL: 'Pub',
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [24, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 120, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [24, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 240, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.lessreload,
                    g.mugglesmall,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 4, 1, 0, 0, 60, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.lessreload,
                    g.mugglebig,
                ]),
                TYPE: exports.bullet,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.lessreload,
                    g.mugglesmall,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 4, 1, 0, 0, 180, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.lessreload,
                    g.mugglebig,
                ]),
                TYPE: exports.bullet,
            },
        },
                          {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 2, 1, 0, 0, 300, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.lessreload,
                    g.mugglesmall,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 4, 1, 0, 0, 300, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.start,
                    g.lessreload,
                    g.mugglebig,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.preda = {
    PARENT: [exports.genericTank],
    LABEL: 'Predator',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.hunter2,
                    g.preda,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.hunter2,
                    g.preda,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 16, 1, 0, 0, 0, 0.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.preda,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.poach = makeHybrid(exports.hunter, 'Poacher')
exports.sidewind = {
    PARENT: [exports.genericTank],
    LABEL: 'Sidewinder',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 11, -0.5, 14, 0, 0, 0],
        },
        {
            POSITION: [21, 12, -1.1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.hunter,
                    g.sidewind,
                ]),
                TYPE: exports.snake,
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}

exports.director = {
    PARENT: [exports.genericTank],
    LABEL: 'Director',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 5,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.show = {
    PARENT: [exports.genericTank],
    LABEL: 'Show',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.followcept,
    }],  
    MAX_CHILDREN: 5,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.movie = {
    PARENT: [exports.genericTank],
    LABEL: 'Movie',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 8,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.followcept,
    }], 
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [6, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
    ],
}
exports.rockslide = {
    PARENT: [exports.genericTank],
    LABEL: 'Rockslide',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1,
    },
    MAX_CHILDREN: 5,
      SHAPE: [
        [-1, -0.8],
        [-0.8, -1],
        [0.8, -1],
        [1, -0.8],
        [0.2, 0],
        [1, 0.8],
        [0.8, 1],
        [-0.8, 1],
        [-1, 0.8],
    ],
    GUNS: [
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 0.360, 0, 0, 0, 0],
              },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [9, 20, 1.2, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.morespeed, g.morespeed, g.morespeed, g.doublesize, g.lessreload, g.lessreload]),
                TYPE: exports.rollingstone,
                AUTOFIRE: false,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 8, 0.33, 10, 0, 180, 0],
              },
    ],
}
exports.rector = {
    PARENT: [exports.genericTank],
    LABEL: 'Rector',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.overdriveSquare,
    }],  
    MAX_CHILDREN: 5,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.overdrivedrone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.master = {
    PARENT: [exports.genericTank],
    LABEL: 'Master',
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.15,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [16, 1, 0, 0, 0, 0],
            TYPE: exports.masterGun,
        },
        {
            POSITION: [16, 1, 0, 120, 0, 0],
            TYPE: [exports.masterGun, { INDEPENDENT: true }],
        },
        {
            POSITION: [16, 1, 0, 240, 0, 0],
            TYPE: [exports.masterGun, { INDEPENDENT: true }],
        },
    ],
}
exports.heavyship = {
    PARENT: [exports.genericTank],
    LABEL: 'Heavyship',
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.15,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [10, 4, 0, 0, 0, 0],
            TYPE: exports.heavymasterGun,
        },
        {
            POSITION: [10, 4, 0, 120, 0, 0],
            TYPE: exports.heavymasterGun,
        },
        {
            POSITION: [10, 4, 0, 240, 0, 0],
            TYPE: exports.heavymasterGun
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [10, 4, 0, 60, 0, 0],
            TYPE: [exports.heavymasterGun, { INDEPENDENT: true }],
        },
        {
            POSITION: [10, 4, 0, 180, 0, 0],
            TYPE: [exports.heavymasterGun, { INDEPENDENT: true }],
        },
        {
            POSITION: [10, 4, 0, 300, 0, 0],
            TYPE: [exports.heavymasterGun, { INDEPENDENT: true }],
        },
    ],
}


exports.overseer = {
    PARENT: [exports.genericTank],
    LABEL: 'Overseer',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 8,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [6, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
    ],
}
exports.overdrive = {
    PARENT: [exports.genericTank],
    LABEL: 'Overdrive',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
  TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.overdriveSquare,
    }],
    MAX_CHILDREN: 8,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.overdrivedrone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [6, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.overdrivedrone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
    ],
}
exports.beelord = {
    PARENT: [exports.genericTank],
    LABEL: 'Beelord',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.morereload]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: false,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [6, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.morereload]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: false,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: false,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [7, 4, 0, 7, 0, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bees]),
                TYPE: [exports.bee],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
                MAX_CHILDREN: 20,
            },
        },
        {
            POSITION: [7, 4, 0, 7, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bees]),
                TYPE: [exports.bee],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
                MAX_CHILDREN: 20,
            },
        },
    ],
}
           exports.beecarefull = {
                PARENT: [exports.genericTank],
                LABEL: 'Bee Carefull',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   50,    50,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.doublereload]),
                            TYPE: exports.undead,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   20,    20,    0.6,     7,      2,      80,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.doublereload]),
                            TYPE: exports.undead,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    10,    0.6,     7,     -2,     -80,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.doublereload]),
                            TYPE: exports.undead,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
exports.overlord = {
    PARENT: [exports.genericTank],
    LABEL: 'Overlord',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
    },
    MAX_CHILDREN: 8,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [6, 12, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [6, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
    ],
}
exports.manager = {
    PARENT: [exports.genericTank],
    LABEL: 'Manager',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        FOV: base.FOV * 1.1,
    },
    INVISIBLE: [0.08, 0.04],
    MAX_CHILDREN: 8,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.invisibleround,
    }],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 13, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.doublereload, g.norecoil]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.colleague = {
    PARENT: [exports.genericTank],
    LABEL: 'Colleague',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
    INVISIBLE: [0.08, 0.04],
    MAX_CHILDREN: 5,
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.invisibleround,
    }],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.norecoil]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.karen = {
    PARENT: [exports.genericTank],
    LABEL: 'Karen',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
    INVISIBLE: [0.08, 0.04],
    MAX_CHILDREN: 5,
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                  POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.invisibleround,
        }, {
                  POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.overdriveSquare,
        }],

    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.norecoil]),
                TYPE: exports.overdrivedrone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.fenix = {
    PARENT: [exports.genericTank],
    LABEL: 'Fenix',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 11, 1.2, 8, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.5, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.overtrapper = {
    PARENT: [exports.genericTank],
    LABEL: 'Overtrapper',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 11, 1.2, 8, 0, 125, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 235, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.5, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.cyclops = {
    PARENT: [exports.genericTank],
    LABEL: 'Cyclops',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.5, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
            {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    }
    ],
}
exports.monstersoldier = {
    PARENT: [exports.genericTank],
    LABEL: 'Monster Soldier',
    DANGER: 6,   
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 1.5,
        FOV: base.FOV * 1.2,
    },
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.overdriveSquare,
    }],
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lessrange]),
                TYPE: exports.drivetrap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
                  {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    }
    ],
}
exports.army = {
    PARENT: [exports.genericTank],
    LABEL: 'Army',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.autoautoTurret,
    }], 
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.5, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
            {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    }
    ],
}
exports.banshee = {
    PARENT: [exports.genericTank],
    LABEL: 'Banshee',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [10, 8, 0, 0, 80, 0],
            TYPE: exports.bansheegun,
        },
        {
            POSITION: [10, 8, 0, 120, 80, 0],
            TYPE: exports.bansheegun,
        },
        {
            POSITION: [10, 8, 0, 240, 80, 0],
            TYPE: exports.bansheegun,
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 11, 1.2, 8, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
    ],
}
exports.silverbanshee = {
    PARENT: [exports.genericTank],
    LABEL: 'Silver Banshee',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [20, 8, 0, 0, 80, 0],
            TYPE: exports.bansheegun2,
        },
        {
            POSITION: [20, 8, 0, 120, 80, 0],
            TYPE: exports.bansheegun2,
        },
        {
            POSITION: [20, 8, 0, 240, 80, 0],
            TYPE: exports.bansheegun2,
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 11, 1.2, 8, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta, g.destroy]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta, g.destroy]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta, g.destroy]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
    ],
}
exports.autoover = makeAuto(exports.overseer, '')
exports.overgunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Overgunner',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 11, 1.2, 8, 0, 125, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 235, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                TYPE: exports.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4,
            },
        },
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.twin,
                    g.slow,
                    g.flank,
                    g.lotsmorrecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.twin,
                    g.slow,
                    g.flank,
                    g.lotsmorrecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0],
        },
    ],
}

function makeSwarmSpawner(guntype) {
    return {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'],
        COLOR: 16,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [14, 15, 0.6, 14, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: guntype,
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                },
            },
        ],
    }
}
exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]))
exports.follower = { //omgafollower
    PARENT: [exports.genericTank],
    LABEL: 'Follower',
    SIZE: 10,
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        SPEED: 7,
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.feather = {
    PARENT: [exports.genericTank], 
    LABEL: 'Feather',
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.followcept,
    }],  
      BODY: {
        SPEED: 7,
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.wing = { 
    PARENT: [exports.genericTank],
    LABEL: 'Wing',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL,
        FOV: base.FOV * 1.2,
    },
          TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.followcept,
    }],  
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.creep = {
    PARENT: [exports.genericTank],
    LABEL: 'Creep',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.creeper]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.zoom = {
    PARENT: [exports.genericTank],
    LABEL: 'Zoom',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 8.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.mini, g.norecoil, g.creeper]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.mini, g.norecoil, g.creeper]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 8.6, 0.6, 7, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.mini, g.norecoil.creeper]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4, 8.6, 0.6, 7, 0, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.mini, g.norecoil, g.creeper]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.ravenfeather = {
    PARENT: [exports.genericTank],
    LABEL: 'Raven Feather',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
        TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.followcept,
    }], 
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.creeper]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.warrior = {
    PARENT: [exports.genericTank],
    LABEL: 'Warrior',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
              {
            POSITION: [16, 8, 1, 0, -1, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Side',
            },
        },
        {
            POSITION: [16, 8, 1, 0, 1, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Side',
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.creeper]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.counterpicker = {
    PARENT: [exports.genericTank],
    LABEL: 'Counter Picker',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.creeper]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8, 0.6, 7, -1, 135, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [8, 8, 0.6, 7, 1, 225, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [9, 8, 0.6, 7, 0, 145, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [9, 8, 0.6, 7, 0, 215, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.facebook = {
    PARENT: [exports.genericTank],
    LABEL: 'Facebook',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 15, 0.5, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.socialmedia, g.creeper]),
                TYPE: exports.instaswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [5.5, 8.6, 0.5, 7, 0, 0, 0],
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
             {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.6, 0.6, 7, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morereload, g.lotsmorrecoil, g.lotsmorrecoil, g.bitweak, g.creepster]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.instagram = {
    PARENT: [exports.genericTank],
    LABEL: 'Instagram',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 15, 0.5, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.socialmedia]),
                TYPE: exports.instaswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [5.5, 8.6, 0.5, 7, 0, 0, 0],
        }
    ],
}
exports.snapchat = {
    PARENT: [exports.genericTank],
    LABEL: 'Snapchat',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 15, 0.5, 7, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.socialmedia, g.bitlessreload]),
                TYPE: exports.instaswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [5.5, 8.6, 0.5, 7, 0, 270, 0],
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 15, 0.5, 7, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.socialmedia, g.bitlessreload]),
                TYPE: exports.instaswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [5.5, 8.6, 0.5, 7, 0, 90, 0],
        }
    ],
}
exports.twitter = {
    PARENT: [exports.genericTank],
    LABEL: 'Twitter',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.followcept,
    }],  
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 15, 0.5, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.socialmedia]),
                TYPE: exports.instaswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }, {
            POSITION: [5.5, 8.6, 0.5, 7, 0, 0, 0],
        }
    ],
}
exports.aimer2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Old Aimer',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
              {
            POSITION: [10, 12, 0.6, 7, 0, 1.8, 0],
            PROPERTIES: {
                //can u not code for 2 secs pls
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
      {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 18, 0.6, 5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.fake, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
        {
            POSITION: [10, 9, 0.6, 7, 0, -1.8, 0],
            PROPERTIES: {
                //can u not code for 2 secs pls
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [9, 8.5, 0.6, 7, 0, 3, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [8, 8, 0.6, 7, 0, -3, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0.7, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [6, 7, 0.6, 7, 0, -0.7, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
    ],
}
exports.aimer = {
    PARENT: [exports.genericTank],
    LABEL: 'Aimer',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
              {
            POSITION: [10, 12, 0.6, 7, 0, 1.8, 0],
            PROPERTIES: {
                //can u not code for 2 secs pls
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [10, 9, 0.6, 7, 0, -1.8, 0],
            PROPERTIES: {
                //can u not code for 2 secs pls
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [9, 8.5, 0.6, 7, 0, 3, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [8, 8, 0.6, 7, 0, -3, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0.7, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [6, 7, 0.6, 7, 0, -0.7, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
                LABEL: 'Autonomous',
            },
        },
            {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 18, 0.6, 5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.fake, g.lessreload]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
                                {
            POSITION: [22, 6, 0.4, 0, 0, 0, 0.25],
            },
                                {
            POSITION: [19, 10, 0.4, 0, 0, 0, 0.25],
            },
    ],
}
exports.cruiser = {
    PARENT: [exports.genericTank],
    LABEL: 'Cruiser',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.soft = {
    PARENT: [exports.genericTank],
    LABEL: 'Soft',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: base.FOV * 1.25,
    },
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  9,     0,      0,      0,     360,  1,], 
        TYPE: exports.followcept,
    }], 
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Guided',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Guided',
            },
        },
    ],
}
exports.cruiserpage2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Cruiser Page 2',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.flankfollower = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank-Follower',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 1,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, -2, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]), //must have both or it wont work
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.trapfollower = {
    PARENT: [exports.genericTank],
    LABEL: 'Trap Follower',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.buildingfollower = {
    PARENT: [exports.genericTank],
    LABEL: 'Building Follower',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.block,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.snipefollower = {
    PARENT: [exports.genericTank],
    LABEL: 'Snipe-Follower',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 1,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.nibbler = {
    PARENT: [exports.genericTank],
    LABEL: 'Nibbler',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 8.7, 0.6, 7, 4, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [8, 8.7, 0.6, 7, -4, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, -5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]), //must have both or it wont work
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]), //must have both or it wont work
                TYPE: exports.bullet,
                          },
        },
    ],
}
exports.bulser = {
    PARENT: [exports.genericTank],
    LABEL: 'Bulser',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [9, 7, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bulwark]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [9, 7, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bulwark]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [15, 7, 1, 0, 6.5, 180, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 6.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.halfspeed]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, 0, -6.5, 180, 0.5],
        },
        {
            POSITION: [3, 7, 1.7, 15, -6.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.halfspeed]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.bulwark = {
    //here is code for twin.
    PARENT: [exports.genericTank], //parent is parent of the tank
    LABEL: 'Bulwark', //label is label of the tank (best explaination)
    //jk, label is the tank name in game
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 7, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bulwark]),
                TYPE: exports.bullet,
            },
        },
        {
            /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 7, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bulwark]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [15, 7, 1, 0, 6.5, 180, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 6.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.halfspeed]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, 0, -6.5, 180, 0.5],
        },
        {
            POSITION: [3, 7, 1.7, 15, -6.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.halfspeed]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.trapper = {
    PARENT: [exports.genericTank],
    LABEL: 'Trapper',
    DANGER: 6,   //omgatrapper
    STAT_NAMES: statnames.trap,
    BODY: {
        ACCELERATION: base.ACCEL * 1.5,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.paratrooper = {
    PARENT: [exports.genericTank],
    LABEL: 'Paratrooper',
    DANGER: 6,   
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 1.5,
        FOV: base.FOV * 1.2,
    },
   TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.overdriveSquare,
    }],
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lessrange]),
                TYPE: exports.drivetrap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.rainer = {
    PARENT: [exports.genericTank],
    LABEL: 'Rainer',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 1.5,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },  {
            POSITION: [15, 3, 1, -13, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lessrange]),
                TYPE: exports.fog,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.nestplacer = {
    PARENT: [exports.genericTank],
    LABEL: 'Nest Placer',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 1.5,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },  {
            POSITION: [7, 5.6, 0.6, 7, 0, 180, 0],
         /*  PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.bees]),
                TYPE: exports.bee,
                SYNCS_SKILLS: false,
                STAT_CALCULATOR: gunCalcNames.swarm,
            }, */
            },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lessrange]),
                TYPE: exports.beenest,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.trapshot = {
    PARENT: [exports.genericTank],
    LABEL: 'Trapshot',
    DANGER: 6,
    FACING_TYPE: 'locksFacing',
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            POSITION: [19, 15, -1.3, 0, 0, 0, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 10, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.halfreload,
                    g.morespeed,
                    g.lessreload,
                    g.trapshot,
                ]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [3, 7, 1.7, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.halfreload,
                    g.morespeed,
                    g.lessreload,                    
                    g.trapshot,
                ]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [3, 5, 1.7, 11, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.halfreload,
                    g.morespeed,
                    g.lessreload,
                    g.trapshot,
                ]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
              {
            POSITION: [3, 5, 1.7, 11, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.halfreload,
                    g.morespeed,
                    g.lessreload,
                    g.trapshot,
                ]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [3, 5, 1.7, 11, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.halfreload,
                    g.morespeed,
                    g.lessreload,
                    g.trapshot,
                ]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
      {
                  POSITION: [3, 5, 1.7, 11, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.halfreload,
                    g.morespeed,
                    g.lessreload,
                    g.trapshot,
                ]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.battleship = {
    PARENT: [exports.genericTank],
    LABEL: 'Battleship',
    DANGER: 6,
    BODY: {
        SPEED: base.speed * 1,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Guided',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Guided',
            },
        },
    ],
}
exports.daisy = {
    PARENT: [exports.genericTank],
    LABEL: 'Daisy',
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    BODY: {
        SPEED: base.speed * 1,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 90, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 270, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 7.5, 0.6, 7, 0, 90, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 7.5, 0.6, 7, 0, 270, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.deathship = {
    PARENT: [exports.genericTank],
    LABEL: 'Deathship',
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    BODY: {
        SPEED: base.speed * 0.95,
        ACCELERATION: base.ACCEL,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
                                {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 90, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
                          {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 270, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Guided',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Autonomous',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: 'Guided',
            },
        },
    ],
}
exports.deathship2 = {
              PARENT: [exports.genericTank],
              LABEL: 'Deathship 2.0',
              DANGER: 7,
              STAT_NAMES: statnames.swarm,
              FACING_TYPE: 'locksFacing',
              BODY: {
                  SPEED: base.speed * 1.05,
                  ACCELERATION: base.ACCEL,
                  FOV: base.FOV * 1.15,
              },
              GUNS: [
                  { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    7,      1,     10.5,     0,      90,      0,   ],
                    }, {
                    POSITION: [   3,    10,      1,     15.5,     0,      90,      0,   ],
                    }, {
                    POSITION: [   2,    10,     1.3,     18,      0,      90,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 24,
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trapbox,        
                            SYNCS_SKILLS: true,  
                        }, }, {                            
                    POSITION: [   4,    10,      -0.8,      8,      0,      90,      0,   ]
                    },
                  { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    7,      1,     10.5,     0,      270,      0,   ],
                    }, {
                    POSITION: [   3,    10,      1,     15.5,     0,      270,      0,   ],
                    }, {
                    POSITION: [   2,    10,     1.3,     18,      0,      270,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 24,
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trapbox,        
                            SYNCS_SKILLS: true,  
                        }, }, {                            
                    POSITION: [   4,    10,      -0.8,      8,      0,      270,      0,   ]
                    },
                  {
                      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                      POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
                      PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                          TYPE: exports.swarm,
                          STAT_CALCULATOR: gunCalcNames.swarm,
                          LABEL: 'Guided',
                      },
                  },
                  {
                      POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
                      PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                          TYPE: [exports.autoswarm],
                          STAT_CALCULATOR: gunCalcNames.swarm,
                          LABEL: 'Autonomous',
                      },
                  },
                  {
                      POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
                      PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                          TYPE: [exports.autoswarm],
                          STAT_CALCULATOR: gunCalcNames.swarm,
                          LABEL: 'Autonomous',
                      },
                  },
                  {
                      POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
                      PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                          TYPE: exports.swarm,
                          STAT_CALCULATOR: gunCalcNames.swarm,
                          LABEL: 'Guided',
                      },
                  },
              ],
          }
exports.deathship3 = {
              PARENT: [exports.genericTank],
              LABEL: 'Deathship 3.0',
              DANGER: 7,
              STAT_NAMES: statnames.swarm,
              FACING_TYPE: 'locksFacing',
              BODY: {
                  SPEED: base.speed * 1.05,
                  ACCELERATION: base.ACCEL,
                  FOV: base.FOV * 1.15,
              },
              GUNS: [
                  {
                      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                      POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
                      PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                          TYPE: exports.swarm,
                          STAT_CALCULATOR: gunCalcNames.swarm,
                          LABEL: 'Guided',
                      },
                  },
                  {
                      POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
                      PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                          TYPE: [exports.autoswarm],
                          STAT_CALCULATOR: gunCalcNames.swarm,
                          LABEL: 'Autonomous',
                      },
                  },
                  {
                      POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
                      PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                          TYPE: [exports.autoswarm],
                          STAT_CALCULATOR: gunCalcNames.swarm,
                          LABEL: 'Autonomous',
                      },
                  },
                  {
                      POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
                      PROPERTIES: {
                          SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                          TYPE: exports.swarm,
                          STAT_CALCULATOR: gunCalcNames.swarm,
                          LABEL: 'Guided',
                      },
                  },
                                  { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    7,      1,     10.5,     0,      90,      0,   ],
                    }, {
                    POSITION: [   3,    10,      1,     15.5,     0,      90,      0,   ],
                    }, {
                    POSITION: [   2,    10,     1.3,     18,      0,      90,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 24,
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trapbox,        
                            SYNCS_SKILLS: true,  
                        }, }, {                            
                    POSITION: [   4,    10,      -0.8,      8,      0,      90,      0,   ]
                    },
                  { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    7,      1,     10.5,     0,      270,      0,   ],
                    }, {
                    POSITION: [   3,    10,      1,     15.5,     0,      270,      0,   ],
                    }, {
                    POSITION: [   2,    10,     1.3,     18,      0,      270,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 24,
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trapbox,        
                            SYNCS_SKILLS: true,  
                        }, }, {                            
                    POSITION: [   4,    10,      -0.8,      8,      0,      270,      0,   ]
                    },
              ],
          }
exports.carrier = {
    PARENT: [exports.genericTank],
    LABEL: 'Carrier',
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 2, 40, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -2, -40, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.funkykong = {
    PARENT: [exports.genericTank],
    LABEL: 'Funky Kong',
    DANGER: 7,
    SIZE: 13,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 7.5, 0.6, 7, 0, -3, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.funky, 
                    g.bitmoredamage,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [9, 6, 0.6, 7, 5, -3, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.funky,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [9, 6, 0.6, 7, -5, -3, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.funky,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.beehive = {
    PARENT: [exports.genericTank],
    LABEL: 'Beehive',
    DANGER: 7,
    STAT_NAMES: statnames.bee,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 4, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, 2, 40, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, -2, -40, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
    ],
}
exports.seabee = {
    PARENT: [exports.genericTank],
    LABEL: 'Seabee',
    DANGER: 7,
    STAT_NAMES: statnames.bee,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 4, 0.6, 7, 6, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, 2, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, -2, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
              {
            POSITION: [5, 4, 0.6, 7, -6, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 4, 0.6, 7, 6, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, 2, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, -2, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
              {
            POSITION: [5, 4, 0.6, 7, -6, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.autobee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
    ],
}
exports.queenbee = {
    PARENT: [exports.genericTank],
    LABEL: 'Queen Bee',
    DANGER: 7,
    STAT_NAMES: statnames.bee,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 10, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.destroy,
                    g.morespeed,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, 2, 40, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, -2, -40, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.bee,
            },
        },
    ],
}
exports.beecolony = {
    PARENT: [exports.genericTank],
    LABEL: 'Bee Colony',
    DANGER: 7,
    STAT_NAMES: statnames.bee,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 4, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.colony,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, 2, 40, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.colony,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, -2, -40, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.colony,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, 0, 25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.colony,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 4, 0.6, 7, 0, -25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                    g.colony,
                ]),
                TYPE: exports.bee,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.absol = {
    PARENT: [exports.genericTank],
    LABEL: 'absol',
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: 'locksFacing',
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 45, 0.125],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 90, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 135, 0.375],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 225, 0.625],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 275, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 320, 0.825],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.autocruiser = makeAuto(exports.cruiser, 'Auto-Cruiser')
exports.fortress = {
    PARENT: [exports.genericTank],
    LABEL: 'Fortress', //'Palisade',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 120, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 240, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 60, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 300, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.rune = {
    PARENT: [exports.genericTank],
    LABEL: 'Rune', //'Palisade',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 120, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 240, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 2, 1, -2, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.slow, g.lessrange]),
                TYPE: exports.bulbs,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 14, 0, 60, 0],
            },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 2, 1, -2, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.slow, g.lessrange]),
                TYPE: exports.bulbs,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 14, 0, 180, 0],
            },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 2, 1, -2, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.start, g.bulb, g.slow, g.lessrange]),
                TYPE: exports.bulbs,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [3, 5, 1.2, 14, 0, 300, 0],
            },
    ],
}
exports.underseer = {
    PARENT: [exports.genericTank],
    LABEL: 'Underseer',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    SHAPE: 4,
    MAX_CHILDREN: 14,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.sunchip, g.halfreload, g.halfreload, g.halfreload]),
                TYPE: exports.sunchip,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.sunchip, g.halfreload, g.halfreload, g.halfreload]),
                TYPE: exports.sunchip,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
    ],
}
exports.boomancer = {
    PARENT: [exports.genericTank],
    LABEL: 'Boo-Mancer',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    INVISIBLE: [0.08, 0.04],
    SHAPE: 4,
    MAX_CHILDREN: 14,
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.invisibleround,
    }],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.sunchip, g.halfreload, g.halfreload, g.halfreload, g.norecoil]),
                TYPE: exports.sunchip,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5, 12, 1.2, 8, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.sunchip, g.halfreload, g.halfreload, g.halfreload, g.norecoil]),
                TYPE: exports.sunchip,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
    ],
}
exports.necromancer = {
    PARENT: [exports.genericTank],
    LABEL: 'Necromancer',
    DANGER: 7,
    STAT_NAMES: statnames.necro,
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    SHAPE: 4,
    FACING_TYPE: 'autospin',
    MAX_CHILDREN: 14,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.sunchip, g.halfreload, g.halfreload, g.halfreload]),
                TYPE: exports.sunchip,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5, 12, 1.2, 8, 0, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.sunchip, g.halfreload, g.halfreload, g.halfreload]),
                TYPE: exports.sunchip,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5, 12, 1.2, 8, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.sunchip,
                    g.weak,
                    g.halfreload, g.halfreload
                ]),
                TYPE: exports.autosunchip,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 4,
                STAT_CALCULATOR: gunCalcNames.necro,
                LABEL: 'Guard',
            },
        },
        {
            POSITION: [5, 12, 1.2, 8, 0, 180, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.sunchip,
                    g.weak,
                    g.halfreload, g.halfreload
                ]),
                TYPE: exports.autosunchip,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 4,
                STAT_CALCULATOR: gunCalcNames.necro,
                LABEL: 'Guard',
            },
        },
    ],
}

exports.spawner = {
    PARENT: [exports.genericTank],
    LABEL: 'Spawner',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 5,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: exports.minion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.5, 12, 1, 8, 0, 0, 0],
        },
    ],
}
exports.fabric = {
    PARENT: [exports.genericTank],
    LABEL: 'Fabric',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
                    {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 12, 1, 10.5, 0, 0, 0],
        },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 8, 1.6, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1.6, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 10,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, g.bitlesssize, g.morespray, g.morereload]),
                TYPE: exports.miniminion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.5, 14, 1.6, 8, 0, 0, 0],
        },
    ],
}
exports.thiccspawner = {
    PARENT: [exports.genericTank],
    LABEL: 'thicc Spawner',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 1,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 100, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 102, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 5,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: exports.minion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.5, 102, 1, 8, 0, 0, 0],
        },
    ],
}
exports.flankspawner = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank Spawner',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
        TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.flankfake,
    }], 
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 5,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: exports.flinion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.5, 12, 1, 8, 0, 0, 0],
        },
    ],
}
exports.shootspawner = {
    PARENT: [exports.genericTank],
    LABEL: 'Shoot Spawner',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
        TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.shooterfake,
    }],  
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 5,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: exports.shootion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.5, 12, 1, 8, 0, 0, 0],
        },
    ],
}
exports.twinspawner = {
    PARENT: [exports.genericTank],
    LABEL: 'Twin Spawner',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.twinfake,
    }],  
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 5,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: exports.twinion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.5, 12, 1, 8, 0, 0, 0],
        },
    ],
}
exports.followerfollower = {
    PARENT: [exports.genericTank],
    LABEL: 'Follower Follower',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        ACCELERATION: base.ACCEL * 0.5,
        FOV: 1.1,
    },
      TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.followerfake,
    }],  
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 5,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: exports.follion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.5, 12, 1, 8, 0, 0, 0],
        },
    ],
}
exports.factory = {
    PARENT: [exports.genericTank],
    LABEL: 'Factory',
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    MAX_CHILDREN: 6,
    GUNS: [
              {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory]),
                TYPE: exports.minion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ],
}

exports.machine = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gun',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.blaster = {
    PARENT: [exports.genericTank],
    LABEL: 'Blaster',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 16, 1.4, 8, 0, 1, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.wasabi = {
    PARENT: [exports.genericTank],
    LABEL: 'Wasabi',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 10, 1.4, 0, 0, 180, 0],
        },
        {
            POSITION: [5, 12.5, 1.7, 15, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machinetrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
          ],
}
exports.supertrapper = {
    PARENT: [exports.genericTank],
    LABEL: 'Super Trapper',
    GUNS: [
                          {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 10, 1.4, 0, 0, 0, 0],
        },
        {
            POSITION: [5, 12.5, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.machinetrap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
          ],
}
exports.rapidsniper = {
    PARENT: [exports.genericTank],
    LABEL: 'Rapid Sniper',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 12, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.gunner, g.lesssize]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 6, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.machinefollower = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Follower',
    GUNS: [ {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.muchmorerecoil, g.lesssize, g.mach, g.morespray, g.morereload, g.doublereload]),
                TYPE: exports.autoswarm,
            },
        },
                              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 5, 0.6, 0, 6, 7, 0], 
             },
                                        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 5, 0.6, 0, -6, -7, 0], 
             },
    ],
}
exports.spray = {
    PARENT: [exports.genericTank],
    LABEL: 'Sprayer',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [23, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.mach,
                    g.morerecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
    ],
}

exports.trisprayer = {
    PARENT: [exports.genericTank],
    LABEL: 'Tri Sprayer',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [23, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.mach,
                    g.morerecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
    ],
}

exports.mini = {
    PARENT: [exports.genericTank],
    LABEL: 'Minigun',
    DANGER: 6,
    BODY: {
        FOV: 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.notmini = {
    PARENT: [exports.genericTank],
    LABEL: 'Megagun',
    DANGER: 6,
    SIZE: 14,
    BODY: {
        FOV: 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.megagun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 13, 1, 0, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.megagun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 13, 1, 0, 0, 0, 0.666],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.megagun]),
                TYPE: exports.bullet,
            },
        },
    ],
}
      
exports.trimini = {
    PARENT: [exports.genericTank],
    LABEL: 'Miniguard',
    DANGER: 6,
    BODY: {
        FOV: 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, 120, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 120, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 8, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, 240, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 240, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.itsatrap = {
    PARENT: [exports.genericTank],
    LABEL: 'ITS A TRAP',
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    BODY: {
        ACCELERATION: base.ACCEL * 1.4,
        FOV: base.FOV * 1.1,
    },
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 19, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.tinyweak,  g.barri, g.mini]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.tinyweak,  g.barri, g.mini]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.barricade = {
    PARENT: [exports.genericTank],
    LABEL: 'Barricade',
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    BODY: {
        ACCELERATION: base.ACCEL * 1.4,
        FOV: base.FOV * 1.1,
    },
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 23, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.tinyweak, g.barri, g.mini]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [3, 7, 1.7, 19, 0, 0, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.tinyweak,  g.barri, g.mini]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, (1 / 3) * 2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.tinyweak,  g.barri, g.mini]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.stream = {
    PARENT: [exports.genericTank],
    LABEL: 'Streamliner',
    DANGER: 7,
    BODY: {
        FOV: 1.3,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [25, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [23, 8, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.pressuresprayer = {
    PARENT: [exports.genericTank],
    LABEL: 'Pressure Sprayer',
    DANGER: 7,
    SIZE: 14,
    BODY: {
        FOV: 1.25,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.megagun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [22, 13, 1, 0, 0, 0, 1/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.megagun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [20, 13, 1, 0, 0, 0, 2/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.megagun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 13, 1, 0, 0, 0, 3/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.megagun]),
                TYPE: exports.bullet,
            },
        },
              {
            POSITION: [16, 13, 1, 0, 0, 0, 4/5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.megagun]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.miniliner = {
    PARENT: [exports.genericTank],
    LABEL: 'Miniliner',
    DANGER: 7,
    BODY: {
        FOV: 1.35,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.nail, g.miniliner]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [25, 7, 1, 0, 0, 0, 1/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.nail, g.miniliner]),
                TYPE: exports.bullet,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [23, 7, 1, 0, 0, 0, 2/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.nail, g.miniliner]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [21, 7, 1, 0, 0, 0, 3/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.nail, g.miniliner]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 7, 1, 0, 0, 0, 4/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.nail, g.miniliner]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [17, 7, 1, 0, 0, 0, 5/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.nail, g.miniliner]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [15, 7, 1, 0, 0, 0, 6/7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.nail, g.miniliner]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.flamethrower = {
    PARENT: [exports.genericTank],
    LABEL: 'Flamethrower',
    DANGER: 7,
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 4, -2.5, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
                TYPE: exports.flame,
            },
        },
        {
            POSITION: [20, 8, 1, 0, 0, 0, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
                TYPE: exports.flame,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, (1 / 3) * 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
                TYPE: exports.flame,
            },
        },
    ],
}
exports.cropduster = makeHybrid(exports.mini, 'Crop Duster')
exports.overcruiser = makeHybrid(exports.cruiser, 'Overcruiser')
exports.minitrap = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: '',
    STAT_NAMES: statnames.trap,
    BODY: {
        FOV: 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

            POSITION: [24, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.3, 22, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 18, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 14, 0, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}

exports.pound = {
    PARENT: [exports.genericTank],
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Pounder',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.miniswarm = {
    PARENT: [exports.genericTank],
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Mini Swarmer',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 13, -1.2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.lessrange]),
                TYPE: exports.minihive,
            },
        },
             {
            POSITION: [14, 11, 1, 5, 0, 0, 0],
        },
    ],
}
exports.swarmer = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Swarmer',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 13, -1.2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.lessrange]),
                TYPE: exports.hive,
            },
        },
             {
            POSITION: [14, 11, 1, 5, 0, 0, 0],
        },
    ],
}
exports.destroy = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
    },
    LABEL: 'Destroyer',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.yeeter = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
    },
    LABEL: 'Yeeter',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [40, 75, -0.3, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.destroy, g.destroy, g.destroy, g.destroy, g.destroy, g.doublereload, g.doublereload, g.doublereload, g.doublereload]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.fusiler = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    LABEL: 'Fusiler',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [30, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.assass, g.destroy, g.pound, g.morespeed, g.tinyweak]),
                TYPE: exports.bullet,
            },
        },
              {
            POSITION: [5, 12.5, -1.6, 8, 0, 0, 0],
        },
      {     POSITION: [8, 19.8, 1, 0, 0, 0, 0],
      },
    ],
}
exports.rockavalanche2 = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
    },
    LABEL: 'Rocky Avalanche',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                TYPE: exports.bullet,
            },
        },
      {
                  POSITION: [7, 7.5, 0.6, 7, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
      {
                    POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.bees,
                ]),
                TYPE: exports.autoswarm,
                STAT_CALCULATOR: gunCalcNames.autoswarm,
            },
        },
    ],
}
exports.sandattack = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Sand Attack',
          TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.sand,
    }],  
    GUNS: [
      {
                  POSITION: [7, 7.5, 0.6, 7, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.mudslap = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Mudslap',
          TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.sand,
    }],  
    GUNS: [
      {
                  POSITION: [7, 7.5, 0.6, 7, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy, g.mud,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy, g.mud,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
      {
                  POSITION: [7, 7.5, 0.6, 7, 0, 90, 0.45],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy, g.mud,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 270, 0.95],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy, g.mud,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.rockavalanche = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Rocky Avalanche',
          TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.sand,
    }],  
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.magmastorm = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Firestorm',
          TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.lavaball,
    }],  
    GUNS: [
      {
                  POSITION: [7, 7.5, 0.6, 7, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.sandstorm = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
    },
    LABEL: 'Sandstorm',
          TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.sandstormturret,
    }],  
    GUNS: [
      {
                  POSITION: [7, 7.5, 0.6, 7, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
                      POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.7],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.swarm,
                    g.battle,
                    g.carrier,
                    g.sandy,
                ]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.flankdestroyer = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
    },
    LABEL: 'Flank Destroyer',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                TYPE: exports.bullets,
            },
        },
    ],
}
exports.anni = {
    PARENT: [exports.genericTank],
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
    },
    LABEL: 'Annihilator',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.destroy,
                    g.anni,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.hybrid = makeHybrid(exports.destroy, 'Hybrid')
exports.shotgun2 = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Shotgun',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
    },
    GUNS: [
        /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
            POSITION: [4, 3, 1, 11, -3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [4, 3, 1, 11, 3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [4, 4, 1, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 12, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 11, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 3, 1, 13, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 3, 1, 13, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 2, 1, 13, 2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 2, 1, 13, -2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [15, 14, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.mach,
                    g.shotgun,
                    g.fake,
                ]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [8, 14, -1.3, 4, 0, 0, 0],
        },
    ],
}
exports.gauge = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Gauge',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
    },
    GUNS: [
        /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
            POSITION: [4, 3, 1, 11.5, 2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 4, 1, 12, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 12.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 3, 1, 12.5, -0.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 2, 1, 12, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 2, 1, 11.5, -2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [15, 9.5, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.mach,
                    g.shotgun,
                    g.fake,
                ]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [9, 9.5, -1.3, 4, 0, 0, 0],
        },
    ],
}
exports.handle = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Handle',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
        {
            POSITION: [17, 6, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.mach,
                    g.shotgun,
                    g.fake,
                    g.hunter,
                ]),
                TYPE: exports.casing,
            },
        },
            {
            POSITION: [4, 3, 1, 13.5, 2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.hunter2]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 4, 1, 14, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.hunter2]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 14.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.hunter2]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 3, 1, 14.5, -0.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.hunter2]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [9, 9.5, -1.3, 4, 0, 0, 0],
        },
        {
            POSITION: [4, 3, 1, 11.5, 2, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.handle]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 4, 1, 12, -1, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.handle]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 12.5, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.handle]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 3, 1, 12.5, -0.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.handle]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 2, 1, 12, 1, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.handle]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 2, 1, 11.5, -2, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hunter, g.handle]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [15, 9.5, 1, 6, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.mach,
                    g.shotgun,
                    g.fake,
                    g.hunter,
                ]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [9, 9.5, -1.3, 4, 0, 0, 0],
        },
      //under here is the second shotgun
    ],
}

exports.builder = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Builder',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.block,
            },
        },
    ],
}
exports.graveyart = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Grave Yart',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.7,
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 12, 1.4, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 18, 1.4, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.lessreload, g.lessrange, g.lessreload]),
                TYPE: exports.grave,
            },
        },
    ],
}
exports.doublebuilder = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Double Builder',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.block,
            },
        },
        {
            POSITION: [18, 12, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.block,
            },
        },
    ],
}
exports.engineer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Engineer',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.75,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 14, 1, 15.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.engin]),
                TYPE: exports.pillbox,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ],
}
exports.Dengineer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Dual Engineer',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.75,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 14, 1, 15.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 6,
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.pillbox,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 14, 1, 15.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 6,
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.pillbox,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ],
}
exports.construct = {
    PARENT: [exports.genericTank],
    LABEL: 'Constructor',
    STAT_NAMES: statnames.trap,
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.7,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 18, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 18, 1.2, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                TYPE: exports.block,
            },
        },
    ],
}
//beta tanks
//real tanks
exports.autobuilder = makeAuto(exports.builder, 'Building')
exports.autodestroyer = makeAuto(exports.destroy)
exports.autofollower = makeAuto(exports.follower)
exports.conquer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Conquer',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [21, 14, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                TYPE: exports.block,
            },
        },
    ],
}
exports.bentboomer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Boomer',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [8, 10, 1, 8, -2, -35, 0],
        },
        {
            POSITION: [8, 10, 1, 8, 2, 35, 0],
        },
        {
            POSITION: [2, 10, 1.3, 16, -2, -35, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                TYPE: exports.boomerang,
            },
        },
        {
            POSITION: [2, 10, 1.3, 16, 2, 35, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                TYPE: exports.boomerang,
            },
        },
    ],
}
exports.boomer = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Boomer',
    STAT_NAMES: statnames.trap,
    FACING_TYPE: 'locksFacing',
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 10, 1, 14, 0, 0, 0],
        },
        {
            POSITION: [6, 10, -1.5, 7, 0, 0, 0],
        },
        {
            //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
            //    }, {
            POSITION: [2, 10, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                TYPE: exports.boomerang,
            },
        },
    ],
}
exports.quadtrapper = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'trapper thing',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 6, 1, 0, 0, 45, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: exports.block,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 135, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: exports.block,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 225, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 225, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: exports.block,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 0, 315, 0],
        },
        {
            POSITION: [2, 6, 1.1, 14, 0, 315, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                TYPE: exports.block,
            },
        },
    ],
}

exports.artillery = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Artillery',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Heavy',
            },
        },
    ],
}
exports.valkery = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Valkery',
    GUNS: [
                    {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 3, 0.6, 7, -6.5, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gunner, g.swarm, g.morereload, g.morerange]),
                TYPE: exports.swarm,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [12, 3, 0.6, 7, 6.5, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gunner, g.swarm, g.morereload, g.morerange]),
                TYPE: exports.swarm,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Heavy',
            },
        },

    ],
}
exports.shootclub = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Shoot Club',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
      {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 120, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 120, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 120, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 120, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
      {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 240, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 240, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 240, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 240, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
    ],
}
exports.shooter = {
    PARENT: [exports.genericTank], //omgashooter
    DANGER: 6,
    LABEL: 'Shooter',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
    ],
}
exports.shooter2 = {
    PARENT: [exports.genericTank], 
    DANGER: 6,
    LABEL: 'Page 2',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
    ],
}
exports.clog2 = {
    PARENT: [exports.genericTank], 
    DANGER: 6,
    LABEL: 'Old Clog',
    GUNS: [
            {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 18, 0.6, 5, 0, 0, 0],
            },
      {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 10, 0.6, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.small]),
                TYPE: exports.autoswarm,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [22, 5, 0.6, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.small]),
                TYPE: exports.autoswarm,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 8, 0.6, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.small]),
                TYPE: exports.autoswarm,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [18, 6, 0.6, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.small]),
                TYPE: exports.autoswarm,
                LABEL: 'Secondary',
            }, },
    ],
}
exports.clog = {
    PARENT: [exports.genericTank], 
    DANGER: 6,
    LABEL: 'Clog',
    GUNS: [
      {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 10, 0.6, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.small]),
                TYPE: exports.autoswarm,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [10, 8, 0.6, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.small]),
                TYPE: exports.autoswarm,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [10, 6, 0.6, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.small]),
                TYPE: exports.autoswarm,
                LABEL: 'Secondary',
            }, },
                  {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 18, 0.6, 5, 0, 0, 0],
            },
                    {
            POSITION: [22, 5, 0.4, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.small]),
                TYPE: exports.autoswarm,
                LABEL: 'Secondary',
            },
        },
    ],
}
exports.invisshooter = {
    PARENT: [exports.genericTank], 
    DANGER: 6,
    LABEL: 'some kind of invisible shooter',
    GUNS: [
            {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 18, 0.6, 5, 0, 0, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
    ],
}
exports.rearranger = {
    PARENT: [exports.genericTank], 
    DANGER: 6,
    LABEL: 'Rearranger', 
    GUNS: [ {
            POSITION: [17, 2, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinyweak]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 2, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinyweak]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
           {
            POSITION: [15, 1, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinyweak]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 1, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinyweak]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
    ],
}
exports.positioner = {
    PARENT: [exports.genericTank], 
    DANGER: 6,
    LABEL: 'Positioner', 
    GUNS: [ {
            POSITION: [17, 2, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinyweak]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 2, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinyweak]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
           {
            POSITION: [15, 1, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinyweak]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 1, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinyweak]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [4, 3, 1, 11.5, 2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 4, 1, 12, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 4, 1, 12.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 3, 1, 12.5, -0.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [1, 2, 1, 12, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [1, 2, 1, 11.5, -2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [15, 9.5, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.mach,
                    g.shotgun,
                    g.fake,
                ]),
                TYPE: exports.casing,
            },
        },
        {
            POSITION: [9, 9.5, -1.3, 4, 0, 0, 0],
        },
    ],
}
exports.autoshooter = {
    PARENT: [exports.genericTank], 
    DANGER: 6,
    LABEL: 'Automatic', 
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.autoautoTurret,
    }], 
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
    ],
}
exports.shootception = {
    PARENT: [exports.genericTank], 
    DANGER: 6,
    LABEL: 'Shootception',
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.shootcept,
    }],  
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
    ],
}
exports.comrad = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Comrad',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
        {
            /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [4.5, 10, 1, 10.5, 0, 180, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 180, 0],
            PROPERTIES: {
                MAX_CHILDREN: 1,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: exports.shootion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.5, 12, 1, 8, 0, 180, 0],
        },
    ],
}
exports.pal = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Pal',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
      {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    }
    ],
}
exports.badboy = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Bad Boy',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinymorereload]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinymorereload]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinymorereload]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots, g.tinymorereload]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
      {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 15, 1.2, 8, 0, 180, 0.9],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.slow, g.slow, g.shots, g.halfreload, g.bitmoresize]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 1,
        },
    },
            {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0.8],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.shots, g.halfreload]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 1,
        },
    },
      {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 9, 1.2, 8, 0, 180, 0.7],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.lowpower, g.shots, g.halfreload, g.bitlesssize, g.morespeed]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 1,
        },
    },
      {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [4, 5, 0.8, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak, g.doublereload, g.doublereload, g.doublereload, g.doublereload, g.doublereload, g.shots, g.tonsmorrecoil, g.doublerange, g.doublerange, g.doublerange, g.doublereload, g.doublereload, g.morespray, g.morespray, g.doublesize]),
            TYPE: [exports.bullet],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            WAIT_TO_CYCLE: false,
        },
    },
    ],
}
exports.gunkit = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Gun Kit',
    GUNS: [
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 7, 1, 0, 0, 72, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 72, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 72, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 72, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            }, },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8.5, 1, 0, 0, 144, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            },
        },
             {     /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 2, 1, 0, -2, 216, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [24, 2, 1, 0, 2, 216, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.fast,
                ]),
                TYPE: exports.bullet,
            },
        },
              {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

            POSITION: [20, 7, 1, 0, 0, 288, 0],
        },
        {
            POSITION: [24, 5, 1, 0, 0, 288, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.terror = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Terror',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

            POSITION: [23, 8, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [22, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
          {      
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 2, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
    ],
}

exports.terrorizer = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Terrorizer',
    GUNS: [
     {
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [13, 2, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
    ],
}
exports.police = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Police',
      TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [12, 10, 0, 0, 220, 0],
            TYPE: exports.obstacle,
        },
    ],
    GUNS: [
     {
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [13, 2, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
    ],
}
exports.offender = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    LABEL: 'Offender',
    GUNS: [
     {
            POSITION: [20, 7, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [20, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 4, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 5, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [15, 3, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [13, 2, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.shots]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
            {
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [7, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,
            MAX_CHILDREN: 3,
        },
    }
    ],
}
exports.mortar = {
    PARENT: [exports.genericTank],
    LABEL: 'Mortar',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 3, 1, 0, -8, -7, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [13, 3, 1, 0, 8, 7, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Secondary',
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                TYPE: exports.bullet,
                LABEL: 'Heavy',
            },
        },
    ],
}
exports.skimmer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Skimmer',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 14, -0.5, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 15, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.arty,
                    g.arty,
                    g.skim,
                ]),
                TYPE: exports.missile,
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
exports.hyperskim = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Hyper Skimmer',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 14, -0.5, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 15, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.arty,
                    g.arty,
                    g.skim,
                ]),
                TYPE: exports.hypermissile,
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
exports.spread = {
    PARENT: [exports.genericTank],
    LABEL: 'Spreadshot',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [13, 4, 1, 0, -0.8, -75, 5 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [14.5, 4, 1, 0, -1.0, -60, 4 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [16, 4, 1, 0, -1.6, -45, 3 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [17.5, 4, 1, 0, -2.4, -30, 2 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [19, 4, 1, 0, -3.0, -15, 1 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [13, 4, 1, 0, 0.8, 75, 5 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [14.5, 4, 1, 0, 1.0, 60, 4 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [16, 4, 1, 0, 1.6, 45, 3 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [17.5, 4, 1, 0, 2.4, 30, 2 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [19, 4, 1, 0, 3.0, 15, 1 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.arty,
                    g.twin,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Spread',
            },
        },
        {
            POSITION: [13, 10, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.spreadmain,
                    g.spread,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Pounder',
            },
        },
    ],
}

exports.flank = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank Guard', //omgaflank
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.flank2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Page 2',
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.autoflank = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto Flank',
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.autoautoTurret,
    }],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.fidgetspinner = {
    PARENT: [exports.genericTank],
    LABEL: 'Fidget Spinner',
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
          TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [  10,     0,      0,      0,     360,  1,], 
        TYPE: exports.spinnerturret,
    }],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
            },
        },
    ],
}

exports.machineguard2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Guard',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.machineguard = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Guard',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [10.56, 10, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.machineguard3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Guard',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [10, 10, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.machinehex = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Hex',
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [7, 6, 1.4, 8, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.tinyweak]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [7, 6, 1.4, 8, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.tinyweak]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [7, 6, 1.4, 8, 0, 300, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.tinyweak]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.quad = {
    PARENT: [exports.genericTank],
    LABEL: 'Quad Tank',
    DANGER: 6,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.threequartersrof]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.threequartersrof]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.threequartersrof]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.threequartersrof]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.octo = {
    PARENT: [exports.genericTank],
    LABEL: 'Octo Tank',
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.flank,
                    g.spam,
                    g.lessreload,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.flank,
                    g.spam,
                    g.lessreload,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.flank,
                    g.spam,
                                  g.lessreload,    
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.flank,
                    g.spam,                    g.lessreload,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.flank,
                    g.spam,                    g.lessreload,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 135, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.flank,
                    g.spam,                    g.lessreload,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 225, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.flank,
                    g.spam,                    g.lessreload,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 315, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.flank,
                    g.spam,                    g.lessreload,
                ]),
                TYPE: exports.bullet,
            },
        },
    ],
}
exports.heptatrap = (() => {
    let a = 360 / 7,
        d = 1 / 7
    return {
        PARENT: [exports.genericTank],
        LABEL: 'Septa-Trapper',
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.8,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
                        {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [15, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, a, 4 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, a, 4 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 2 * a, 1 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 2 * a, 1 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 3 * a, 5 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 3 * a, 5 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 4 * a, 2 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 4 * a, 2 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 5 * a, 6 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 5 * a, 6 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 6 * a, 3 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 6 * a, 3 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    }
})()
exports.hexatrap = makeAuto(
    {
        PARENT: [exports.genericTank],
        LABEL: 'Hexa-Trapper',
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.8,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
                        {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
            {
                /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [15, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 60, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 60, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 120, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 120, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 180, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 180, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 240, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 240, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 300, 0.5],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 300, 0.5],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                    TYPE: exports.trap,
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    },
    'Hexa-Trapper'
)

exports.tri = {
    PARENT: [exports.genericTank],
    LABEL: 'Tri-Angle',
    BODY: {
        HEALTH: base.HEALTH * 0.8,
        SHIELD: base.SHIELD * 0.8,
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 6,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                    g.tonsmorrecoil,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Front',
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
exports.booster = {
    PARENT: [exports.genericTank],
    LABEL: 'Booster',
    BODY: {
        HEALTH: base.HEALTH * 0.6,
        SHIELD: base.SHIELD * 0.6,
        DENSITY: base.DENSITY * 0.2,
    },
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                    g.muchmorerecoil,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Front',
            },
        },
        {
            POSITION: [13, 8, 1, 0, -1, 135, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.halfrecoil,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 1, 225, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.halfrecoil,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 145, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 215, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
exports.fighter = {
    PARENT: [exports.genericTank],
    LABEL: 'Fighter',
    BODY: {
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Front',
            },
        },
        {
            POSITION: [16, 8, 1, 0, -1, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Side',
            },
        },
        {
            POSITION: [16, 8, 1, 0, 1, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Side',
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
exports.surfer = {
    PARENT: [exports.genericTank],
    LABEL: 'Surfer',
    BODY: {
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Front',
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -1, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 1, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [exports.autoswarm],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
exports.bomber = {
    PARENT: [exports.genericTank],
    LABEL: 'Bomber',
    BODY: {
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.trifront,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Front',
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                TYPE: exports.bullet,
                LABEL: 'Wing',
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                TYPE: exports.bullet,
                LABEL: 'Wing',
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.5, 14, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.autotri = makeAuto(exports.tri)
exports.autotri.BODY = {
    SPEED: base.SPEED,
}
exports.falcon = {
    PARENT: [exports.genericTank],
    LABEL: 'Falcon',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.8,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [27, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.sniper,
                    g.assass,
                    g.lessreload,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Assassin',
                ALT_FIRE: true,
            },
        },
        {
            POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.halfrecoil,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.halfrecoil,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.flank,
                    g.tri,
                    g.thruster,
                    g.halfrecoil,
                ]),
                TYPE: exports.bullet,
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}

exports.auto3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-3',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.auto3gun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 120, 190, 0],
            TYPE: exports.auto3gun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 240, 190, 0],
            TYPE: exports.auto3gun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.twin3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Twin-3',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autotwingun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 120, 190, 0],
            TYPE: exports.autotwingun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 240, 190, 0],
            TYPE: exports.autotwingun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.follower3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Follower-3',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autofollowergun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 120, 190, 0],
            TYPE: exports.autofollowergun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 240, 190, 0],
            TYPE: exports.autofollowergun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.schoolshooter = {
    PARENT: [exports.genericTank],
    LABEL: 'School Shooter',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autoshootergun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 120, 190, 0],
            TYPE: exports.autoshootergun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 240, 190, 0],
            TYPE: exports.autoshootergun,
                      SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.auto2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.autotank = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto tank',
    DANGER: 6,
    FACING_TYPE: 'toTarget',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 90, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 270, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.auto1 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-1',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.magician = {
    PARENT: [exports.genericTank],
    LABEL: 'Magician',
    DANGER: 6,
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 270, 190, 1],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 20, 0, 90, 190, 1],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.magician]),
                TYPE: exports.bullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.witch = {
    PARENT: [exports.genericTank],
    LABEL: 'Witch',
    DANGER: 6,
    TURRETS: [ {
             POSITION: [  9,     0,      0,      0,     360,  1,], 
             TYPE: exports.followcept,
    },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 270, 190, 1],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 20, 0, 90, 190, 1],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.magician]),
                TYPE: exports.bullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.malcolm = {
    PARENT: [exports.genericTank],
    LABEL: 'Malcolm Merlyn',
    DANGER: 6,
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 270, 190, 0],
            TYPE: exports.automalcolmgun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 20, 0, 90, 190, 0],
            TYPE: exports.automalcolmgun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.magician]),
                TYPE: exports.bullet,
            },
        },
    ],
}

exports.wizard = {
    PARENT: [exports.genericTank],
    LABEL: 'Wizard',
    DANGER: 6,
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 300, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 20, 0, 60, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
      {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 180, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.magician]),
                TYPE: exports.bullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.wizod2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Harry Potter',
    DANGER: 6,
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 60, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 20, 0, 120, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 180, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 240, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 20, 0, 300, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
      {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 20, 0, 360, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 40, 0, 30, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 40, 0, 90, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 40, 0, 150, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 40, 0, 210, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 40, 0, 270, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
      {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 40, 0, 330, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 60, 0, 60, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 60, 0, 120, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 60, 0, 180, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 60, 0, 240, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 60, 0, 300, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
      {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 60, 0, 360, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 80, 0, 30, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 80, 0, 90, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 80, 0, 150, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
              {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 80, 0, 210, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [6, 80, 0, 270, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
      {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [6, 80, 0, 330, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.magician]),
                TYPE: exports.bullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.wizod= {
    PARENT: [exports.genericTank],
    LABEL: 'Wizod',
    DANGER: 6,
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [36, 200, 0, 300, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [36, 200, 0, 60, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
      {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [36, 200, 0, 180, 190, 0],
            TYPE: exports.automagiciangun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.magician]),
                TYPE: exports.bullet,
                LABEL: '', // def
                STAT_CALCULATOR: 0, // def
                WAIT_TO_CYCLE: false, // def
                AUTOFIRE: false, // def
                SYNCS_SKILLS: false, // def
                MAX_CHILDREN: 0, // def
                ALT_FIRE: false, // def
                NEGATIVE_RECOIL: false, // def
            },
        },
    ],
}
exports.follower2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Follower-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autofollowergun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.autofollowergun,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.test2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Follower-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.nou,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.nou,
            SHOOT_SETTINGS: combineStats([g.slow, g.halfspeed]),
        },
    ],
}
exports.cruiser2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Cruiser-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autocruisergun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.autocruisergun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
}
exports.beehive2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Beehive-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autobeehivegun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.autobeehivegun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
}
exports.twin2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Twin-2',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autotwingun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.autotwingun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
}
exports.gangster = {
    PARENT: [exports.genericTank],
    LABEL: 'Gangster',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autoshootergun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.autoshootergun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
}
exports.kidnapper = {
    PARENT: [exports.genericTank],
    LABEL: 'Kidnapper',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autoterrorizergun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.autoterrorizergun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
}
exports.waller = {
    PARENT: [exports.genericTank],
    LABEL: 'Waller',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.morereload]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.auto3gun,
            SHOOT_SETTINGS: combineStats([g.morereload]),
        }, ],
      GUNS: [ {
            POSITION: [15, 7, 1, 0, 0, 90, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.slow]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 270, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.slow]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.blocker = {
    PARENT: [exports.genericTank],
    LABEL: 'Blocker',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.heavy3gun,
            SHOOT_SETTINGS: combineStats([g.morereload]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],  //90 270
            TYPE: exports.heavy3gun,
            SHOOT_SETTINGS: combineStats([g.morereload]),
        }, ],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 6, 1, 0, 0, 90, 0],
        },
        {
            POSITION: [2, 6, 1.1, 15, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.lessreload, g.slow]),
                TYPE: exports.block,
            },
        },
        {
            POSITION: [15, 6, 1, 0, 0, 270, 0],
        },
        {
            POSITION: [2, 6, 1.1, 15, 0, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.lessreload, g.slow]),
                TYPE: exports.block,
            },
        },
    ],
}
exports.bricklaying = {
    PARENT: [exports.genericTank],
    LABEL: 'Bricklaying',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.auto3gun,
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.auto3gun,
        },         {
            POSITION: [12, 8, 0, 90, 190, 0],
            TYPE: exports.autotrappergun,
        },        {
            POSITION: [12, 8, 0, 270, 190, 0],
            TYPE: exports.autotrappergun,
        },
    ],
}
exports.wallshooter = {
    PARENT: [exports.genericTank],
    LABEL: 'Wall Shooter',
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.autoshootergun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 180, 190, 0],
            TYPE: exports.autoshootergun,
            SHOOT_SETTINGS: combineStats([g.slow]),
        }, ],
      GUNS: [ {
            POSITION: [15, 7, 1, 0, 0, 90, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.auto]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        }, {
            POSITION: [15, 7, 1, 0, 0, 270, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.auto]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.auto5 = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto-5',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: exports.auto5gun,
                      SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 72, 190, 0],
            TYPE: exports.auto5gun,
                      SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 144, 190, 0],
            TYPE: exports.auto5gun,
                      SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 216, 190, 0],
            TYPE: exports.auto5gun,
                      SHOOT_SETTINGS: combineStats([g.slow]),
        },
        {
            POSITION: [11, 8, 0, 288, 190, 0],
            TYPE: exports.auto5gun,
                      SHOOT_SETTINGS: combineStats([g.slow]),
        },
    ],
}
exports.mega3 = {
    BODY: {
        SPEED: base.SPEED * 0.95,
    },
    PARENT: [exports.genericTank],
    LABEL: 'Mega-3',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [14, 8, 0, 0, 190, 0],
            TYPE: exports.heavy3gun,
        },
        {
            POSITION: [14, 8, 0, 120, 190, 0],
            TYPE: exports.heavy3gun,
        },
        {
            POSITION: [14, 8, 0, 240, 190, 0],
            TYPE: exports.heavy3gun,
        },
    ],
}
exports.mega2 = {
    BODY: {
        SPEED: base.SPEED * 0.95,
    },
    PARENT: [exports.genericTank],
    LABEL: 'Mega-2',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [14, 8, 0, 0, 190, 0],
            TYPE: exports.heavy3gun,
        },
        {
            POSITION: [14, 8, 0, 180, 190, 0],
            TYPE: exports.heavy3gun,
        },
    ],
}
exports.architect = {
    LABEL: 'Architect',
    BODY: {
        SPEED: base.SPEED * 1.1,
    },
    PARENT: [exports.genericTank],
    DANGER: 6,
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [12, 8, 0, 0, 190, 0],
            TYPE: exports.tritrapgun,
        },
        {
            POSITION: [12, 8, 0, 120, 190, 0],
            TYPE: exports.tritrapgun,
        },
        {
            POSITION: [12, 8, 0, 240, 190, 0],
            TYPE: exports.tritrapgun,
        },
    ],
}
exports.autodefender = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto Defender',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 1.2,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.1,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [10, 8, 0, 60, 80, 0],
            TYPE: exports.auto3gun,
        },
        {
            POSITION: [10, 8, 0, 180, 80, 0],
            TYPE: exports.auto3gun,
        },
        {
            POSITION: [10, 8, 0, 300, 80, 0],
            TYPE: exports.auto3gun,
        },
    ],
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, 0, 0, 120, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, 0, 0, 240, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.tritrapper = {
    PARENT: [exports.genericTank],
    LABEL: 'Tri Trapper',
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    BODY: {
        ACCELERATION: base.ACCEL * 1.5,
        FOV: base.FOV * 1.2,
    },
    GUNS: [
                    {
            POSITION: [0, 0, 1, 0, 0, 0, 0.9999],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.atrap]),
                TYPE: exports.bullet,
                STAT_CALCULATOR: gunCalcNames.basic,
            },
        }, 
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, 0, 0, 120, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, 0, 0, 240, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.sniper3 = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: '',
    BODY: {
        ACCELERATION: base.ACCEL * 0.6,
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.25,
    },
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [13, 8, 0, 0, 170, 0],
            TYPE: exports.sniper3gun,
        },
        {
            POSITION: [13, 8, 0, 120, 170, 0],
            TYPE: exports.sniper3gun,
        },
        {
            POSITION: [13, 8, 0, 240, 170, 0],
            TYPE: exports.sniper3gun,
        },
    ],
}
exports.auto4 = {
    PARENT: [exports.genericTank],
    DANGER: 5,
    LABEL: 'Auto-4',
    FACING_TYPE: 'autospin',
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [13, 6, 0, 45, 160, 0],
            TYPE: exports.auto4gun,
        },
        {
            POSITION: [13, 6, 0, 135, 160, 0],
            TYPE: exports.auto4gun,
        },
        {
            POSITION: [13, 6, 0, 225, 160, 0],
            TYPE: exports.auto4gun,
        },
        {
            POSITION: [13, 6, 0, 315, 160, 0],
            TYPE: exports.auto4gun,
        },
    ],
}

exports.flanktrap = {
    PARENT: [exports.genericTank],
    LABEL: 'Trap Guard',
    STAT_NAMES: statnames.generic,
    DANGER: 6,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [13, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.guntrap = {
    PARENT: [exports.genericTank],
    LABEL: 'Gunner Trapper',
    DANGER: 7,
    STAT_NAMES: statnames.generic,
    BODY: {
        FOV: base.FOV * 1.25,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.twin,
                    g.tonsmorrecoil,
                    g.lotsmorrecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.gunner,
                    g.power,
                    g.twin,
                    g.tonsmorrecoil,
                    g.lotsmorrecoil,
                ]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [13, 11, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 11, 1.7, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.bushwhack = {
    PARENT: [exports.genericTank],
    LABEL: 'Bushwhacker',
    BODY: {
        ACCELERATION: base.ACCEL * 0.7,
        FOV: base.FOV * 1.2,
    },
    DANGER: 7,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                TYPE: exports.bullet,
            },
        },
        {
            POSITION: [13, 8.5, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8.5, 1.7, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}

// UPGRADE PATHS
exports.testbed.UPGRADES_TIER_1 = [ 
    exports.removedtanks,
    exports.eventtester,
    exports.specialtanks,
    exports.misctanks,
    exports.betatanks,
    exports.workinprogress,
    exports.testbed2,
    exports.genericTank2, 
    exports.weakling,
]
exports.testbed2.UPGRADES_TIER_1 = [
    exports.areaCloser,
    exports.baseProtector,
    exports.skimboss,
]
exports.testbed3.UPGRADES_TIER_1 = [
   exports.testbed,
]  
  exports.betatanks.UPGRADES_TIER_1 = [
  exports.graveyart,
  exports.handle,
  exports.heavyship,
  exports.homing,
  exports.machinetwin,
  exports.dandelion,
  exports.seed,
  exports.venusflytrap,
  exports.flower,
  exports.lavender,
  exports.seabee,
  exports.pub,
  exports.blaster,
  exports.eventtester,
]
exports.removedtanks.UPGRADES_TIER_1 = [
   exports.doublebuilder,
   exports.flamethrower, 
   exports.feather2,
   exports.autofollower,
   exports.autocruiser,
   exports.overtrapper,
   exports.clog2,
   exports.aimer2,
   exports.rockavalanche2,
   exports.machineguard2,
   exports.trisniper2,
   exports.huntguard2,
   exports.eventtester,
]
exports.eventtester.UPGRADES_TIER_1 = [
  exports.betatanks,
  exports.removedtanks,
  exports.specialtanks,
  exports.workinprogress,
  exports.genericTank2,
  exports.weakling,
]
exports.specialtanks.UPGRADES_TIER_1 = [
   exports.thiccspawner,
   exports.thiccranger,
   exports.thicctwin,
   exports.beecarefull,
   exports.absol,
   exports.Dengineer,
   exports.gunkit,
   exports.genericTank,
   exports.wizod,
   exports.deathship2,
   exports.auto1,
   exports.shotgunception,
   exports.quint,
   exports.weirdspike,
   exports.bentboomer,
   exports.hyperskim,
   exports.quadtrapper,
   exports.specialtankspage2,
]
exports.specialtankspage2.UPGRADES_TIER_1 = [
   exports.silverbanshee,
   exports.yeeter,
   exports.hooming,
   exports.anchor,
   exports.eventtester,
]
exports.misctanks.UPGRADES_TIER_1 = [
  exports.wizod2,
]
exports.workinprogress.UPGRADES_TIER_1 = [
   exports.graveyart,
   exports.autotank,
   exports.snipertest,
   exports.eventtester,
]
exports.weakling.UPGRADES_TIER_1 = [
  exports.basic,
  exports.mortal,
  exports.minor,
  exports.follower,
  exports.muggle,
  exports.bulb,
  exports.loner,
  exports.abilitist,
]
exports.mortal.UPGRADES_TIER_1 = [
  exports.couple,
  exports.twin,
  exports.cruiser,
  exports.animal,
  exports.machine,
]
exports.animal.UPGRADES_TIER_2 = [
  exports.artillery,
  exports.bent,
  exports.rearranger,
  exports.rapidsniper,
]
exports.minor.UPGRADES_TIER_1 = [
  exports.fly,
  exports.flank,
  exports.bachelor,
  exports.auto2,
  exports.follower2,
]
exports.fly.UPGRADES_TIER_2 = [
  exports.fly2,
  exports.tri,
  exports.smash,
]
exports.muggle.UPGRADES_TIER_1 = [
  exports.hunter,
  exports.sniper,
  exports.shooter,
  exports.mini,
]
exports.basic.UPGRADES_TIER_1 = [
    exports.pound,
    exports.machine,
    exports.twin,
    exports.flank,
    exports.autobasic,
]
exports.loner.UPGRADES_TIER_1 = [
  exports.single,
  exports.couple,
  exports.sniper,
]
exports.couple.UPGRADES_TIER_2 = [
  exports.notsingle,
]
exports.abilitist.UPGRADES_TIER_1 = [
  exports.driver,
  exports.alchemist,
]
exports.alchemist.UPGRADES_TIER_1 = [
  exports.zombie,
]
exports.zombie.UPGRADES_TIER_2 = [
  exports.arbok,
]
exports.bachelor.UPGRADES_TIER_2 = [
  exports.junior,
  exports.quad,
  exports.fly2,
]
exports.junior.UPGRADES_TIER_3 = [
  exports.senior,
  exports.octo,
]
exports.bulb.UPGRADES_TIER_1 = [
  exports.trapper,
  exports.sprinkler,
]
exports.seed.UPGRADES_TIER_1 = [
  exports.flower,
]
exports.sprinkler.UPGRADES_TIER_2 = [
  exports.piranhaplant,
  exports.rune,
]
exports.venusflytrap.UPGRADES_TIER_3 = [
  exports.piranhaplant,
]
exports.flower.UPGRADES_TIER_3 = [
  exports.dandelion,
  exports.lavender,
]
exports.smash.UPGRADES_TIER_3 = [
    exports.megasmash,
    exports.spike,
    exports.autosmash,
    exports.shark,
  ]
exports.single.UPGRADES_TIER_2 = [
  exports.singleguard,
  exports.notsingle,
]
exports.twin.UPGRADES_TIER_2 = [
    exports.double,
    exports.bent,
    exports.gunner,
    exports.autotwin,
    exports.quad,
    exports.notsingle
]
exports.twin.UPGRADES_TIER_3 = []
exports.double.UPGRADES_TIER_3 = [
    exports.tripletwin,
    exports.split,
    exports.autodouble,
    exports.bentdouble,
    exports.bulwark,
]
exports.bent.UPGRADES_TIER_3 = [
    exports.penta,
    exports.spread,
    exports.benthybrid,
    exports.bentdouble,
    exports.blackwidow,
    exports.triple,
    exports.tripleswarm,
]
exports.autotwin.UPGRADES_TIER_3 = [
    exports.autodouble,
    exports.blackwidow,
    exports.twinception
]
exports.gunner.UPGRADES_TIER_3 = [
    exports.autogunner,
    exports.nailgun,
    exports.auto4,
    exports.machinegunner,
]
exports.spray.UPGRADES_TIER_3 = [
    exports.machinehex,
]
exports.sniper.UPGRADES_TIER_2 = [
    exports.assassin,
    exports.rifle,
    exports.builder,
    exports.bodyguard,
]
exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack]
exports.assassin.UPGRADES_TIER_3 = [
    exports.ranger,
    exports.stalker,
    exports.falcon,
    exports.fusiler,
    exports.flankassassin,
    exports.rapidsniper,
]
exports.hunter.UPGRADES_TIER_3 = [
    exports.preda,
    exports.poach,
    exports.sidewind,
    exports.dual,
    exports.spray,
    exports.huntguard,
]
exports.pound.UPGRADES_TIER_2 = [
    exports.destroy,
    exports.artillery,
    exports.mega2,
    exports.builder,
    exports.miniswarm,
    exports.gauge,
    exports.notmini,
]
exports.miniswarm.UPGRADES_TIER_3 = [
   exports.swarmer,
]
exports.machine.UPGRADES_TIER_2 = [
    exports.destroy,
    exports.artillery,
    exports.spray,
    exports.gunner,
    exports.machineguard,
    exports.supertrapper,
    exports.machinefollower,
    exports.rapidsniper,
]
exports.destroy.UPGRADES_TIER_3 = [
    exports.anni,
    exports.rockslide,
    exports.hybrid,
    exports.construct,
    exports.shotgun2,
    exports.fusiler,
    exports.rockavalanche,
    exports.autodestroyer,
]
exports.artillery.UPGRADES_TIER_3 = [
    exports.mortar,
    exports.spread,
    exports.valkery,
    exports.positioner,
    exports.skimmer,
]
exports.mini.UPGRADES_TIER_2 = [
    exports.stream,
    exports.nailgun,   
    exports.itsatrap,
    exports.notmini,
    exports.cropduster,
    exports.trimini,
]
exports.stream.UPGRADES_TIER_3 = [
    exports.miniliner,
    exports.pressuresprayer,
]
exports.nailgun.UPGRADES_TIER_3 = [
    exports.miniliner,
]
exports.machineguard.UPGRADES_TIER_3 = [
    exports.machinehex,
    exports.wasabi,
]
exports.notmini.UPGRADES_TIER_3 = [
    exports.pressuresprayer,
]
exports.flank.UPGRADES_TIER_2 = [
    exports.quad,
    exports.tri,
    exports.flanktrap,
    exports.auto3,
    exports.autoflank,
    exports.tritrapper,
    exports.double,
    exports.machineguard,
    exports.bodyguard,
    exports.huntguard,
    exports.shootclub,
    exports.singleguard,
]
exports.tri.UPGRADES_TIER_3 = [
    exports.fighter,
    exports.booster,
    exports.falcon,
    exports.bomber,
    exports.autotri,
    exports.surfer,
    exports.warrior,
]
exports.quad.UPGRADES_TIER_3 = [
    exports.octo,
    exports.hexatrap,
    exports.flankassassin,
]
exports.flanktrap.UPGRADES_TIER_3 = [
    exports.bulwark,
    exports.bushwhack,
    exports.guntrap,
    exports.fortress,
    exports.bulser,
    exports.bomber,
    exports.wasabi,
]
exports.bodyguard.UPGRADES_TIER_3 = [
    exports.flankassassin,
    exports.bushwhack,
  ]

exports.director.UPGRADES_TIER_2 = [
    exports.overseer,
    exports.underseer,
    exports.spawner,
    exports.rector,
    exports.colleague,
    exports.cyclops,
    exports.master,
    exports.show,
]
exports.spawner.UPGRADES_TIER_3 = [
    exports.factory, 
    exports.rockslide,
    exports.fabric,
    exports.twinspawner,
    exports.shootspawner,  
    exports.flankspawner,
    exports.followerfollower,
]
exports.overseer.UPGRADES_TIER_3 = [
    exports.overlord,
    exports.fenix,
    exports.overgunner,
    exports.beelord,
    exports.banshee,
    exports.overdrive,
    exports.movie,
]
exports.master.UPGRADES_TIER_3 = [
    exports.banshee,
]
exports.underseer.UPGRADES_TIER_3 = [
    exports.necromancer,
    exports.boomancer,
]
exports.colleague.UPGRADES_TIER_3 = [
  exports.manager,
  exports.boomancer,
  exports.karen,
]
exports.cyclops.UPGRADES_TIER_3 = [
  exports.fenix,
  exports.army,  
  exports.monstersoldier,
]
exports.show.UPGRADES_TIER_3 = [
  exports.movie,
]
exports.trapper.UPGRADES_TIER_2 = [
    exports.builder,
    exports.supertrapper,
    exports.tritrapper,
    exports.paratrooper,
    exports.trapfollower,
    exports.cyclops,
    exports.itsatrap,
    exports.bulwark,
]
exports.trapper.UPGRADES_TIER_3 = [
]
exports.itsatrap.UPGRADES_TIER_3 = [
    exports.barricade,
    exports.bulser
]
exports.builder.UPGRADES_TIER_3 = [
    exports.construct,
    exports.autobuilder,
    exports.engineer,
    exports.boomer,
    exports.rockslide,
    exports.buildingfollower,
    exports.blocker,
    exports.architect,
]
exports.supertrapper.UPGRADES_TIER_3 = [
    exports.wasabi,
    exports.trapshot,
]
exports.tritrapper.UPGRADES_TIER_3 = [
    exports.autodefender,
    exports.heptatrap,
    exports.hexatrap,
    exports.architect,
]
exports.follower.UPGRADES_TIER_1 = [
    exports.director,
    exports.instagram,
    exports.cruiser,
    exports.beehive,
    exports.follower2,
    exports.flankfollower,
    exports.feather,
    exports.trapfollower,
]
exports.clog.UPGRADES_TIER_2 = [
    exports.aimer,
    exports.machinefollower,

]
exports.follower.UPGRADES_TIER_2 = [
    exports.clog,
]
exports.cruiser.UPGRADES_TIER_2 = [
    exports.carrier,
    exports.battleship,
    exports.rune,
    exports.creep,
    exports.cruiser2,
    exports.overcruiser,
    exports.wing,
    exports.valkery,
    exports.bulser,
    exports.nibbler,
]
exports.instagram.UPGRADES_TIER_2 = [
    exports.facebook,
    exports.twitter,
    exports.snapchat,
]
exports.flankfollower.UPGRADES_TIER_2 = [
    exports.creep,
    exports.snipefollower,
    exports.nibbler,
    exports.valkery,
]
exports.trapfollower.UPGRADES_TIER_2 = [
    exports.buildingfollower,
    exports.bulser,
    exports.fortress,
    exports.nestplacer,
]
exports.creep.UPGRADES_TIER_3 = [  
    exports.facebook,
    exports.counterpicker,
    exports.ravenfeather,
    exports.warrior,
    exports.zoom,
    exports.surfer,
]
exports.rune.UPGRADES_TIER_3 = [  
    exports.fortress,
    exports.deathship,
    exports.bulser,
]
exports.battleship.UPGRADES_TIER_3 = [  
    exports.daisy,
    exports.deathship,
    exports.soft,
]
exports.carrier.UPGRADES_TIER_3 = [  
    exports.funkykong,
]
exports.sandattack.UPGRADES_TIER_3 = [
    exports.sandstorm,
    exports.mudslap,
    exports.fidgetspinner,
    exports.rockavalanche,
]
exports.beehive.UPGRADES_TIER_2 = [
    exports.beecolony,
    exports.queenbee,
    exports.beelord,
    exports.beehive2,
    exports.nestplacer,
]
exports.shooter.UPGRADES_TIER_2 = [
    exports.terrorizer,
    exports.rearranger,
    exports.gauge,
    exports.shootclub,
    exports.gangster,
    exports.pal,
    exports.autoshooter,
    exports.clog,
]
exports.terrorizer.UPGRADES_TIER_3 = [
    exports.terror,
    exports.police,
    exports.kidnapper,
    exports.offender,
]
exports.gauge.UPGRADES_TIER_3 = [
    exports.shotgun2,
    exports.aimer,
    exports.trapshot,
    exports.positioner,
]
exports.pal.UPGRADES_TIER_3 = [
    exports.comrad, 
    exports.offender,
    exports.badboy,
]
exports.autoshooter.UPGRADES_TIER_3 = [
    exports.shootception, 
]
exports.shootclub.UPGRADES_TIER_3 = [
    exports.schoolshooter,
]
exports.rearranger.UPGRADES_TIER_3 = [ 
    exports.positioner,
]
exports.auto2.UPGRADES_TIER_2 = [
    exports.auto3,
    exports.magician,
    exports.waller,
    exports.twin2,
    exports.gangster,
    exports.mega2,
]
exports.auto3.UPGRADES_TIER_3 = [
    exports.auto5,
    exports.mega3,
    exports.auto4,
    exports.twin3,
    exports.schoolshooter,
    exports.follower3,
    exports.architect,
    exports.banshee,
    exports.autodefender,
]
exports.waller.UPGRADES_TIER_3 = [
    exports.autodefender,
    exports.blocker,
    exports.bricklaying,
    exports.wallshooter,
    exports.hexatrap,
    exports.architect, 
]
exports.twin2.UPGRADES_TIER_3 = [
    exports.twin3,
    exports.auto4
]
exports.gangster.UPGRADES_TIER_3 = [
    exports.schoolshooter,
    exports.kidnapper,
    exports.wallshooter,
]
exports.mega2.UPGRADES_TIER_3 = [
    exports.mega3,
    exports.blocker,
]
exports.follower2.UPGRADES_TIER_2 = [
    exports.follower3,
    exports.cruiser2,
    exports.beehive2,
]
exports.magician.UPGRADES_TIER_3 = [
    exports.wizard,
    exports.witch,
    exports.malcolm,
]
  exports.driver.UPGRADES_TIER_2 = [
    exports.mount,
    exports.rector,
    exports.paratrooper,
  ]
exports.mount.UPGRADES_TIER_3 = [
    exports.rainer,
    exports.nestplacer,
]
exports.rector.UPGRADES_TIER_3 = [
   exports.overdrive,
   exports.karen,
]
exports.paratrooper.UPGRADES_TIER_3 = [
   exports.monstersoldier,
   exports.engineer,
   exports.rainer,
   exports.nestplacer,
]
exports.autobasic.UPGRADES_TIER_2 = [
  exports.magician,
  exports.feather,
  exports.autotwin,
  exports.autoflank,
  exports.autoshooter, 
]
exports.autoflank.UPGRADES_TIER_3 = [
  exports.fidgetspinner,
  exports.autodouble,
]
exports.feather.UPGRADES_TIER_3 = [
  exports.sandattack,
  exports.show,
  exports.wing, 
  exports.twitter,
]
exports.wing.UPGRADES_TIER_3 = [
  exports.ravenfeather,
  exports.soft,
]
//Old Codes
/*exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];
            
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.triple, exports.hexa];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.autodouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.benthybrid];
        exports.triple.UPGRADES_TIER_3 = [exports.quint];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.overseer, exports.hunter, exports.builder];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.battleship
            , exports.overtrap, exports.necromancer, exports.factory, exports.fortress];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder];
        
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.gunner, exports.artillery];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.mortar, exports.stream];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo];
        exports.tri.UPGRADES_TIER_3 = [exports.booster, exports.fighter, exports.bomber, exports.autotri];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.guntrap, exports.fortress, exports.bomber];*/

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
}
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        //modify these
        rld: 5.5,
        dam: 0.3,
        pen: 0.3,
        str: 0.1,
        spd: 0.4,
        atk: 0.4,
        hlt: 0.1,
        shi: 0.1,
        rgn: 0.5,
        mob: 0,
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [16, 14, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 14, 1.8, 16, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.trap,
                    g.lowpower,
                    g.fast,
                    g.halfreload
                ]),
                TYPE: exports.trap,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [
        {
            POSITION: [7, 14, 0.6, 7, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.sentrynest = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },  {
            POSITION: [15, 3, 1, -13, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: exports.beenest,
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
exports.sentryabsol = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 45, 0.125],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 90, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [7, 7.5, 0.6, 7, 0, 135, 0.375],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 225, 0.625],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 275, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 320, 0.825],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', {
    type: exports.heavy3gun,
    size: 12,
})
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', {
    type: exports.trapTurret,
    size: 12,
})

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.3,
        dam: 0.5,
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
}
exports.crasherSpawner = {
    PARENT: [exports.genericTank],
    LABEL: 'Spawned',
    STAT_NAMES: statnames.drone,
    CONTROLLERS: ['nearestDifferentMaster'],
    COLOR: 5,
    INDEPENDENT: true,
    AI: { chase: true },
    MAX_CHILDREN: 4,
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                TYPE: [
                    exports.drone,
                    {
                        LABEL: 'Crasher',
                        VARIES_IN_SIZE: true,
                        DRAW_HEALTH: true,
                    },
                ],
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
exports.elite = {
    PARENT: [exports.miniboss],
    LABEL: 'Elite Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 20,
    VARIES_IN_SIZE: true,
    VALUE: 150000,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 1.5,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
}
exports.elite_destroyer = {
    PARENT: [exports.elite],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 16, 1, 6, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.pound,
                    g.destroy,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Devastator',
            },
        },
        {
            POSITION: [5, 16, 1, 6, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.pound,
                    g.destroy,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Devastator',
            },
        },
        {
            POSITION: [5, 16, 1, 6, 0, -60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.pound,
                    g.destroy,
                ]),
                TYPE: exports.bullet,
                LABEL: 'Devastator',
            },
        },
    ],
    TURRETS: [
        {
            /*********  SIZE     X       Y     ANGLE    ARC */
            POSITION: [11, 0, 0, 180, 360, 0],
            TYPE: [exports.crasherSpawner],
        },
        {
            POSITION: [11, 0, 0, 60, 360, 0],
            TYPE: [exports.crasherSpawner],
        },
        {
            POSITION: [11, 0, 0, -60, 360, 0],
            TYPE: [exports.crasherSpawner],
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5 }],
        },
    ],
}
exports.elite_gunner = {
    PARENT: [exports.elite],
    GUNS: [
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [14, 16, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 16, 1.5, 14, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: [exports.pillbox, { INDEPENDENT: true }],
            },
        },
        {
            POSITION: [6, 14, -2, 2, 0, 60, 0],
        },
        {
            POSITION: [6, 14, -2, 2, 0, 300, 0],
        },
    ],
    AI: { NO_LEAD: false },
    TURRETS: [
        {
            /*********  SIZE     X       Y     ANGLE    ARC */
            POSITION: [14, 8, 0, 60, 180, 0],
            TYPE: [exports.auto4gun],
        },
        {
            POSITION: [14, 8, 0, 300, 180, 0],
            TYPE: [exports.auto4gun],
        },
    ],
}
exports.elite_sprayer = {
    PARENT: [exports.elite],
    AI: { NO_LEAD: false },
    TURRETS: [
        {
            /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [14, 6, 0, 180, 190, 0],
            TYPE: [exports.spray, { COLOR: 5 }],
        },
        {
            POSITION: [14, 6, 0, 60, 190, 0],
            TYPE: [exports.spray, { COLOR: 5 }],
        },
        {
            POSITION: [14, 6, 0, -60, 190, 0],
            TYPE: [exports.spray, { COLOR: 5 }],
        },
    ],
}

exports.palisade = (() => {
    let props = {
        SHOOT_SETTINGS: combineStats([
            g.factory,
            g.pound,
            g.halfreload,
            g.halfreload,
        ]),
        TYPE: exports.minion,
        STAT_CALCULATOR: gunCalcNames.drone,
        AUTOFIRE: true,
        MAX_CHILDREN: 1,
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
    }
    return {
        PARENT: [exports.miniboss],
        LABEL: 'Rogue Palisade',
        COLOR: 17,
        SHAPE: 6,
        SIZE: 28,
        VALUE: 500000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 2,
            SHIELD: base.SHIELD * 2,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3,
        },
        GUNS: [
            {
                /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [4, 6, -1.6, 8, 0, 0, 0],
                PROPERTIES: props,
            },
            {
                POSITION: [4, 6, -1.6, 8, 0, 60, 0],
                PROPERTIES: props,
            },
            {
                POSITION: [4, 6, -1.6, 8, 0, 120, 0],
                PROPERTIES: props,
            },
            {
                POSITION: [4, 6, -1.6, 8, 0, 180, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    AUTOFIRE: true,
                    MAX_CHILDREN: 1,
                    SYNCS_SKILLS: true,
                    WAIT_TO_CYCLE: true,
                },
            },
            {
                POSITION: [4, 6, -1.6, 8, 0, 240, 0],
                PROPERTIES: props,
            },
            {
                POSITION: [4, 6, -1.6, 8, 0, 300, 0],
                PROPERTIES: props,
            },
        ],
        TURRETS: [
            {
                /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [5, 10, 0, 30, 110, 0],
                TYPE: exports.trapTurret,
            },
            {
                POSITION: [5, 10, 0, 90, 110, 0],
                TYPE: exports.trapTurret,
            },
            {
                POSITION: [5, 10, 0, 150, 110, 0],
                TYPE: exports.trapTurret,
            },
            {
                POSITION: [5, 10, 0, 210, 110, 0],
                TYPE: exports.trapTurret,
            },
            {
                POSITION: [5, 10, 0, 270, 110, 0],
                TYPE: exports.trapTurret,
            },
            {
                POSITION: [5, 10, 0, 330, 110, 0],
                TYPE: exports.trapTurret,
            },
        ],
    }
})()

exports.bot = {
    //AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    SKILL: [5, 7, 8, 7, 3, 0, 0, 0, 2, 0],
    BODY: {
        SIZE: 10,
    },
    //COLOR: 17,
    NAME: '',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'mapAltToFire',
        'minion',
        'fleeAtLowHealth',
    ],
    AI: { STRAFE: true },
}

exports.testbed2.UPGRADES_TIER_1.push(exports.elite_sprayer);
exports.testbed2.UPGRADES_TIER_1.push(exports.nestler);
exports.testbed2.UPGRADES_TIER_1.push(exports.elite_destroyer);
exports.testbed2.UPGRADES_TIER_1.push(exports.elite_gunner);
exports.testbed2.UPGRADES_TIER_1.push(exports.palisade);