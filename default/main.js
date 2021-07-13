var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');

module.exports.loop = function() {

    //clear memory
    for(let name in Memory.creeps)
    {
        if(Game.creeps[name] == undefined)
        {
            delete Memory.creeps[name];
        }
    }

    for(let name in Game.creeps)
    {
        var creep = Game.creeps[name];
       
        console.log(name + " is working: " + creep.memory.working);
        
        if(creep.memory.role == 'harvester')
        {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader')
        {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder')
        {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'repairer')
        {
            roleRepairer.run(creep);
        }
    }
    
    var name = undefined;
    var minnumHarvester = 7;
    var numofHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    console.log("Number of harvester: " + numofHarvester);
    
    var minnumUpgrader = 4;
    var numofUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    console.log("Number of upgrader: " + numofUpgrader);
    
    var minnumBuilder = 3;
    var numofBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    console.log("Number of builder: " + numofBuilder);
    
    var minnumRepairer = 3;
    var numofRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    console.log("Number of repairer: " + numofRepairer);
    
    if(numofHarvester < minnumHarvester)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, 
        {role: 'harvester', working: false});
    }
    else if(numofUpgrader < minnumUpgrader)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, 
        {role: 'upgrader', working: false});
    }
    else if(numofRepairer < minnumRepairer)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, 
        {role: 'repairer', working: false});
    }
    else if(numofBuilder < minnumBuilder)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, 
        {role: 'builder', working: false});
    }
    
    //if(typeof(name) == "string")
    if(!(name < 0)){
        console.log("Spawned a new harvester creep: " + name);
    }
};