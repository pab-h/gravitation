type TComponets = {
    x: number,
    y: number
}

class CelestialBody {
    public id: number;
    public mass: number = 100;
    public radius: number = 10;
    public color: string = "white";
    public position: TComponets;
    public velocity: TComponets;
    public acceleration: TComponets;

    private static randomId() {
        return Math.floor(Math.random() * Date.now());
    } 

    public constructor () {
        this.id = CelestialBody.randomId();

        this.position = {
            x: 0,
            y: 0
        };

        this.velocity = {
            x: 0,
            y: 0
        };

        this.acceleration = {
            x: 0,
            y: 0
        };

    }

    public angleTo(otherBody: CelestialBody) {
        const deltaY = otherBody.position.y - this.position.y;
        const deltaX = otherBody.position.x - this.position.x;

        return Math.atan2(deltaY, deltaX);
    }

    public distanceTo(otherBody: CelestialBody) {
        const deltaY = otherBody.position.y - this.position.y;
        const deltaX = otherBody.position.x - this.position.x;

        return Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
    }

    public positionIn(time: number = 0) {
        this.position.y += this.velocity.y * time + (this.acceleration.y * Math.pow(time, 2)) / 2;
        this.position.x += this.velocity.x * time + (this.acceleration.x * Math.pow(time, 2)) / 2;

    }

    public accelerationBy(resultForce: TComponets = { x: 0, y: 0 }) {
        this.acceleration.y = resultForce.y / this.mass;
        this.acceleration.x = resultForce.x / this.mass;

    }

}

class CelestialBodySystem {
    readonly celestialBodies: Array<CelestialBody> = [];
    public G: number = .01;

    public push(body: CelestialBody) {
        this.celestialBodies.push(body);

    }

    public resultForceIn(body: CelestialBody) { 
        const resultForce: TComponets = {
            x: 0,
            y: 0
        };

        for(const otherBody of this.celestialBodies) {
            if (body.id == otherBody.id) {
                
                continue;
            } 

            const distance = body.distanceTo(otherBody);

            if (distance == 0) {
                
                continue;
            }

            const force = (this.G * body.mass * otherBody.mass ) / Math.pow(distance, 2);
            const angle = body.angleTo(otherBody);

            resultForce.y += force * Math.sin(angle);
            resultForce.x += force * Math.cos(angle);

        }

        return resultForce;
    }

    public updateAll(time: number = 0) {
        for(const body of this.celestialBodies) {
            const force = this.resultForceIn(body);
            
            body.accelerationBy(force);
            body.positionIn(time);
        }

    }

}

class DisplayCelestialBodySystem {
    private celestialBodySystem: CelestialBodySystem;
    private pencil: CanvasRenderingContext2D;
    readonly CANVAS_WIDTH = 600;
    readonly CANVAS_HEIGHT = 600;

    public constructor (canvasId: string, celestialBodySystem: CelestialBodySystem) {
        const canvas = document.querySelector(`canvas#${ canvasId }`) as HTMLCanvasElement | null;
        
        if (!canvas) {
            throw new Error(`Canvas #${ canvasId } not found`);
        }

        const pencil = canvas.getContext("2d");

        if (!pencil) {
            throw new Error(`Canvas #${ canvasId } is not CanvasRenderingContext2D`);
        }

        this.pencil = pencil;
        this.pencil.canvas.width = this.CANVAS_WIDTH;
        this.pencil.canvas.height = this.CANVAS_HEIGHT;

        this.celestialBodySystem = celestialBodySystem;

    }

    public clean() {
        this.pencil.clearRect(
            0, 
            0, 
            this.pencil.canvas.width, 
            this.pencil.canvas.height
        );

    }

    public display(clean: boolean = true) {      
        if (clean) {
            this.clean();

        }
        
        for(const body of this.celestialBodySystem.celestialBodies) {
            this.pencil.beginPath();
            this.pencil.arc(
                body.position.x,
                body.position.y,
                body.radius,
                0,
                2 * Math.PI
            );
            this.pencil.strokeStyle = body.color;
            this.pencil.stroke();
            this.pencil.closePath();
        }
    }

}

function example () {
    const system = new CelestialBodySystem();

    const bodyA = new CelestialBody();
    bodyA.position = {
        x: 0,
        y: 0
    };

    const bodyB = new CelestialBody();
    bodyB.position = {
        x: 600,
        y: 0
    };

    const bodyC = new CelestialBody();
    bodyC.position = {
        x: 0,
        y: 600
    };

    const bodyD = new CelestialBody();
    bodyD.position = {
        x: 600,
        y: 600
    };

    system.push(bodyA);
    system.push(bodyB);
    system.push(bodyC);
    system.push(bodyD);
    
    const displaySystem = new DisplayCelestialBodySystem(
        "main",
        system
    );
    
    displaySystem.display();
    
    let time = 0;
    
    function loop() {
        system.updateAll(time);
        // displaySystem.display();
        displaySystem.display(false);
        console.log(`Time: ${ time }s`);
        time++;
        window.requestAnimationFrame(loop);
    }

    loop();
}
