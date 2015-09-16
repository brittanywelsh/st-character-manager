function BinManager(oConfig) {
    "use strict";

    this.name = oConfig.name;
    this.displayType = oConfig.displayType || 'number';
    this.path = oConfig.path || oConfig.name;
    this.dependencies = oConfig.dependencies || null;
    this.defaultBin = oConfig.defaultBin || {
        display: "",
        contributors: {}
    };
    this.computationData = oConfig.computationData || ???;//keyword
    this.responsibleFor = oConfig.responsibleFor;
}