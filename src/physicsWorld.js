// @ts-ignore
import Ammo from 'ammo.js'
import { Mesh, MeshPhongMaterial, SphereBufferGeometry } from 'three';
import Sphere from './Components/Sphere';
import { blockPlanes, spheres } from './Objects/objects';

// variable declaration
let physicsWorld, rigidBodies = {spheres: [], blockPlanes:[]}, tmpTrans;


//Ammojs Initialization 
const physicsWorldInitialization = async () => {
    console.log('physics world initialized')
    const ammo = await Ammo()
    
    //code goes here
    tmpTrans = new ammo.btTransform();

    setupPhysicsWorld(ammo);

    for (const [key, blockPlane] of blockPlanes.entries()){
        createBlockPlane(ammo, blockPlane, key)
    } 
    for (const [key, sphere] of spheres.entries()){
        createSphere(ammo, sphere, key)
    }
}

function setupPhysicsWorld(ammo){

    let collisionConfiguration  = new ammo.btDefaultCollisionConfiguration(),
       dispatcher              = new ammo.btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache    = new ammo.btDbvtBroadphase(),
        solver                  = new ammo.btSequentialImpulseConstraintSolver();

    physicsWorld = new ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new ammo.btVector3(0, -10, 0));

}



function createBlockPlane(ammo, blockPlane, key){
    
    let pos = blockPlane.position;
    let scale = blockPlane.scale;
    let quat = blockPlane.quaternion;
    let mass = blockPlane.mass;
    let colliderGroups = blockPlane.colliderGroups

    //threeJS Section

    //ammojs Section
    let transform = new ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new ammo.btDefaultMotionState( transform );

    let colShape = new ammo.btBoxShape( new ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
    colShape.setMargin( 0.05 );

    let localInertia = new ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new ammo.btRigidBody( rbInfo );


    physicsWorld.addRigidBody( body, colliderGroups[0], colliderGroups[1] );
    rigidBodies.blockPlanes[key] = {body, ...blockPlane}
}


function createSphere(ammo, sphere, key){
    
    let pos = sphere.position;
    let radius = sphere.radius;
    let quat = sphere.quaternion;
    let mass = sphere.mass;
    let colliderGroups = sphere.colliderGroups

    //ammojs Section
    let transform = new ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new ammo.btDefaultMotionState( transform );

    let colShape = new ammo.btSphereShape( radius );
    colShape.setMargin( 0.05 );

    let localInertia = new ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new ammo.btRigidBody( rbInfo );

    physicsWorld.addRigidBody( body, colliderGroups[0], colliderGroups[1] );
    
    rigidBodies.spheres[key] = {body, ...sphere}

}

export {physicsWorldInitialization, physicsWorld, tmpTrans, rigidBodies }