class FinishLevelTrigger extends pc.ScriptType {

    initialize() {
        // Checks whether the entity is valid and has a collision component on initialization.
        if (this.entity && this.entity.collision) {
            // Adds a triggerenter event listener to the collision component.
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
        }    
    }
  
    private onTriggerEnter(entity: pc.Entity) {
        var player = entity.script?.get('player') as Player | undefined;

        if (player) {
            player.hasCompletedLevel = true;         
        }
    }
}

pc.registerScript(FinishLevelTrigger, 'finishLevelTrigger');