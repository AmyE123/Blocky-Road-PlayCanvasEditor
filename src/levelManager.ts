class LevelManager extends pc.ScriptType {
    sidesCompleted: number = 0;

    initialize() {
        console.log("Level Manager Test");
    }

    update() {
        if (this.sidesCompleted == 2) {
            console.log("Level complete!");

            // TODO: Add functionality to load the next level.
        }
    }
};

pc.registerScript(LevelManager, 'levelManager');
LevelManager.attributes.add('sidesCompleted', { type: 'number' })