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
