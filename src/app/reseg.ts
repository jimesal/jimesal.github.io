export let ABI = {
    default: [
        {
            "inputs": [],
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bool",
                    "name": "registered",
                    "type": "bool"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "estaRegistrado",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "COMISION",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "MIN_APORT",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "nombre",
                    "type": "string"
                }
            ],
            "name": "addNuevaEntidad",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "usrName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "nombre",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "fechaNac",
                    "type": "uint256"
                }
            ],
            "name": "addNuevoUsuario",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "cargarSaldoGlobal",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "conEntidades",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "entList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "entLogin",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "wallEntidad",
                    "type": "address"
                }
            ],
            "name": "esEntidadContr",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "_esEntidadContr",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "nombre",
                    "type": "string"
                }
            ],
            "name": "esEntidadNom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "_esEntidad",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "nombre",
                    "type": "string"
                }
            ],
            "name": "getContratoEnt",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "dirContrato",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "usrName",
                    "type": "string"
                }
            ],
            "name": "getDatosUsuario",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "nameCompleto",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "fechaNac",
                    "type": "uint256"
                },
                {
                    "internalType": "string[]",
                    "name": "idRes",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "getUsrNameMsg",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "usrName",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isRegistered",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "registered",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "strUsuarios",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "nameCompleto",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "fechaNac",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "fechaUltimaRes",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "usrList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "usrLogin",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}