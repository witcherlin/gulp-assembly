function extend(subClass, superClass) {
    for (var p in superClass) {
        if (superClass.hasOwnProperty(p)) {
            subClass[p] = superClass[p];
        }
    }

    function __() {
        this.constructor = subClass;
    }

    subClass.prototype = superClass === null ? Object.create(superClass) : (__.prototype = superClass.prototype, new __());
}

module.exports = extend;
