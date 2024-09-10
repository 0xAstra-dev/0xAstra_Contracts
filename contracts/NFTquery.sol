// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenQuery {
    function getTokenIds(address nftCollection, address owner) external view returns (uint256[] memory) {
        assembly {
            mstore(0x80, shl(224, 0x70a08231)) 
            mstore(0x84, owner)
            let success := staticcall(gas(), nftCollection, 0x80, 0x24, 0x00, 0x20)
            let tokenBalance := mload(0x00)
            let tokenIds := mload(0x40)
            mstore(tokenIds, tokenBalance)
            let size := mul(tokenBalance, 0x20)
            mstore(0x40, add(tokenIds, add(0x20, size))) 
            mstore(0x80, shl(224, 0x2f745c59)) 
            mstore(0x84, owner)

            for { let i := 0 } lt(i, tokenBalance) { i := add(i, 1) } {
                mstore(0xa4, i)
                success := staticcall(gas(), nftCollection, 0x80, 0x64, 0x00, 0x20)
                mstore(add(add(tokenIds, 0x20), mul(i, 0x20)), mload(0x00))
            }

            return(tokenIds, add(0x20, size))
        }
    }
}
