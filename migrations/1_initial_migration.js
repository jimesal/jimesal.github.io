const Core = artifacts.require("Core") ;
//const Entidad = artifacts.require("Entidad") ;

module.exports = (deployer) => {
    // Create contract with 1 ether (contract must be payable)
    deployer.deploy(Core, { value: "100000000000000000" });
};