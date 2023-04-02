// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract FreeForUser{
    uint immutable MARGEN = 10700 ; //Valor simbólico porque fluctúa

        modifier devolverFee(){
        uint startGas = gasleft() ;
        _ ;
        uint gasUsed = startGas - gasleft() ;
        uint devolver = (gasUsed + 21000)* tx.gasprice + MARGEN ;
        payable(msg.sender).transfer(devolver);
    }

}
