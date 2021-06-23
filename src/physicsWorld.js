// @ts-ignore
import Ammo from 'ammo.js'
import { Mesh, MeshPhongMaterial, SphereBufferGeometry } from 'three';
import Sphere from './Components/Sphere';

// variable declaration
let physicsWorld, scene, camera, renderer, clock, ball, maskBall, blockPlane, tmpTrans;
let colGroupPlane = 1, colGroupRedBall = 2, colGroupGreenBall = 4


//Ammojs Initialization 
const physicsWorldInitialization = async () => {
    const ammo = await Ammo()
        
    console.log('physics world starts')
    
    //code goes here
    tmpTrans = new ammo.btTransform();

    setupPhysicsWorld(ammo);
    createBlockPlane(ammo)
    createBall(ammo)
    createMaskBall(ammo)
}

function setupPhysicsWorld(ammo){
    console.log('physics world sets up')

    let collisionConfiguration  = new ammo.btDefaultCollisionConfiguration(),
       dispatcher              = new ammo.btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache    = new ammo.btDbvtBroadphase(),
        solver                  = new ammo.btSequentialImpulseConstraintSolver();

    physicsWorld = new ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
    physicsWorld.setGravity(new ammo.btVector3(0, -10, 0));

}



function createBlockPlane(ammo){
    
    let pos = {x: 0, y: 0, z: 0};
    let scale = {x: 2, y: 0.1, z: 2};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 0;

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


    physicsWorld.addRigidBody( body, colGroupPlane, colGroupRedBall );
}


function createBall(ammo){
    
    let pos = {x: 0, y: 2, z: 0};
    let radius = 0.2;
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 1;


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


    physicsWorld.addRigidBody( body, colGroupRedBall, colGroupPlane | colGroupGreenBall );
    
    ball = body;
}

function createMaskBall(ammo){
    
    let pos = {x: 0.2, y: 4, z: 0};
    let radius = 0.2;
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 1;

    //Ammojs Section
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


    physicsWorld.addRigidBody( body, colGroupGreenBall, colGroupRedBall);
    
    maskBall = body
}

export {physicsWorldInitialization, physicsWorld, ball,maskBall, tmpTrans }