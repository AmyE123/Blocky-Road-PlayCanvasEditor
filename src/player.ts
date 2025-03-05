class Player extends pc.ScriptType {
    isTop: boolean;
    hasCompletedLevel: boolean;
    completionFlag: boolean = false;
    levelManager: pc.Entity;

    initialize() {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }

    update() {
        if (this.hasCompletedLevel && !this.completionFlag) {
            var levelManagerScript = this.levelManager.script?.get('levelManager') as LevelManager | undefined;

            if (levelManagerScript) {
                levelManagerScript.sidesCompleted++;
                this.completionFlag = true;
            }
        }
    }

    onMouseDown(event: pc.MouseEvent) {
        this.entity.translate(0, 0, -1);  // TODO: Make this a constant somewhere. No magic numbers!    
    }

    destroy() {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }
};

pc.registerScript(Player, 'player');
Player.attributes.add('isTop', { type: 'boolean' });
Player.attributes.add('hasCompletedLevel', { type: 'boolean' });
Player.attributes.add('incrementedSidesCompleted', { type: 'boolean' });
Player.attributes.add('levelManager', { type: 'entity' });