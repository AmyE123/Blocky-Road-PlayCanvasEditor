class ButtonManager extends pc.ScriptType {
    isToggleable: boolean; // Whether this button can toggle the wall on and off or not.
    targetWall: pc.Entity;
    isSteppedOn: boolean = false; 

    initialize() {
        if (this.entity && this.entity.collision) {
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
            this.entity.collision.on('triggerleave', this.onTriggerLeave, this);
        }    
    }

    onTriggerEnter(entity: pc.Entity) {
        if(entity.tags.has("player")){
            this.isSteppedOn = true;
            if(this.isToggleable){
                this.targetWall.enabled = false;
            }
            else {
                this.targetWall.destroy();
            }
        }
    }

    onTriggerLeave(entity: pc.Entity) {
        if(entity.tags.has("player")){
            this.isSteppedOn = false;
            if(this.isToggleable && !this.isSteppedOn){
                this.targetWall.enabled = true;
            }
        }
    }
};

pc.registerScript(ButtonManager, 'buttonManager');
ButtonManager.attributes.add('targetWall', { type: 'entity' });
ButtonManager.attributes.add('isToggleable', { type: 'boolean', default: false });