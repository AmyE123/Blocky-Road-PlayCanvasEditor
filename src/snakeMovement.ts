class SnakeMovement extends pc.ScriptType {
    speed: number = 1;
    moveDelay: number = 1;
    moveTimer: number = 0;
    movingForward: boolean = true;

    minX: number = -1;
    maxX: number = 1;

    initialize() {
        this.moveTimer = this.moveDelay;
    }

    update(dt: number) {
        this.moveTimer -= dt;
        if (this.moveTimer <= 0) {
            this.moveTimer = this.moveDelay;
            this.moveSnake();
        }
    }

    moveSnake() {
        if (!this.entity) return;

        let headPos = this.entity.getPosition().clone();
        let moveAmount = this.movingForward ? this.speed : -this.speed;

        let nextPos = headPos.clone();
        nextPos.x += moveAmount;

        if (nextPos.x >= this.maxX) {
            nextPos.x = this.maxX;
            this.movingForward = false;
        }
        else if (nextPos.x <= this.minX) {
            nextPos.x = this.minX;
            this.movingForward = true;
        }

        if (this.entity.rigidbody) {
            this.entity.rigidbody.teleport(nextPos);
        }
    }
}

pc.registerScript(SnakeMovement, 'snakeMovement');

SnakeMovement.attributes.add('speed', { type: 'number', default: 1 });
SnakeMovement.attributes.add('moveDelay', { type: 'number', default: 1 });
SnakeMovement.attributes.add('minX', { type: 'number', default: -1 });
SnakeMovement.attributes.add('maxX', { type: 'number', default: 1 });