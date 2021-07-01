// @ts-ignore
import Ammo from 'ammo.js';
import {  Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { initialBlockPlanes, initialSpheres } from './Objects/objects';
import loader from '../src/Physics/loader';
import { useStore } from 'react-redux';
// variable declaration
let ammo, physicsWorld,
  rigidBodies = { spheres: [], blockPlanes: [], convexHulls: [] }, tmpTrans;

//Ammojs Initialization 
const physicsWorldInitialization = async () => {
  ammo = await Ammo();
  //code goes here
  tmpTrans = new ammo.btTransform();
  
  setupPhysicsWorld(ammo);
  
  console.log('physics world initialized');
  
  //createConvexHullShape(initialConvexHull);
  
  for (const blockPlane of initialBlockPlanes) {
    createBlockPlane(blockPlane);
  }
  for (const sphere  of initialSpheres) {
    createSphere(sphere);
  }
};

function setupPhysicsWorld() {

  let collisionConfiguration = new ammo.btDefaultCollisionConfiguration(),
    dispatcher = new ammo.btCollisionDispatcher(collisionConfiguration),
    overlappingPairCache = new ammo.btDbvtBroadphase(),
    solver = new ammo.btSequentialImpulseConstraintSolver();

  physicsWorld = new ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
  physicsWorld.setGravity(new ammo.btVector3(0, -10, 0));

}



function createBlockPlane(blockPlane) {

  let pos = blockPlane.position;
  let scale = blockPlane.scale;
  let quat = blockPlane.quaternion;
  let mass = blockPlane.mass;
  let colliderGroups = blockPlane.colliderGroups;

  //threeJS Section

  //ammojs Section
  let transform = new ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  let motionState = new ammo.btDefaultMotionState(transform);

  let colShape = new ammo.btBoxShape(new ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
  colShape.setMargin(0.05);

  let localInertia = new ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
  let body = new ammo.btRigidBody(rbInfo);

  physicsWorld.addRigidBody(body);//, colliderGroups[0], colliderGroups[1]);
  rigidBodies.blockPlanes.push({ body, ...blockPlane });
}


function createSphere(sphere) {

  let pos = sphere.position;
  let radius = sphere.radius;
  let quat = sphere.quaternion;
  let mass = sphere.mass;
  let colliderGroups = sphere.colliderGroups;

  //ammojs Section
  let transform = new ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  let motionState = new ammo.btDefaultMotionState(transform);

  let colShape = new ammo.btSphereShape(radius);
  colShape.setMargin(0.05);

  let localInertia = new ammo.btVector3(0, 2, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
  let body = new ammo.btRigidBody(rbInfo);

  physicsWorld.addRigidBody(body);//, colliderGroups[0], colliderGroups[1]);

  rigidBodies.spheres.push({ body, ...sphere });

}

function createConvexHullShape(convexHull) {

  let pos = convexHull.position;
  let radius = convexHull.radius;
  let quat = convexHull.quaternion;
  let mass = convexHull.mass;
  let colliderGroups = convexHull.colliderGroups;
  let triangles = [];
  let colShape;

  let btConvexHullShape = new ammo.btConvexHullShape();
  convexHull.gltf.scene.traverse(function (child) {
    if ( child.isMesh ) {
      var positions=child.geometry.attributes.position.array.map((value) => {
        return value* 0.01;
      });
      let i, triangle;
      let triangle_mesh = new ammo.btTriangleMesh;
      for(i=0;i<positions.length;i+=3){
        triangles.push( new Vector3().fromArray( positions, i ) );
      }     

      let vec3_1 = new ammo.btVector3(0,0,0);
      let vec3_2 = new ammo.btVector3(0,0,0);
      let vec3_3 = new ammo.btVector3(0,0,0);
      for ( i = 0; i < triangles.length; i+=3) {
        vec3_1.setX(triangles[i].x);
        vec3_1.setY(triangles[i].y);
        vec3_1.setZ(triangles[i].z);
        btConvexHullShape.addPoint(vec3_1,true);

        vec3_2.setX(triangles[i+1].x);
        vec3_2.setY(triangles[i+1].y);
        vec3_2.setZ(triangles[i+1].z);
        btConvexHullShape.addPoint(vec3_2,true);

        vec3_3.setX(triangles[i+2].x);
        vec3_3.setY(triangles[i+2].y);
        vec3_3.setZ(triangles[i+2].z);
        btConvexHullShape.addPoint(vec3_3,true);

        triangle_mesh.addTriangle(vec3_1, vec3_2, vec3_3, true);
      }

      //colShape = new ammo.btBvhTriangleMeshShape(triangle_mesh, true, true);

      //ammojs Section
      let transform = new ammo.btTransform();
      transform.setIdentity();
      transform.setOrigin(new ammo.btVector3(pos.x, pos.y, pos.z));
      transform.setRotation(new ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
      let motionState = new ammo.btDefaultMotionState(transform);

      //colShape.setMargin(0.05);
      btConvexHullShape.setMargin(0.00);

      let localInertia = new ammo.btVector3(0, 0, 0);
      //colShape.calculateLocalInertia(mass, localInertia);
      btConvexHullShape.calculateLocalInertia(mass, localInertia);

      //let rbInfo = new ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
      let rbInfo = new ammo.btRigidBodyConstructionInfo(mass, motionState, btConvexHullShape, localInertia);
      let body = new ammo.btRigidBody(rbInfo);

      physicsWorld.addRigidBody(body);//, colliderGroups[0], colliderGroups[1]);

      rigidBodies.convexHulls.push({ body, ...convexHull });

    }
  }
  );
}

export { physicsWorldInitialization,createConvexHullShape, physicsWorld, tmpTrans, rigidBodies, createSphere };