class Player extends pc.ScriptType {
    text: string;
    entityLink: pc.Entity | null;
    isTop: boolean;

    initialize() {
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }

    onMouseDown(event: pc.MouseEvent) {
        this.entity.translate(0, 0, -1);  // TODO: Make this a constant somewhere. No magic numbers!    
    }

    destroy() {
        this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    }
};

pc.registerScript(Player, 'player');
Player.attributes.add('text', { type: 'string' });
Player.attributes.add('entityLink', { type: 'entity' })
Player.attributes.add('isTop', { type: 'boolean' });
