import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useViewerStateStore } from '../../../stores';
import { OcctLoader } from './OcctLoader';
/** 是否支持浏览器端解析 */
export const isSupportThreejsLoader = (type) => type === 'glb' ||
    type === 'gltf' ||
    type === 'gitf' ||
    type === 'ply' ||
    type === 'stl' ||
    type === 'obj';
export const isSupportOcctLoader = (type) => type === 'stp' ||
    type === 'step' ||
    type === 'iges' ||
    type === 'igs' ||
    type === 'x_t';
function createURL(json) {
    const str = JSON.stringify(json);
    const blob = new Blob([str], { type: 'text/plain' });
    return URL.createObjectURL(blob);
}
/** 支持重试的加载 */
export async function loadMeshWithRetry(src, type, { originSrc, toGltf = true, props, } = {}) {
    try {
        const resp = await loadMesh(src, type, { toGltf, props });
        return resp;
    }
    catch (_) {
        console.error('>>>mesh_loader>>>loadMeshWithRetry>>>error:', _);
        if (originSrc && typeof originSrc === 'string') {
            // 尝试重新加载
            return loadMesh(originSrc, type, { toGltf, props });
        }
        else {
            throw _;
        }
    }
}
/** 将其他类型的文件，转化为 GLTF 类型 */
export async function loadMesh(src, type, { toGltf = true, props, } = {}) {
    const material = new THREE.MeshStandardMaterial();
    return await new Promise(async (resolve, reject) => {
        const srcUrl = src instanceof File ? URL.createObjectURL(src) : src;
        try {
            if (isSupportOcctLoader(type) && src instanceof File) {
                const occtLoader = OcctLoader.getInstance();
                const mesh = await occtLoader.load(src, props);
                resolve({ mesh, srcUrl });
            }
            else if (type === 'glb' || type === 'gltf' || type === 'gitf') {
                const loader = new GLTFLoader();
                const dracoLoader = new DRACOLoader();
                dracoLoader.setDecoderPath('draco/');
                loader.setDRACOLoader(dracoLoader);
                loader.load(srcUrl, data => {
                    resolve({
                        gltf: srcUrl,
                        srcUrl,
                        mesh: data.scene.children[0],
                    });
                });
            }
            else if (type === 'obj') {
                const loader = new OBJLoader();
                loader.load(srcUrl, group => {
                    if (toGltf) {
                        const exporter = new GLTFExporter();
                        exporter.parse(group, gltf => {
                            // 将 obj 转化为 mesh
                            group.traverse(child => {
                                if (child instanceof THREE.Mesh) {
                                    child.material.transparent = true;
                                    const mesh = new THREE.Mesh(child.geometry, child.material);
                                    resolve({ gltf: createURL(gltf), mesh, srcUrl });
                                }
                            });
                        }, {});
                    }
                    else {
                        // 不包含 gltf 则直接返回
                        group.traverse(child => {
                            if (child instanceof THREE.Mesh) {
                                child.material.transparent = true;
                                const mesh = new THREE.Mesh(child.geometry, child.material);
                                resolve({ mesh, srcUrl });
                            }
                        });
                    }
                }, () => { }, err => {
                    reject(err);
                });
            }
            else if (type === 'ply') {
                const loader = new PLYLoader();
                loader.load(srcUrl, geometry => {
                    const mesh = new THREE.Mesh(geometry, material);
                    const exporter = new GLTFExporter();
                    exporter.parse(mesh, gltf => {
                        resolve({ gltf: createURL(gltf), mesh, srcUrl });
                    }, {});
                }, () => { }, err => {
                    reject(err);
                });
            }
            else if (type === 'stl') {
                const loader = new STLLoader();
                loader.load(srcUrl, geometry => {
                    const mesh = new THREE.Mesh(geometry, material);
                    if (toGltf) {
                        const exporter = new GLTFExporter();
                        exporter.parse(mesh, gltf => {
                            resolve({ gltf: createURL(gltf), mesh, srcUrl });
                        }, {});
                    }
                    else {
                        resolve({ mesh, srcUrl });
                    }
                }, () => { }, err => {
                    reject(err);
                });
            }
            else if (type === '3mf') {
                const loader = new ThreeMFLoader();
                loader.load(srcUrl, group => {
                    group.traverse(child => {
                        if (child instanceof THREE.Mesh) {
                            child.material.transparent = true;
                            const mesh = new THREE.Mesh(child.geometry, child.material);
                            resolve({ mesh, srcUrl });
                        }
                    });
                }, () => { }, err => {
                    reject(err);
                });
            }
            else {
                useViewerStateStore.setState({
                    loaderEvent: 'The format of the model does not support parsing!',
                });
                reject('The format of the model does not support parsing!');
            }
        }
        catch (_) {
            console.error('>>>loadMesh>>>error:', _);
            reject(_);
        }
    });
}
//# sourceMappingURL=mesh-loader.js.map