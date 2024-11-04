import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

class GUIService {
    constructor(parameters) {
        this.gui = new GUI()
        this.gui.wireframe = this.gui.add(parameters, 'wireframe');
    }

    setOnRender(render){
        this.gui.onChange(render)
    }

    getValue(key) {
        return this.gui[ key ].getValue()
    }
}

export default GUIService
