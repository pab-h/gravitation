# Gravitation

Sistema de corpos com massa onde há somente a força gravitacional

## Como instalar 

`git clone https://github.com/pab-h/gravitation.git`

Na pasta do projeto, execute no terminal:

`npm install`

Após instalado os packpages, execute no terminal:

`npx tsc index.ts`

## Tipo TComponets
```ts
type TComponets = {
    x: number,
    y: number
}
```

## Classes

### MassBody
Responsável por representar um corpo com massa no sistema

#### Propriedades
```ts
public id: number;
public mass: number = 100;
public radius: number = 10;
public color: string = "white";
public position: TComponets;
public velocity: TComponets;
public acceleration: TComponets;
```

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
