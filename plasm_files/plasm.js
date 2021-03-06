
/*!
 * plasm.js
 * JavaScript Programming Language for Solid Modeling
 * Copyright (c) 2011 cvd-lab <cvdlab@email.com> (https://github.com/cvd-lab/)
 * MIT License
 */

 !(function (exports) {

  var toString = {}.toString;
  var max = Math.max;
  var min = Math.min;
  var abs = Math.abs;

  /**
   * Library namespace.
   */

  var plasm = exports.plasm = {};

  /**
   * Library version.
   */

  plasm.version = '0.0.7';

  /*
   * @intro Create the plasm viewer.
   * @param {Element} container
   * @param {Element} inspector
   * @api public
   */

  var Plasm = exports.Plasm =
  plasm.Viewer = function (container, inspector) {
    if (!(this instanceof plasm.Viewer)) {
      return new plasm.Viewer(container);
    }
    // if (!Detector.webgl) {
    //   Detector.addGetWebGLMessage();
    // }
    if (typeof container === 'string') {
      container = document.getElementById(container);
    }
    if (typeof inspector === 'string') {
      inspector = document.getElementById(inspector);
    }

    var scene = this.scene = new plasm.Scene();

    var camera = this.camera = new plasm.Camera();
    scene.add(camera);

    var controls = this.controls = new plasm.Controls(camera, scene);

    var light = this.light = new THREE.AmbientLight(0xeeeeee);
    scene.root.add(light);

    var axes = this.axes();
    axes.draw();

    var engine = Detector.webgl ? THREE.WebGLRenderer : THREE.CanvasRenderer;
    var renderer = this.renderer = new engine({ antialias: true });
    renderer.setClearColorHex(0xefefef, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.container = container;
    this.container.appendChild(this.renderer.domElement);

    if (inspector) {
      var stats = this.stats = new Stats();
      inspector.appendChild(stats.domElement);
    }

    function animate () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene.root, camera.optics);
      if (inspector) stats.update();
    }

    function resize () {
      camera.optics.aspect = window.innerWidth / window.innerHeight;
      camera.optics.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', resize, false);

    console.log('Plasm.js');

    animate();
  };

  /**
   * Create a scene.
   *
   * @return {plasm.Scene} scene
   * @api public
   */

  plasm.Scene = function () {
    this.root = new THREE.Scene();
  };

  /**
   * Add object to the scene.
   *
   * @param {plasm.Model}
   * @return {plasm.Scene} for chaining
   * @api public
   */

  plasm.Scene.prototype.add = function (object) {
    if (object instanceof plasm.Camera) {
      this.root.add(object.optics);
      return this;
    }
    if (object instanceof plasm.Model) {
      this.root.add(object.mesh);
      return this;
    }
    return this;
  };

  /**
   * Remove object from the scene.
   *
   * @param {plasm.Model}
   * @return {plasm.Scene} for chaining
   * @api public
   */

  plasm.Scene.prototype.remove = function (object) {
    if (object instanceof plasm.Camera) {
      this.root.remove(object.optics);
      return this;
    }
    if (object instanceof plasm.Model) {
      this.root.remove(object.mesh);
      return this;
    }
    return this;
  };

  /**
   * Return scene bounding sphere's radius.
   *
   * @return {Number} boundingRadius
   * @api public
   */

  plasm.Scene.prototype.getBoundingRadius = function () {
    var radius = 0;
    var geometry;
    var position;
    var maxPos;

    THREE.SceneUtils.traverseHierarchy(this.root, function (obj) {
      if (obj instanceof THREE.Object3D 
          && obj.geometry 
          && obj.geometry.vertices.length) {
        
        geometry = obj.geometry;
        geometry.computeBoundingSphere();
        position = obj.position;
        maxPos = max(abs(position.x), abs(position.y), abs(position.z));
        radius = max(radius, geometry.boundingSphere.radius + maxPos);
      }
    });

    return radius;
  };

  /**
   * Return centroid of the scene.
   *
   * @return {THREE.Vector3} centroid
   * @api public
   */

  plasm.Scene.prototype.getCentroid = function () {
    var centroid = new THREE.Vector3()
    var geometry;
    var position;
    var bbox;
    var p = { 
        max: new THREE.Vector3()
      , min: new THREE.Vector3() 
    };
    
    THREE.SceneUtils.traverseHierarchy(this.root, function (obj) {
      if (obj instanceof THREE.Object3D 
          && obj.geometry 
          && obj.geometry.vertices.length) {

        geometry = obj.geometry;
        geometry.computeBoundingBox();
        bbox = geometry.boundingBox;
        p.max.x = max(p.max.x, bbox.max.x);
        p.max.y = max(p.max.y, bbox.max.y);
        p.max.z = max(p.max.z, bbox.max.z);
        p.min.x = min(p.min.x, bbox.min.x);
        p.min.y = min(p.min.y, bbox.min.y);
        p.min.z = min(p.min.z, bbox.min.z);
      }
    });

    return centroid.add(p.max, p.min).divideScalar(2);
  };

  /**
   * Create a camera.
   *
   * @param {Object} options options
   * @param {Number} [options.fov = 60] field of view
   * @param {Number} [options.aspect = 1] aspect
   * @param {Number} [options.near = 1] near
   * @param {Number} [options.far = 10000] far
   * @return {plasm.Camera} camera
   * @api public
   */

  plasm.Camera = function (options) {
    if (!(this instanceof plasm.Camera)) {
      return new plasm.Camera(options);
    }

    var options = options || {};
    var fovy = options.fovy || 60;
    var aspect = options.aspect || window.innerWidth / window.innerHeight;
    var near = options.near || 0.1;
    var far = options.far || 10000;
    var optics;
    var controls;

    optics = new THREE.PerspectiveCamera(fovy, aspect, near, far);
    optics.fovy = fovy;
    optics.aspect = aspect;
    optics.near = near;
    optics.far = far;
    optics.position.x = 5;
    optics.position.y = 5;
    optics.position.z = 5;

    this.optics = optics;
  };

  /**
   * Create camera controls.
   *
   * @param {plasm.Camera} camera camera to control
   * @param {Object} options options
   * @param {Number} [options.rotateSpeed = 5.0] rotate speed
   * @param {Number} [options.panSpeed = 0.8] pan speed
   * @param {Boolean} [options.noZoom = false] no zoom flag
   * @param {Boolean} [options.noPan = false] no pan flag
   * @param {Boolean} [options.staticMoving = true] static moving flag
   * @param {Number} [options.dynamicDampingFactor = 0.3] dynamic damping factor
   * @param {Array} [options.keys = [65, 83, 68]] control keys
   * @return {plasm.Controls} controls
   * @api public
   */

  plasm.Controls = function (camera, scene, options) {
    if (!(this instanceof plasm.Controls)) {
      return new plasm.Controls(camera, scene, options);
    }

    var options = options || {};
    var controls;

    controls = new THREE.EnhancedTrackballLightControls(camera.optics, scene);
    controls.rotateSpeed = options.rotateSpeed || 5.0;
    controls.zoomSpeed = options.zoomSpeed || 1.2;
    controls.panSpeed = options.panSpeed || 0.8;
    controls.noZoom = options.noZoom || false;
    controls.noPan = options.noPan || false;
    controls.dynamicDampingFactor = options.dynamicDampingFactor || 0.1;

    this.controls = controls;
  };

  /**
   * Update.
   *
   * @return {plasm.Controls} for chaining
   * @api public
   */

  plasm.Controls.prototype.update = function () {
    this.controls.update();
    return this;
  };

  /**
   * Materials
   */

  plasm.materials = {};

  plasm.materials.PointMaterial = function () {
    return new THREE.ParticleBasicMaterial({ 
        color: 0xD7D7D7
      , size: 0.075 
    });
  };

  plasm.materials.LineMaterial = function () {
    return new THREE.LineBasicMaterial({
        color: 0xC6D7C6
      , opacity: 0.8
      , linewidth: 1
    });
  };

  plasm.materials.MeshMaterial = function () {
    return new THREE.MeshLambertMaterial({
        color: 0xD7D7D7
      , wireframe: !Detector.webgl
      , shading: THREE.FlatShading
      , vertexColors: THREE.FaceColors
    });
  };

  /**
   * Create the model of the given simplicial complex 
   * and add it to the scene of the given viewer.
   *
   * @param {simplexn.SimplicialComplex} complex
   * @param {plasm.Viewer} viewer
   * @return {plasm.Model} model
   * @api public
   */

  plasm.Model = function (complex, viewer) {
    if (!(this instanceof plasm.Model)) {
      return new plasm.Model(complex, viewer);
    }

    var complex = complex || new simplexn.SimplicialComplex();
    var pointset = complex.pointset;
    var topology = complex.topology;
    var dim = topology.dim;
    var cells, n_cells, i_cell;
    var v1, v2, v3; 

    var geometry = new THREE.Geometry();
    var material;
    var mesh;

    if (dim <= 0) {
      cells = topology.cells0d();
      n_cells = cells.length;

      for (i_cell = 0; i_cell < n_cells; i_cell += 1) {
        v1 = pointset.get(cells[i_cell]);
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v1[0] || 0, v1[1] || 0, v1[2] || 0)
        ));
      }

      material = new plasm.materials.PointMaterial();
      mesh = new THREE.ParticleSystem(geometry, material);
    }

    if (dim === 1) {
      cells = topology.complexes[1];
      n_cells = cells.length;

      for (i_cell = 0; i_cell < n_cells; i_cell += 2) {
        v1 = pointset.get(cells[i_cell + 0]);
        v2 = pointset.get(cells[i_cell + 1]);
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v1[0], v1[1], v1[2])
        ));
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v2[0], v2[1], v2[2])
        ));
      }

      material = new plasm.materials.LineMaterial();
      mesh = new THREE.Line(geometry, material, THREE.LinePieces);
    }

    if (dim >= 2) {
      cells = topology.complexes[2];
      n_cells = cells.length;

      pointset.forEach(function (v) {
        geometry.vertices.push(new THREE.Vertex(
          new THREE.Vector3(v[0] || 0, v[1] || 0, v[2] || 0)
        ));
      });
    
      for (i_cell = 0; i_cell < n_cells; i_cell += 3) {
        geometry.faces.push(new THREE.Face3(
          cells[i_cell + 0], cells[i_cell + 1], cells[i_cell + 2]
        ));
      }

      geometry.computeCentroids();
      geometry.mergeVertices();
      geometry.computeFaceNormals();

      material = new plasm.materials.MeshMaterial();
      mesh = new THREE.Mesh(geometry, material);
    }

    this.complex = complex;
    this.geometry = geometry;
    this.geometry.dynamic = true;
    this.material = material;
    this.mesh = mesh;
    this.mesh.matrixAutoUpdate = true;
    this.mesh.doubleSided = true;
    this.viewer = viewer;
    // this.node = node;
  };

  /**
   * Clone
   * 
   * @return {plasm.Clone} clone
   * @api public
   */

  plasm.Model.prototype.clone = function () {
    var model =  new plasm.Model(this.complex.clone(), this.viewer);
    var color = this.material.color;
    model.material.color.setRGB(color.r, color.g, color.b);

    return model;
  };

  /**
   * Draw.
   *
   * @return {plasm.Mode} for chaining
   * @api public
   */

  plasm.Model.prototype.draw = function () {
    if (this.mesh.parent !== this.viewer.scene) {
      this.viewer.scene.add(this);
    }

    return this;
  };

  /**
   * Remove this model from the scene.
   *
   * @api public
   */

  plasm.Model.prototype.erase = function () {
    this.viewer.scene.remove(this);
    this.complex = null;
    this.geometry = null;
    this.mesh = null;
  };

  /**
   * Show.
   *
   * @return {plasm.Mode} for chaining
   * @api public
   */

  plasm.Model.prototype.show = function () {
    this.mesh.visible = true;

    return this;
  };

  /**
   * Hide.
   *
   * @return {plasm.Mode} for chaining
   * @api public
   */

  plasm.Model.prototype.hide = function () {
    this.mesh.visible = false;
    
    return this;
  };

  /**
   * Cancel `this` object from graph of the scene.
   *
   * @return {plasm.Model} for chaining
   * @api public
   */

  plasm.Model.prototype.cancel = function () {
    this.mesh.parent.remove(this.mesh);
    return this;
  };

  /**
   * Translate.
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {plasm.Model} this for chaining
   * @api public
   */

  plasm.Model.prototype.translate = function (dims, values) {
    var v = [];
    this.complex.translate(dims, values);

    if (this.complex.rn <= 3) {
      dims.forEach(function (dim, i) {
        v[dim] = values[i];
      });
      this.mesh.position.addSelf({ x: v[0] || 0, y: v[1] || 0, z: v[2] || 0 });
      this.geometry.__dirtyVertices = true;
    }

    return this;
  };

  /**
   * Rotate.
   * 
   * @param {Number} axis
   * @param {Number} angle
   * @return {plasm.Model} this for chaining
   * @api public
   */

  plasm.Model.prototype.rotate = function (axis, angle) {
    var v = [];
    var dims;

    dims = [0,1,2].splice(axis, 1);
    this.complex.rotate(dims, angle[0]);
    v[axis] = angle;

    if (this.complex.rn <= 3) {
      this.mesh.rotation.addSelf({x: v[0] || 0, y: v[1] || 0, z: v[2] || 0 });
      this.geometry.__dirtyVertices = true;
    }

    return this;
  };

  /**
   * Scale.
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {plasm.Model} this for chaining
   * @api public
   */

  plasm.Model.prototype.scale = function (dims, values) {
    var v = [];
    this.complex.scale(dims, values);

    if (this.complex.rn <= 3) {
      dims.forEach(function (dim, i) {
        v[dim] = values[i];
      });
      this.mesh.scale.multiplySelf({ x: v[0] || 1, y: v[1] || 1, z: v[2] || 1 });
      this.geometry.__dirtyVertices = true;
    }

    return this;
  };

  /**
   * Map.
   * 
   * @param {Function} mapping
   * @return {plasm.Model} a new mapped model
   * @api public
   */

  plasm.Model.prototype.map = function (mapping, merge) {
    var complex = this.complex.clone().map(mapping, merge);
    var model = new plasm.Model(complex, this.viewer);

    return model;
  };

  /**
   * Color.
   *
   * @param {Array} rgb rgb
   * @param {Number} [rgb[0] = 0] r
   * @param {Number} [rgb[1] = 0] g
   * @param {Number} [rgb[2] = 0] b
   * @return {plasm.Object} for chaining
   * @api public
   */

  plasm.Model.prototype.color = function (rgb) {
    this.mesh.material.color.setRGB(rgb[0] || 0, rgb[1] || 0, rgb[2] || 0);

     return this;
  };

  /**
   * boundary
   * 
   * @return {plasm.Model} boundary
   * @api public
   */

  plasm.Model.prototype.boundary = function () {
    var complex = this.complex.clone().boundary();
    var boundary = new plasm.Model(complex, this.viewer);
    return boundary;
  };

  /**
   * skeleton
   * 
   * @param {Number} dim
   * @return {plasm.Model} skeleton
   * @api public
   */

  plasm.Model.prototype.skeleton = function (dim) {
    var complex = this.complex.clone().skeleton(dim);
    var skeleton = new plasm.Model(complex, this.viewer);
    return skeleton;
  };

  /**
   * extrude
   * 
   * @param {Array|Float32Array} hlist which must be made by positive numbers 
   *   or by an alternation of positive and negative numbers
   * @return {plasm.Model} extrusion
   * @api private
   */

  plasm.Model.prototype.extrude = function (hlist) {
    var complex = this.complex.clone().extrude(hlist);
    var extrusion = new plasm.Model(complex, this.viewer);
    return extrusion;
  };

  /**
   * explode
   *
   * @param {Array|Float32Array} values
   * @return {plasm.Model} explosion
   * @api public
   */

  plasm.Model.prototype.explode = function (values) {
    var complex = this.complex.clone().explode(values);
    var explosion = new plasm.Model(complex, this.viewer);
    return explosion;
  };

  /**
   * Struct
   *
   * @param {items} complex
   * @param {plasm.Viewer} viewer
   * @return {plasm.Struct} struct
   * @api public
   */

  plasm.Struct = function (items) {
    if (!(this instanceof plasm.Struct)) {
      return new plasm.Struct(items);
    }
    
    var items = items || [];
    var structs = [];
    var models = [];
    var model;

    items.forEach(function (item) {
      model = item.clone();
      if (model instanceof plasm.Model) {
        models.push(model);
      } else if (model instanceof plasm.Struct) {
        structs.push(model);
      }
    });

    this.structs = structs;
    this.models = models;
  };

  /**
   * Clone
   * 
   * @return {plasm.Struct} clone
   * @api public
   */

  plasm.Struct.prototype.clone = function () {
    var cloned = new plasm.Struct();
    var models = [];
    var structs = [];

    this.models.forEach(function (model) {
      models.push(model.clone());
    });

    this.structs.forEach(function (struct) {
      structs.push(struct.clone());
    });

    cloned.models = models;
    cloned.structs = structs;

    return cloned;
  };

  /**
   * Draw.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.draw = function () {
    this.models.forEach(function (model) {
      model.draw();
    });

    this.structs.forEach(function (struct) {
      struct.draw();
    });

    return this;
  };

  /**
   * Cancel.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.cancel = function () {
    this.models.forEach(function (model) {
      model.cancel();
    });

    this.structs.forEach(function (struct) {
      struct.cancel();
    });

    return this;
  };

  /**
   * Remove this model from the scene.
   *
   * @api public
   */

  plasm.Struct.prototype.erase = function () {
    this.viewer.scene.remove(this);
    this.structs = null;
    this.models = null;
  };

  /**
   * Show.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.show = function () {
    this.models.forEach(function (model) {
      model.show();
    });

    this.structs.forEach(function (struct) {
      struct.show();
    });

    return this;
  };

  /**
   * Hide.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.hide = function () {
    this.models.forEach(function (model) {
      model.hide();
    });

    this.structs.forEach(function (struct) {
      struct.hide();
    });

    return this;
  };

  /**
   * Add `item` to this plasm.Struct.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.add = function (item) {
    if (this === item) return this;
    var model = item.clone();
    if (model instanceof plasm.Model) {
      this.models.push(model);
    } else if (model instanceof Struct) {
      this.structs.push(model.complex);
    }

    return this;
  };

  /**
   * Remove `item` from this model.
   *
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.remove = function (item) {
    if (this === item) return this;
    var index;
    var array;

    if (item instanceof plasm.Model) {
      array = this.models;
    } else if (item instanceof Struct) {
      array = this.structs;
    }
    index = array.indexOf(item);
    if (index > 0) {
      array.splice(index, 1);
      item.remove();
    }
    return this;
  };

  /**
   * Translate.
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {plasm.Struct} this for chaining
   * @api public
   */

  plasm.Struct.prototype.translate = function (dims, values) {
    this.models.forEach(function (model) {
      model.translate(dims, values);
    });

    this.structs.forEach(function (struct) {
      struct.translate(dims, values);
    });

    return this;
  };

  /**
   * Rotate.
   * 
   * @param {Number} axis
   * @param {Number} angle
   * @return {plasm.Struct} this for chaining
   * @api public
   */

  plasm.Struct.prototype.rotate = function (axis, angle) {
    this.models.forEach(function (model) {
      model.rotate(axis, angle);
    });

    this.structs.forEach(function (struct) {
      struct.rotate(axis, angle);
    });

    return this;
  };

  /**
   * Scale.
   * 
   * @param {Array|Uint32Array} dims
   * @param {Array|Float32Array} values
   * @return {plasm.Struct} this for chaining
   * @api public
   */

  plasm.Struct.prototype.scale = function (dims, values) {
    this.models.forEach(function (model) {
      model.scale(dims, values);
    });

    this.structs.forEach(function (struct) {
      struct.scale(dims, values);
    });

    return this;
  };

  /**
   * Color.
   *
   * @param {Array} rgb rgb
   * @param {Number} [rgb[0] = 0] r
   * @param {Number} [rgb[1] = 0] g
   * @param {Number} [rgb[2] = 0] b
   * @return {plasm.Struct} for chaining
   * @api public
   */

  plasm.Struct.prototype.color = function (rgb) {
    this.models.forEach(function (model) {
      model.color(rgb);
    });

    this.structs.forEach(function (struct) {
      struct.color(rgb);
    });

    return this;
  };

  /**
   * SimplicialComplex
   * 
   * @param {Array|Float32Array} points
   * @param {Array|Uint32Array} complexes
   * @return {plasm.Model} simplicial complex
   * @api public
   */
  
  plasm.Viewer.prototype.simplicialComplex = function (points, complex) {
    var complex = new simplexn.SimplicialComplex(points, complex);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * simplex
   * 
   * @param {number} d
   * @return {plasm.Model} a simplex
   * @api public
   */

  plasm.Viewer.prototype.simplex = function (d) {
    var complex = new simplexn.geometries.simplex(d);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * polyline
   * 
   * @param {Array} points
   * @return {simplexn.SimplicialComplex} a polyline
   * @api public
   */

  plasm.Viewer.prototype.polyline = function (points) {
    var complex = simplexn.geometries.polyline(points);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * axes
   * 
   * @param {dim} points
   * @faces {Array|Uint32Array} complexes
   * @api public
   */
  
  plasm.Viewer.prototype.axes = function () {
    var axeX = new simplexn.SimplicialComplex([[0,0,0],[1,0,0]],[[0,1]]);
    var axeY = new simplexn.SimplicialComplex([[0,0,0],[0,1,0]],[[0,1]]);
    var axeZ = new simplexn.SimplicialComplex([[0,0,0],[0,0,1]],[[0,1]]);
    var modelX = (new plasm.Model(axeX, this)).color([1,0,0]);
    var modelY = (new plasm.Model(axeY, this)).color([0,1,0]);
    var modelZ = (new plasm.Model(axeZ, this)).color([0,0,1]);
    var axes = new plasm.Struct([modelX,modelY,modelZ]);

    return axes;
  };

  /**
   * simplexGrid
   * 
   * @param {Array} quotesList is a list of hlist made by positive numbers 
   * or made by an alternation of positive and negative numbers
   * @return {plasm.Model} a grid of simplexes
   * @api public
   */

  plasm.Viewer.prototype.simplexGrid = function (quotesList) {
    var complex = new simplexn.geometries.simplexGrid(quotesList);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * cuboid
   * 
   * @param {Array} sides
   * @return {plasm.Model} a cuboidal simplicial complex
   * @api public
   */

  plasm.Viewer.prototype.cuboid = function (sides) {
    var complex = new simplexn.geometries.cuboid(sides);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * intervals
   *
   * @param {Array} values
   * @return {plasm.Model} intervals
   * @api public
   */

  plasm.Viewer.prototype.intervals = function (tip, n) {
    var complex = new simplexn.geometries.intervals(tip, n);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * domain
   *
   * @param {Array} ends
   * @param {Array} ns
   * @return {plasm.Model} domain
   * @api public
   */

  plasm.Viewer.prototype.domain = function (tips, ns) {
    var domain = new simplexn.geometries.domain(tips, ns);
    var model = new plasm.Model(domain, this);
    return model;
  };

  /**
   * cube
   * 
   * @param {Number} dim
   * @return {plasm.Model} a dim-dimendional cube
   * @api public
   */

  plasm.Viewer.prototype.cube = function (d) {
    var complex = new simplexn.geometries.cube(d);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * circle
   * 
   * @param {Number} [radius=1]
   * @param {Number} [n=32] 
   * @return {plasm.Model} a circle
   * @api public
   */

  plasm.Viewer.prototype.circle = function (radius, n) {
    var complex = new simplexn.geometries.circle(radius, n);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * disk
   * 
   * @param {Number} [radius=1]
   * @param {Number} [n=32]
   * @param {Number} [m=1] 
   * @return {plasm.Model} a disk
   * @api public
   */

  plasm.Viewer.prototype.disk = function (radius, n, m) {
    var complex = new simplexn.geometries.disk(radius, n, m);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * cylinderSurface
   * Produces a cylindrical surface of radius r and heigth h.
   * 
   * @param {Number} [r=1]
   * @param {Number} [h=1]
   * @param {Number} [n=16]
   * @param {Number} [m=2] 
   * @return {plasm.Model} a cylindrical surface
   * @api public
   */
   
  plasm.Viewer.prototype.cylinderSurface = function (r, h, n, m) {
    var complex = new simplexn.geometries.cylinderSurface(r, h, n, m);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * torusSurface
   *
   * produces a toroidal surface of radiuses r,R 
   * approximated with n x m x 2 triangles
   *
   * @param {Number} [r_min=1] r_min
   * @param {Number} [r_max=3] r_max
   * @param {Number} [n=12] n
   * @param {Number} [m=8] m
   * @return {plasm.Model} a torus surface
   */

  plasm.Viewer.prototype.torusSurface = function (r_min, r_max, n, m) {
    var complex = new simplexn.geometries.torusSurface(r_min, r_max, n, m);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * torusSolid
   *
   * produces a toroidal surface of radiuses r,R 
   * approximated with n x m x 2 triangles
   *
   * @param {Number} [r=1] r_min
   * @param {Number} [R=3] r_max
   * @param {Number} [n=12] n
   * @param {Number} [m=8] m
   * @param {Number} [p=8] p
   * @return {plasm.Model} a torus solid
   */

  plasm.Viewer.prototype.torusSolid = function (r_min, r_max, n, m, p) {
    var r_min = r_min || 1;
    var r_max = r_max || 3;
    var n = n || 12;
    var m = m || 8;
    var p = p || 8;
    var complex = new simplexn.geometries.torusSolid(r_min, r_max, n, m, p);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * triangleStrip
   * 
   * @param {Array} points
   * @return {plasm.Model} triangle strip
   * @api public
   */

  plasm.Viewer.prototype.triangleStrip = function (points) {
    var complex = new simplexn.geometries.triangleStrip(points);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * triangleFan
   * 
   * @param {Array} points
   * @return {plasm.Model} triangle strip
   * @api public
   */

  plasm.Viewer.prototype.triangleFan = function (points) {
    var complex = new simplexn.geometries.triangleFan(points);
    var model = new plasm.Model(complex, this);
    return model;
  };

  /**
   * helix
   * 
   * @param {Number} [r=1] r
   * @param {Number} [pitch=1] pitch
   * @param {Number} [n=24] n
   * @param {Number} [turns=1] turns
   * @return {plasm.Model} helix
   * @api public   
   */

  plasm.Viewer.prototype.helix = function (r, pitch, n, turns) {
    var complex = new simplexn.geometries.helix(r, pitch, n, turns);
    var model = new plasm.Model(complex, this);
    return model;
  };

}(this));