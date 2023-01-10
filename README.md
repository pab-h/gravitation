# Gravitation

Sistema de corpos com massa onde há somente a força gravitacional

## Como instalar 

`git clone https://github.com/pab-h/gravitation.git`

Na pasta do projeto, execute no terminal:

`npm install`

Após instalado os packpages, execute no terminal:

`npx tsc index.ts`

## Tipo TComponets
```
type TComponets = {
    x: number,
    y: number
}
```

## Classes

### MassBody
Responsável por representar um corpo com massa no sistema

#### Propriedades 
1. id
1. mass
1. radius
1. color 
1. position
1. velocity
1. acceleration

#### randomId
`private static randomId()`

#### angleTo
`public angleTo(otherBody: MassBody)`

#### distanceTo
`public distanceTo(otherBody: MassBody)`

#### positionIn
`public positionIn(time: number = 0)`

#### accelerationBy
`public accelerationBy(resultForce: TComponets = { x: 0, y: 0 })`

### MassBodySystem
Responsável pela interações entre os MassBody

#### Propriedades 
1. massBodies
1. G

#### push
`public push(body: MassBody)`

#### resultForceIn
`public resultForceIn(body: MassBody)`

#### updateAll
`public updateAll(time: number = 0)`

### DisplayMassBodySystem
Responsável pela visualização do MassBodySystem

#### Propriedades 
1. MassBodySystem
1. pencil
1. CANVAS_WIDTH
1. CANVAS_HEIGHT

#### clean
`public clean()`

#### display
`public display(clean: boolean = true)`
