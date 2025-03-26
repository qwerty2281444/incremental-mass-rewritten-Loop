const LOOP = {
    doReset() {
        player.inf.reached = false
        player.mass = E(0)

        // QoL

        let iu11 = hasInfUpgrade(11), iu15 = hasInfUpgrade(15)

        if (!hasInfUpgrade(18) || CHALS.inChal(20)) {
            resetMainUpgs(1,[3])
            resetMainUpgs(2,[5,6])
            resetMainUpgs(3,[1,2,6])
        }
        if (!iu11) resetMainUpgs(4,[8])

        let e = [14,18,24,30,122,124,131,136,143,194]
        if (hasInfUpgrade(2)) e.push(202)
        if (hasInfUpgrade(3)) e.push(161)
        if (iu15) e.push(218)

        for (let i = 0; i < player.atom.elements.length; i++) if (player.atom.elements[i] > 218) e.push(player.atom.elements[i])

        player.atom.elements = e

        e = []
        
        for (let i = 0; i < player.atom.muonic_el.length; i++) if (MUONIC_ELEM.upgs[player.atom.muonic_el[i]].cs) e.push(player.atom.muonic_el[i])

        player.atom.muonic_el = e
        for (let x = 1; x <= (hasElement(229) ? 15 : 16); x++) player.chal.comps[x] = E(0)
        player.supernova.tree = ["qu_qol1", "qu_qol2", "qu_qol3", "qu_qol4", "qu_qol5", "qu_qol6", "qu_qol7", "qu_qol8", "qu_qol9", "qu_qol8a", "unl1", "unl2", "unl3", "unl4",
        "qol1", "qol2", "qol3", "qol4", "qol5", "qol6", "qol7", "qol8", "qol9", 'qu_qol10', 'qu_qol11', 'qu_qol12', 'qu0']

        player.ranks.beyond = E(0)
        for (let x = 0; x < PRESTIGES.names.length; x++) player.prestiges[x] = E(0)

        // Reset

        player.ranks[RANKS.names[RANKS.names.length-1]] = E(0)
        RANKS.doReset[RANKS.names[RANKS.names.length-1]]()

        player.rp.points = E(0)
        BUILDINGS.reset('tickspeed')
        BUILDINGS.reset('accelerator')
        player.bh.mass = E(0)

        player.atom.atomic = E(0)
        player.bh.dm = E(0)
        BUILDINGS.reset('bhc')

        tmp.supernova.time = 0

        player.atom.points = E(0)
        player.atom.quarks = E(0)
        player.atom.particles = [E(0),E(0),E(0)]
        player.atom.powers = [E(0),E(0),E(0)]
        player.atom.atomic = E(0)
        BUILDINGS.reset('cosmic_ray')

        player.md.active = false
        player.md.particles = E(0)
        player.md.mass = E(0)
        for (let x = 0; x < MASS_DILATION.upgs.ids.length; x++) player.md.upgs[x] = E(0)

        player.stars.unls = 0
        player.stars.generators = [E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0)]
        player.stars.points = E(0)
        BUILDINGS.reset('star_booster')

        player.supernova.chal.noTick = true
        player.supernova.chal.noBHC = true

        if (CHALS.inChal(19) || !hasElement(47,1)) player.supernova.times = E(0)
        player.supernova.stars = E(0)

        player.supernova.bosons = {
            pos_w: E(0),
            neg_w: E(0),
            z_boson: E(0),
            photon: E(0),
            gluon: E(0),
            graviton: E(0),
            hb: E(0),
        }
        for (let x in BOSONS.upgs.ids) for (let y in BOSONS.upgs[BOSONS.upgs.ids[x]]) player.supernova.b_upgs[BOSONS.upgs.ids[x]][y] = E(0)

        player.supernova.fermions.points = [E(0),E(0)]

        for (let x = 0; x < 2; x++) for (let y = 0; y < 7; y++) player.supernova.fermions.tiers[x][y] = E(0)

        player.supernova.radiation.hz = hasUpgrade('br',6)?E(1e50):E(0)
        for (let x = 0; x < 7; x++) {
            player.supernova.radiation.ds[x] = E(0)
            for (let y = 0; y < 2; y++) player.supernova.radiation.bs[2*x+y] = E(0)
        }

        // Quantum

        let qu = player.qu
        let bmd = player.md.break
        let quSave = getQUSave()

        qu.times = E(10)
        qu.points = E(0)
        qu.bp = E(0)
        qu.chroma = [E(0),E(0),E(0)]
        
        BUILDINGS.reset('cosmic_string')

        qu.prim.theorems = E(0)
        qu.prim.particles = [E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0)]

        qu.en.amt = E(0)
        qu.en.eth = quSave.en.eth
        qu.en.hr = quSave.en.hr
        qu.en.rewards = quSave.en.rewards

        qu.rip.active = false
        qu.rip.amt = E(0)

        if (!iu11) bmd.active = false
        bmd.energy = E(0)
        bmd.mass = E(0)
        for (let x = 0; x < 12; x++) if (x != 10) bmd.upgs[x] = E(0)

        // Dark Reset

        let dark = player.dark
        let darkSave = getDarkSave()

        dark.rays = hasInfUpgrade(7)?E(1e12):E(0)
        dark.shadow = E(0)
        dark.abyssalBlot = E(0)

        dark.run.active = false
        dark.run.glyphs = [E(0),E(0),E(0),E(0),E(0),E(0)]
        if (!hasInfUpgrade(3)) dark.run.upg = []

        dark.matters = darkSave.matters

        if (iu15) {
            darkSave.c16.first = true
            darkSave.c16.bestBH = dark.c16.bestBH
            darkSave.c16.charger = dark.c16.charger
        }

        dark.c16 = darkSave.c16

        if (hasInfUpgrade(8)) {
            for (let i = 0; i < infUpgEffect(8); i++) dark.c16.tree.push(...TREE_IDS[i][5])
        }

        dark.exotic_atom = darkSave.exotic_atom

        if (!hasElement(242)) BUILDINGS.reset('fvm')
        player.bh.unstable = E(0)

        // Other

        if (!hasInfUpgrade(11)) {
            tmp.rank_tab = 0
            tmp.stab[4] = 0
        }
        
        tmp.stab[7] = 0

        if (!iu15) {
            player.atom.elemTier[0] = 1
            player.atom.elemLayer = 0
        }
    }
