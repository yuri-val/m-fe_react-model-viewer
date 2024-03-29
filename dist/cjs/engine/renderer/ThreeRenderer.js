"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeRenderer = void 0;
const tslib_1 = require("tslib");
const U = (0, tslib_1.__importStar)(require("@m-fe/utils"));
const three_text_sprite_1 = (0, tslib_1.__importDefault)(require("@seregpie/three.text-sprite"));
const each_1 = (0, tslib_1.__importDefault)(require("lodash/each"));
const max_1 = (0, tslib_1.__importDefault)(require("lodash/max"));
const THREE = (0, tslib_1.__importStar)(require("three"));
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const core_1 = require("../core");
const generator_1 = require("../generator");
const controls_1 = require("../scenery/controls");
const ThreeDryRenderer_1 = require("./ThreeDryRenderer");
const ThreeRendererContext_1 = require("./ThreeRendererContext");
const fudge = 1.0;
class ThreeRenderer extends ThreeDryRenderer_1.ThreeDryRenderer {
    constructor(
    // viewerProps 相对是常量
    viewerProps, { getDom, getViewerState, onContextChange, }) {
        super();
        this.viewerProps = viewerProps;
        this.id = U.genId();
        this.captureSnapshot = async () => {
            const { context } = this;
            this.changeTheme('fresh');
            await U.sleep(1000);
            return new Promise(async (resolve) => {
                new generator_1.ObjectSnapshotGenerator(context.mesh, context.camera, context.renderer, (dataUrl) => {
                    resolve(dataUrl);
                    this.changeTheme('default');
                });
            });
        };
        this.changeMaterial = (material) => {
            const context = this.context;
            if (context.mesh) {
                context.mesh.material = material;
            }
        };
        this.changeModelColor = (modelColor) => {
            if (this.context.mesh) {
                this.context.mesh.material = new THREE.MeshPhongMaterial({
                    color: modelColor,
                    specular: 0x111111,
                    shininess: 20,
                });
                this.onContextChange({ modelColor });
            }
        };
        this.changeBackgroundColor = (backgroundColor) => {
            this.context.renderer.setClearColor(new THREE.Color(backgroundColor), 1);
            this.onContextChange({ backgroundColor });
        };
        this.renderScene = () => {
            const context = this.context;
            // horizontal rotation
            if (!context.defaultGroup) {
                return;
            }
            if (context.renderer) {
                context.renderer.render(context.scene, context.camera);
            }
        };
        /** 加载完成事件 */
        this.onLoad = async () => {
            const { renderOptions: { autoCapture }, onTopology, onLoad, onSnapshot, } = this.viewerProps;
            if (onLoad) {
                // 调用外部事件
                onLoad(this);
            }
            const { context } = this;
            // 计算基础信息
            if (context.mesh) {
                const topology = await (0, core_1.calcTopology)(context.mesh);
                context.topology = topology;
                if (onTopology) {
                    onTopology(topology);
                }
            }
            // 自动截图
            if (autoCapture && onSnapshot) {
                new generator_1.ObjectSnapshotGenerator(context.mesh, context.camera, context.renderer, (dataUrl) => {
                    onSnapshot(dataUrl);
                });
            }
        };
        /** 处理压缩 */
        this.handleCompress = async () => {
            const { src, compressType, onCompress } = this.viewerProps;
            const { modelFile } = this.context;
            // 仅在传入了 Zipped 文件的情况下调用
            if (modelFile && onCompress && src && compressType === 'none') {
                const compressedFile = await (0, utils_1.deflate)(modelFile);
                onCompress(compressedFile);
            }
        };
        this.getDom = getDom;
        this.getViewerState = getViewerState;
        this.onContextChange = onContextChange;
    }
    get $dom() {
        return this.getDom();
    }
    // 这里允许重新加载新的 props
    async init(props = {}) {
        if (this.context) {
            this.destroy();
        }
        this.viewerProps = (0, types_1.mergeD3ModelViewerProps)({
            currentProps: props,
            originProps: this.viewerProps,
        });
        this.context = new ThreeRendererContext_1.ThreeRendererContext(this.viewerProps);
        this.onContextChange({ hasModelFileLoaded: false });
        if (this.viewerProps.src) {
            await this.loadModel();
        }
    }
    /** 清除实体 */
    destroy() {
        try {
            cancelAnimationFrame(this.animationId);
            const context = this.context;
            if (!!context.defaultGroup && !!context.defaultGroup.children) {
                (0, each_1.default)(context.defaultGroup.children, object => {
                    if (context.defaultGroup) {
                        context.defaultGroup.remove(object);
                    }
                });
            }
            if (!!context.scene) {
                (0, each_1.default)(context.scene.children, object => {
                    if (context.scene) {
                        context.scene.remove(object);
                    }
                });
            }
            context.scene = null;
            context.defaultGroup = null;
            context.mesh = null;
            context.wireframeMesh = null;
            context.boundingBox = null;
            if (context.renderer) {
                context.renderer.dispose();
                context.renderer.forceContextLoss();
                if (this.getDom()) {
                    // 移除原有的节点
                    this.getDom().removeChild(context.renderer.domElement);
                    this.getDom().removeChild(context.controlsGizmo.domElement);
                }
            }
        }
        catch (_) {
            console.error(_);
        }
    }
    /** 这里根据传入的文件类型，进行不同的文件转化 */
    async loadModel() {
        const props = this.viewerProps;
        try {
            let mesh;
            let group;
            if (props.mesh) {
                mesh = props.mesh;
            }
            else {
                const modelFile = await (0, utils_1.getFileObjFromModelSrc)(Object.assign(Object.assign({}, props), { compressType: this.viewerProps.compressType }));
                this.context.modelFile = modelFile;
                // 判断是否有 onZip，有的话则进行压缩并且返回
                requestAnimationFrame(() => {
                    this.handleCompress();
                });
                // 判断是否可以进行预览，不可以预览则仅设置
                if (!((0, utils_1.isSupportThreejsLoader)(props.type) ||
                    (0, utils_1.isSupportOcctLoader)(props.type) ||
                    props.renderOptions.withMesh)) {
                    return;
                }
                // 进行模型实际加载，注意，不需要转化为
                ({ mesh, group } = await (0, utils_1.loadMeshWithRetry)(modelFile || props.src, props.type, {
                    toGltf: false,
                    originSrc: props.src,
                    props,
                }));
            }
            this.setupScene();
            await this.setupRenderer();
            if (mesh) {
                await this.renderMesh(mesh);
            }
            if (group) {
                this.context.scene.add(group);
                this.context.scene.updateMatrixWorld();
                const pointLight = new THREE.PointLight(0xffffff, 0.6);
                pointLight.position.set(80, 90, 150);
                this.context.scene.add(pointLight);
            }
            this.setupEquipments();
            requestAnimationFrame(async (time) => {
                this.animate(time);
                console.log('>>>ThreeRenderer>>>renderMesh>>>load successfully');
                await this.onLoad();
                this.onContextChange({ hasModelFileLoaded: true });
            });
            // 根据 props 配置当前显示的主题
            this.changeTheme(props.renderOptions.theme);
        }
        catch (e) {
            console.error('>>>WebGLViewer>>>loadModel', e);
            if (props.onError) {
                props.onError(e);
            }
        }
    }
    changeTheme(theme) {
        this.context.theme = theme;
        // 否则进行主题切换
        if (theme === 'fresh') {
            this.removePlane();
            this.removeAxisHelper();
            this.context.renderer.setClearColor(new THREE.Color('rgba(255, 255, 255)'), 1);
            this.changeModelColor('rgb(24,98,246)');
        }
        else {
            this.setupPlane();
            this.setupAxisHelper();
            const state = this.getViewerState();
            this.context.renderer.setClearColor(new THREE.Color(state.backgroundColor), 1);
            this.changeModelColor(state.modelColor);
        }
        this.onContextChange({ theme });
    }
    /** 移除着色图 */
    removeMaterialedMesh() {
        const context = this.context;
        if (context.defaultGroup) {
            context.defaultGroup.remove(this.context.mesh);
        }
        this.onContextChange({ withMaterialedMesh: false });
    }
    /** 添加着色图 */
    setupMaterialedMesh() {
        const context = this.context;
        if (context.defaultGroup) {
            context.defaultGroup.add(this.context.mesh);
            this.onContextChange({ withMaterialedMesh: true });
        }
    }
    /** 移除包围盒 */
    removeBoundingBox() {
        const context = this.context;
        if (context.defaultGroup) {
            context.defaultGroup.remove(context.boundingBox);
            context.defaultGroup.remove(context.xSprite);
            context.defaultGroup.remove(context.ySprite);
            context.defaultGroup.remove(context.zSprite);
        }
        context.boundingBox = null;
        context.xSprite = null;
        context.ySprite = null;
        context.zSprite = null;
        this.onContextChange({ withBoundingBox: false });
    }
    setupBoundingBox() {
        const context = this.context;
        if (context.mesh) {
            if (context.defaultGroup) {
                context.defaultGroup.remove(context.boundingBox);
            }
            const wireframe = new THREE.WireframeGeometry(context.mesh.geometry);
            const line = new THREE.LineSegments(wireframe);
            line.material.depthTest = false;
            line.material.opacity = 0.75;
            line.material.transparent = true;
            // reset center point
            const box = new THREE.Box3().setFromObject(line);
            box.getCenter(line.position);
            line.position.multiplyScalar(-1);
            context.boundingBox = new THREE.BoxHelper(line);
            context.defaultGroup.add(context.boundingBox);
            line.updateMatrix();
            const lineBox = line.geometry.boundingBox;
            const lineBoxMaxVertex = lineBox.max;
            const { topology } = context;
            const genSprite = (len) => {
                const s = new three_text_sprite_1.default({
                    fillStyle: 'rgb(255, 153, 0)',
                    fontSize: 2.5,
                    fontStyle: 'italic',
                    text: `${U.toFixedNumber(len, 2)} mm`,
                });
                return s;
            };
            try {
                context.xSprite = genSprite(topology.sizeX);
                context.ySprite = genSprite(topology.sizeY);
                context.zSprite = genSprite(topology.sizeZ);
                context.xSprite.position.set(0, lineBoxMaxVertex.y, lineBoxMaxVertex.z);
                context.ySprite.position.set(lineBoxMaxVertex.x, 0, lineBoxMaxVertex.z);
                context.zSprite.position.set(lineBoxMaxVertex.x, lineBoxMaxVertex.y, 0);
                context.defaultGroup.add(context.xSprite);
                context.defaultGroup.add(context.ySprite);
                context.defaultGroup.add(context.zSprite);
            }
            catch (_) {
                console.error('>>>ThreeRenderer>>>genSprite>>>error: ', _);
            }
            this.onContextChange({ withBoundingBox: true });
        }
    }
    removeWireFrame() {
        const context = this.context;
        if (context.defaultGroup) {
            context.defaultGroup.remove(context.wireframeMesh);
            context.wireframeMesh = null;
            this.onContextChange({ withWireframe: false });
        }
    }
    setupWireframe() {
        const context = this.context;
        if (context.mesh) {
            if (context.defaultGroup) {
                context.defaultGroup.remove(context.wireframeMesh);
            }
            const material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0x111111,
                shininess: 20,
                wireframe: true,
            });
            const mesh = context.mesh.clone();
            mesh.material = material;
            context.wireframeMesh = mesh;
            context.defaultGroup.add(mesh);
            this.onContextChange({ withWireframe: true });
        }
    }
    removeAxisHelper() {
        const { context } = this;
        if (context.axisHelper && context.defaultGroup) {
            context.defaultGroup.remove(context.axisHelper);
            this.onContextChange({ withAxisHelper: false });
        }
    }
    setupAxisHelper() {
        const { context } = this;
        this.removeAxisHelper();
        if (context.mesh) {
            // Get max dimention and add 50% overlap for plane
            // with a gutter of 10
            const geometry = context.mesh.geometry;
            if (geometry) {
                geometry.computeBoundingBox();
                geometry.computeBoundingSphere();
                let maxDimension = (0, max_1.default)([
                    geometry.boundingBox.max.x,
                    geometry.boundingBox.max.y,
                    geometry.boundingBox.max.z,
                ]);
                maxDimension = Math.ceil(~~(maxDimension * 1.5) / 10) * 10;
                const axisHelper = new THREE.AxesHelper(maxDimension);
                // reset center point
                axisHelper.position.x = 0;
                axisHelper.position.y = 0;
                axisHelper.position.z = 0;
                context.axisHelper = axisHelper;
                context.defaultGroup.add(context.axisHelper);
                this.onContextChange({ withAxisHelper: true });
            }
        }
    }
    removePlane() {
        if (this.context.plane && this.context.defaultGroup) {
            this.context.defaultGroup.remove(this.context.plane);
            this.context.plane = null;
            this.onContextChange({ withPlane: false });
        }
    }
    setupPlane() {
        if (this.context.mesh) {
            if (this.context.plane && this.context.defaultGroup) {
                this.context.defaultGroup.remove(this.context.plane);
            }
            // Getmax dimention and add 10% overlap for plane
            // with a gutter of 10
            const geometry = this.context.mesh.geometry;
            if (geometry) {
                geometry.computeBoundingBox();
                geometry.computeBoundingSphere();
            }
            let maxDimension = (0, max_1.default)([
                this.context.xDims,
                this.context.yDims,
                this.context.zDims,
            ]);
            maxDimension = Math.ceil(~~(maxDimension * 1.1) / 10) * 50;
            const plane = new THREE.GridHelper(maxDimension, 50);
            // reset center point
            const box = new THREE.Box3().setFromObject(plane);
            box.getCenter(plane.position);
            plane.position.multiplyScalar(-1);
            // plane.position.y = geometry.boundingSphere.center.y * -1;
            plane.position.y = this.context.yDims * -1;
            this.context.plane = plane;
            this.context.defaultGroup.add(this.context.plane);
            this.onContextChange({ withPlane: true });
        }
    }
    moveUp() {
        const { camera, topology } = this.context;
        camera.translateY(-topology.sizeY / 10);
    }
    moveDown() {
        const { camera, topology } = this.context;
        camera.translateY(topology.sizeY / 10);
    }
    moveLeft() {
        const { camera, topology } = this.context;
        camera.translateX(-topology.sizeX / 10);
    }
    moveRight() {
        const { camera, topology } = this.context;
        camera.translateX(topology.sizeX / 10);
    }
    /** 重置相机 */
    resetCamera() {
        const context = this.context;
        const viewerState = this.getViewerState();
        if (context.mesh) {
            const geometry = context.mesh.geometry;
            if (geometry) {
                geometry.computeBoundingSphere();
                const g = context.mesh.geometry.boundingSphere.radius;
                const dist = g * 3;
                // fudge factor so you can see the boundaries
                context.camera.position.set(U.get(viewerState, viewerState => viewerState.camPos.x) ||
                    this.viewerProps.renderOptions.cameraX, U.get(viewerState, viewerState => viewerState.camPos.y) ||
                    this.viewerProps.renderOptions.cameraY, U.get(viewerState, viewerState => viewerState.camPos.z) ||
                    this.viewerProps.renderOptions.cameraZ ||
                    dist * fudge);
            }
        }
    }
    /** 渲染某个 Mesh */
    async renderMesh(mesh) {
        const context = this.context;
        const viewerState = this.getViewerState();
        const geometry = mesh.geometry;
        const material = (0, core_1.cookMeshMaterial)(context.withClipping, this.getViewerState().modelColor);
        const { xDims, yDims, zDims } = (0, core_1.adjustGeometry)(geometry, material);
        context.mesh = mesh;
        context.xDims = xDims;
        context.yDims = yDims;
        context.zDims = zDims;
        if (viewerState.withMaterialedMesh) {
            context.defaultGroup.add(context.mesh);
        }
        context.scene.updateMatrixWorld();
        if (context.mesh) {
            this.setupDecorators();
        }
    }
    /** 初始化场景 */
    setupScene() {
        const scene = new THREE.Scene();
        const group = new THREE.Group();
        const { context } = this;
        context.scene = scene;
        context.defaultGroup = group;
        context.scene.add(context.defaultGroup);
    }
    /** 初始化渲染器 */
    async setupRenderer() {
        // 等待 $dom 有效，如果超时则抛出异常，最大等待 30s
        for (let i = 0; i < 30; i++) {
            await U.sleep(1000);
            if (this.$dom) {
                break;
            }
        }
        if (!this.$dom) {
            throw new Error('Invalid dom');
        }
        const height = this.$dom.clientHeight;
        const width = this.$dom.clientWidth;
        const renderer = this.getThreeJsWebGLRenderer((0, types_1.mergeD3ModelViewerProps)({
            currentProps: {
                renderOptions: {
                    backgroundColor: this.getViewerState().backgroundColor,
                },
            },
            originProps: this.viewerProps,
        }), { height, width });
        this.$dom.appendChild(renderer.domElement);
        this.context.renderer = renderer;
    }
    /** 初始化控制器 */
    setupEquipments() {
        this.setupCamera();
        const { scene } = this.context;
        if (this.context.camera && this.$dom) {
            scene.add(new THREE.PointLight(0xffffff, 0.5));
            // Ambient，散射灯光
            scene.add(new THREE.AmbientLight(0xffffff, 0.1));
            const pointLight = new THREE.PointLight(0xffffff, 0.5);
            scene.add(pointLight);
            const orbitControls = new controls_1.OrbitControls(this.context.camera, this.$dom, {
                onUpdate: (camPos) => {
                    this.context.camPos = camPos;
                    pointLight.position.copy(camPos);
                },
            });
            orbitControls.enableKeys = false;
            orbitControls.enableZoom = true;
            orbitControls.enablePan = true;
            orbitControls.addEventListener('change', this.renderScene);
            this.context.orbitControls = orbitControls;
            // Add the Obit Controls Gizmo
            this.context.controlsGizmo = new controls_1.OrbitControlsGizmo(this.context.orbitControls, {
                size: 100,
                padding: 4,
            });
            // Add the Gizmo domElement to the dom
            this.$dom.appendChild(this.context.controlsGizmo.domElement);
        }
    }
    setupCamera() {
        if (!this.$dom) {
            return;
        }
        const height = this.$dom.clientHeight;
        const width = this.$dom.clientWidth;
        const camera = new THREE.PerspectiveCamera(45, width / height, 1, 99999);
        // 判断是否有初始值
        const { mesh } = this.context;
        this.context.camera = camera;
        if (mesh) {
            this.resetCamera();
        }
    }
    setupDecorators() {
        const { withWireframe, withBoundingBox } = this.getViewerState();
        this.setupPlane();
        if (withWireframe) {
            this.setupWireframe();
        }
        if (withBoundingBox) {
            this.setupBoundingBox();
        }
        if (this.viewerProps.renderOptions.withAxisHelper) {
            this.setupAxisHelper();
        }
    }
    /** 动画 */
    animate(time) {
        this.animationId = requestAnimationFrame(time => {
            this.animate(time);
        });
        // if (this.controls) {
        //   this.controls.update(time);
        // }
        this.renderScene();
    }
}
exports.ThreeRenderer = ThreeRenderer;
//# sourceMappingURL=ThreeRenderer.js.map