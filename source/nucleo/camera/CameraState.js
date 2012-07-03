/*-------------------------------------------------------------------------
    This file is part of Voxelent's Nucleo

    Nucleo is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation version 3.

    Nucleo is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Nucleo.  If not, see <http://www.gnu.org/licenses/>.
---------------------------------------------------------------------------*/  
/**
 * Creates a vxlCameraState object and associates it with a vxlCamera. 
 * 
 * This association is unique. each camera has one vxlCameraState object. The vxlCameraState object allows to save/retrive 
 * camera states for the camera it is associated with during the construction.
 * 
 * 
 * @class 
 * @constructor this is the constructor doc
 * @param {vxlCamera} camera
 * @author Diego Cantor
 * @see vxlCamera
  */

function vxlCameraState(camera) {
	if(!( camera instanceof vxlCamera)) {
		alert('vxlCameraState needs a vxlCamera as argument');
		return null;
	}

	this.c             = camera;
	this.position      = vec3.createFrom(0, 0, 1);
	this.focus    	   = vec3.createFrom(0, 0, 0);
	
    this.up            = vec3.createFrom(0, 1, 0);
	this.right         = vec3.createFrom(1, 0, 0);
    
	this.distance      = 0;
	this.azimuth       = 0;
	this.elevation     = 0;
    
	this.xTr           = 0;
	this.yTr           = 0;
};

/**
 * Resets current camera to the standard location an orientation. This is,
 * the camera is looking at the center of the scene, located at [0,0,1] along the z axis and
 * aligned with the y axis.
 * 
 */
vxlCameraState.prototype.reset = function() {
	var c = this.c;
	c.focus            = vec3.createFrom(0, 0, 0);
	c.up               = vec3.createFrom(0, 1, 0);
	c.right            = vec3.createFrom(1, 0, 0);
	c.distance         = 0;
	c.elevation        = 0;
	c.azimuth          = 0;
	c.setPosition(0, 0, 1);
};

/**
 * Saves the current state of the camera that this vxlCameraState object is associated with.
 */

vxlCameraState.prototype.save = function() {
	var c = this.c;
	this.distance = c.distance;
	this.azimuth = c.azimuth;
	this.elevation = c.elevation;
	vec3.set(c.position, this.position);
	vec3.set(c.focus, this.focus);
	vec3.set(c.up, this.up);
	vec3.set(c.right, this.right);
};

/**
 * Updates the camera with the state stored in vxlCameraState.
 */
vxlCameraState.prototype.retrieve = function() {
	var c = this.c;
	c.azimuth = this.azimuth;
	c.elevation = this.elevation;

	vec3.set(this.focus, c.focus);
	vec3.set(this.up, c.up);
	vec3.set(this.right, c.right);

	c.setPosition(this.position);
};
