// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import './entidad.sol' ;
import './freeForUser.sol' ;

contract Core is FreeForUser{ 
    
    struct Usuario {
        string usrName ;
        string nameCompleto;
        uint fechaNac;
    }

    mapping(address => string) usrLogin ;
    mapping(address => string) entLogin ;
    mapping(address => Usuario) strUsuarios ;
    mapping(string => address) conEntidades ;
    string[] entList ;
    address admin ;
    uint totalUsr ;
    uint totalRes ;
  
    uint immutable MIN_APORT_ADMIN = 50000000000000000 ;
    uint immutable MIN_APORT_ENT = 10000000000000000 ;
    uint immutable COMISION = 500000000 ;

    modifier onlyAdmin(){
        require(msg.sender == admin, "Solo puede recargar el saldo global el admin del sistema") ;
        _ ;
    }
    
    constructor() payable{
        require(msg.value >= MIN_APORT_ADMIN, "Aportacion no suficiente. La aportacion inicial minima es de 0,05 ETH") ;
        admin = msg.sender ;
    }

    function existeUsr(address wallet) internal view returns (bool existe){
        return keccak256(abi.encodePacked(usrLogin[wallet])) != keccak256(abi.encodePacked("")) ;
    }

    function existeEnt(address wallet) internal view returns (bool existe){
        return keccak256(abi.encodePacked(entLogin[wallet])) != keccak256(abi.encodePacked("")) ;
    }

    function addNuevoUsuario(string memory usrName, string memory nombre, uint fechaNac) external payable devolverFee{
        require(!existeUsr(msg.sender), "Ya existe un usuario asociado a esta direccion") ;
        require(strUsuarios[msg.sender].fechaNac == 0, "Ya existe dicho nombre de usuario") ;
        usrLogin[msg.sender] = usrName ;
        strUsuarios[msg.sender].usrName = usrName ;
        strUsuarios[msg.sender].nameCompleto = nombre ;
        strUsuarios[msg.sender].fechaNac = fechaNac ;
    }
    
    function addNuevaEntidad(string memory nombre) external payable{
        require(!existeEnt(msg.sender), "Ya existe una entidad asociada a esta direccion") ;
        require(conEntidades[nombre] == address(0), "Ya existe una entidad registrada con el nombre dado") ;
        require(msg.value >= MIN_APORT_ENT, "Aportacion no suficiente. La aportacion minima es de 0,01 ETH") ;
        entLogin[msg.sender] = nombre ;
        address direccion = address(new Entidad(nombre));
        conEntidades[nombre] = direccion ;
        entList.push(nombre);
        uint saldo = msg.value - COMISION ;
        payable(direccion).transfer(saldo) ;
    }
    
    function getDatosUsuario() external view returns(string memory usrName, string memory nameCompleto, uint fechaNac){
		Usuario memory usr =  strUsuarios[msg.sender] ;
        usrName = usr.usrName ;
        nameCompleto = usr.nameCompleto ;
        fechaNac = usr.fechaNac ; 
    }

    function cargarSaldoGlobal() external payable onlyAdmin{
    }

    function getEntidades() external view returns(string[] memory entidades){
        entidades = entList  ;
    }

    function getMetricasSistema() external view onlyAdmin returns(uint totalUsuarios, uint totalEntidades, uint _totalRes){
		totalUsuarios = totalUsr ;
		totalEntidades = entList.length ;
        _totalRes = totalRes ;
    }

    function isRegistered() external view  returns(bool registered, string memory tipo){
        registered = true ;
        if(existeUsr(msg.sender))
            tipo = "usuario" ;
        else if(existeEnt(msg.sender))
            tipo = "entidad" ;
        else if(msg.sender == admin)
            tipo = "admin" ;
        else
            registered = false ;
    }

    function getUserNameByAddress(address sender) external view returns(string memory usrName){
        usrName = usrLogin[sender] ;
    }

    
    function getContratoEntAddress() public view returns(address dirContrato, string memory _marca){
        _marca = entLogin[msg.sender] ;
        dirContrato = getContratoEnt(_marca) ;
    }

    function getContratoEnt(string memory nombre) public view returns(address dirContrato){
        dirContrato = conEntidades[nombre] ;
    }

    function esEntidadContr(address wallet) external view returns(bool _esEntidadContr){
        _esEntidadContr = conEntidades[entLogin[wallet]] == msg.sender ;
    }

    function incRes() external{
        totalRes++ ;
    }


    function getContractBalance() public view onlyAdmin returns(uint balance){
        balance = address(this).balance;
    }
    
}