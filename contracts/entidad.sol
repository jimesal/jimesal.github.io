// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import './core.sol' ;
import './freeForUser.sol' ;

contract Entidad is FreeForUser{  
    
    struct Resenia {
        string autor ;
        uint fecha ;
        uint valoracion ;
        string titulo ;
        string cuerpo ;
    }

    Core coreContract ;
    address wallEntidad ;
    string marca ;
    Resenia[] resenias ;
    mapping(address => uint) resXUsr ;

    uint totalRes ;
    uint sumaVal ;

    modifier onlyEntidad(){
        require(coreContract.esEntidadContr(msg.sender), "Operacion permitida exclusivamente a la entidad propietaria del contrato") ;
        _ ;
    }

    constructor(address _wallEntidad, string memory _nombre) {
        coreContract = Core(msg.sender) ;
        marca = _nombre ;
        wallEntidad = _wallEntidad ;
    }

    receive() external payable {
    }

    fallback() external payable {
    }

    function valorar(uint _val, string memory _titulo, string memory _cuerpo) external payable devolverFee{
        string memory usrName = coreContract.getUserNameByAddress(msg.sender) ;
        require(keccak256(abi.encodePacked(usrName)) != keccak256(abi.encodePacked("")), "No es usuario registrado para valorar") ;
        require(enPlazo(msg.sender), "Ha valorado esta entidad hace menos de 6 meses") ;
        resenias.push(Resenia(usrName, block.timestamp, _val, _titulo, _cuerpo));
        resXUsr[msg.sender] = totalRes + 1 ; //No guardar en index = 0
        coreContract.incRes() ;
        totalRes++ ;
        sumaVal = sumaVal + _val ;
    }

    function recargarSaldo() external payable onlyEntidad{
    }

    function getRes(uint idRes) external view returns(string memory autor, uint fecha, uint valoracion, string memory titulo, string memory cuerpo){
        Resenia memory res =  resenias[idRes] ;
        autor = res.autor ;
        fecha = res.fecha ;
        valoracion = res.valoracion ;
        titulo = res.titulo ;
        cuerpo = res.cuerpo ;
    }

    function getMetricas() external view onlyEntidad returns(uint _totalRes, uint _sumaVal, uint _totalUltRes){
        _totalRes = totalRes ;
        _sumaVal = sumaVal ;
        _totalUltRes = getTotalUltRes() ;
    }

    function getPromedioVal() external view returns(uint _sumaVal, uint _totalRes){
        _sumaVal = sumaVal ;
        _totalRes = totalRes ;
    }

    function getResenias() external view onlyEntidad returns(Resenia[] memory resList){
        resList = resenias ;
    }

    function getTotalUltRes() private view returns(uint _totalUltRes){
        uint totalUltRes = 0 ;
        for(uint i = 0; i<resenias.length; i++){
            if(menos6Meses(resenias[i].fecha)) totalUltRes++ ;
        }
        _totalUltRes = totalUltRes ;
    }

    function enPlazo(address dirUsr) private view returns(bool _enPlazo){
        _enPlazo = true ;
        uint index = resXUsr[dirUsr] ;
        if(resenias.length > 0 && index != 0){
            uint ultima = resenias[index-1].fecha ;
            _enPlazo = !menos6Meses(ultima) ;  
        }
    }
 
    function menos6Meses(uint fecha) private view returns(bool _menos6Meses) {
        _menos6Meses = (block.timestamp - fecha) <  6 * 30 days ; 
    }

    function getContractBalance() public view returns(uint balance){
    balance = address(this).balance;
    }
}