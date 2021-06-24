const colliderGroups= {
    plane: 1,
    sphere1: 2,
    sphere2: 4
}

export const blockPlanes = [
    {
        position: {x:0, y:0, z:0},
        scale: {x: 2, y: 0.1, z: 2},
        quaternion: {x: 0, y: 0, z: 0, w: 1},
        mass: 0,
        colliderGroups: [colliderGroups.plane, colliderGroups.sphere1],
        color: 'gray'
    }
]

export const spheres = [
    {
        position: {x: 0, y: 2, z: 0},
        radius: 0.2,
        quaternion: {x: 0, y: 0, z: 0, w: 1},
        mass: 1,
        colliderGroups: [colliderGroups.sphere1, colliderGroups.plane | colliderGroups.sphere2],
        color: 'salmon',
    },
    {
        position: {x:0.2, y:4, z:0},
        radius: 0.2,
        scale:  {x: 0.2, y: 4, z: 0},
        quaternion: {x: 0, y: 0, z: 0, w: 1},
        mass: 1,
        colliderGroups: [colliderGroups.sphere2, colliderGroups.sphere1],
        color: 'lightgreen',
    },
]