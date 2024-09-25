## 1. Introduction

This audit focused on a suite of smart contracts designed to power a decentralized ecosystem, offering staking, rewards distribution, and NFT functionalities. These contracts support key features like token staking, liquidity provision, governance through veTokens, and rewards managed via Merkle tree proofs. Additionally, they integrate with widely-used libraries, such as those provided by OpenZeppelin, and external protocols to ensure robust functionality.

### Contracts Audited:
- **AstraChargeCardNFT.sol**
- **AstraGenesisNFT.sol**
- **AstraIntelCollect.sol**
- **AstraRewardMerkle.sol**
- **AstraRewardNativeMerkle.sol**
- **AstraRewards.sol**
- **AstraRewardsNative.sol**
- **Bribe.sol**
- **NFTquery.sol**
- **ResourceSynthesis.sol**
- **StarLpStaking.sol**
- **veSTAR.sol**
- **veSTARRewards.sol**

### Goals of the Audit:
The primary goal of this audit was to assess the security, gas efficiency, and functionality of these contracts. The audit focused on identifying potential vulnerabilities, optimizing gas consumption, and ensuring adherence to best practices. The following report provides an in-depth analysis of each contract, including critical, major, minor, and informational findings.

---

## 2. Executive Summary

This audit uncovered several issues across the contracts, categorized by severity. While the contracts generally followed industry best practices, there are some areas for improvement, particularly around reentrancy protection, gas efficiency, access control, and cryptographic security.

### Risk Breakdown:

| Contract                | Critical Issues | Major Issues | Minor Issues | Informational |
|-------------------------|-----------------|--------------|--------------|---------------|
| AstraChargeCardNFT.sol   | 0               | 0            | 1            | 1             |
| AstraGenesisNFT.sol      | 0               | 0            | 1            | 1             |
| AstraIntelCollect.sol    | 0               | 1            | 1            | 1             |
| AstraRewardMerkle.sol    | 0               | 1            | 1            | 0             |
| AstraRewardNativeMerkle  | 0               | 1            | 1            | 0             |
| AstraRewards.sol         | 0               | 1            | 1            | 1             |
| AstraRewardsNative.sol   | 0               | 1            | 1            | 0             |
| Bribe.sol                | 0               | 1            | 1            | 0             |
| NFTquery.sol             | 0               | 1            | 1            | 0             |
| ResourceSynthesis.sol    | 0               | 1            | 1            | 1             |
| StarLpStaking.sol        | 0               | 1            | 1            | 1             |
| veSTAR.sol               | 0               | 1            | 1            | 1             |
| veSTARRewards.sol        | 0               | 1            | 1            | 0             |

---

## 3. Scope of the Audit

### Audit Methodology:
- **Manual Code Review**: A thorough, line-by-line review of the code to identify logic errors, security vulnerabilities, and optimization issues.
- **Static Analysis**: Automated tools were used to detect common vulnerabilities such as reentrancy, integer overflows/underflows, and unchecked external calls.
- **Gas Profiling**: Each contract was analyzed for gas efficiency, particularly in areas that involve loops or complex computations.
- **Functional Review**: The intended functionality of critical contract functions, such as staking, reward distribution, and NFT minting, was thoroughly assessed.

---

## 4. Detailed Findings

### AstraChargeCardNFT.sol

- **Minor Issue: Lack of Event Emission**  
  The `setURI` function updates the URI without emitting an event. Adding an event for URI updates would improve transparency and allow off-chain services to track these changes more easily.

- **Informational: Access Control**  
  The contract uses OpenZeppelin’s `Ownable` to manage ownership and permissioned functions. Care should be taken when transferring ownership to ensure proper control.

---

### AstraGenesisNFT.sol

- **Minor Issue: Gas Inefficiency in Merkle Proof Handling**  
  The Merkle proof verification could become expensive as the whitelist grows. Consider optimizing or batch processing claims to reduce gas costs.

- **Informational: Missing Event Emission on Minting**  
  No events are emitted during the minting process. For better transparency, it’s recommended to emit events when new tokens are minted.

---

### AstraIntelCollect.sol

- **Major Issue: Timestamp Manipulation**  
  The contract depends on `block.timestamp` to manage collection intervals. Block timestamps can be manipulated by miners within a small range. A more robust solution should be used to prevent timing-related exploits.

- **Minor Issue: Unchecked External Calls**  
  The contract relies on external contracts (e.g., whitelisting) without verifying their return values. This could result in unforeseen vulnerabilities if external calls fail or return unexpected values.

- **Informational: Gas Optimization**  
  As user interactions grow, the gas cost for updating the `users` mapping could increase. Consider optimizing data structures to handle large-scale user bases more efficiently.

---

### AstraRewardMerkle.sol / AstraRewardNativeMerkle.sol

- **Major Issue: Reentrancy Protection**  
  Functions responsible for transferring rewards should be protected with the `nonReentrant` modifier to mitigate reentrancy risks.

- **Minor Issue: Lack of Event Emission**  
  The contract should emit events when the whitelist root is updated and when rewards are claimed to improve traceability and off-chain data collection.

---

### AstraRewards.sol / AstraRewardsNative.sol

- **Major Issue: Signature Replay Attack**  
  Signatures used to claim rewards could be reused by attackers. A nonce or timestamp-based mechanism should be introduced to ensure each signature can only be used once.

- **Minor Issue: Gas Efficiency**  
  Reward calculations could become gas-intensive when processing large numbers of stakers. Consider batch processing to reduce costs.

---

### Bribe.sol

- **Major Issue: Unchecked External Calls**  
  External calls to the `IBGT` contract for queuing and activating boosts should have their return values checked. Failing to check these could result in unexpected behavior or vulnerabilities.

- **Minor Issue: Safe Token Transfers**  
  Ensure that all token transfers use `SafeERC20` and check return values to handle failures appropriately.

---

### NFTquery.sol

- **Major Issue: Gas Inefficiency**  
  Iterating over a fixed range of 800 token IDs is inefficient, particularly for larger collections. Allow for dynamic input ranges or batch processing to reduce gas costs.

- **Minor Issue: Error Handling in `ownerOf`**  
  Using `try/catch` for the `ownerOf` function ensures error handling, but consider optimizing the process to avoid unnecessary calls to non-existent token IDs.

---

### ResourceSynthesis.sol

- **Major Issue: Access Control**  
  Critical functions, such as adding resources and adjusting synthesis costs, should be protected with access control mechanisms. Only the contract owner or authorized entities should be able to modify these settings.

- **Minor Issue: Gas Optimization**  
  Large-scale resource synthesis could lead to high gas costs. Consider optimizing the synthesis process for better scalability.

---

### StarLpStaking.sol

- **Major Issue: Reward Distribution Vulnerability**  
  Ensure that the reward distribution logic is accurate and cannot be manipulated by users to receive more than their fair share of rewards.

- **Informational: Gas Efficiency**  
  Staking and calculating rewards for a large number of users could become gas-expensive. Optimizing the reward calculation process can help reduce the overall gas usage.

---

### veSTAR.sol

- **Major Issue: Token Locking and Unlocking**  
  The locking and unlocking mechanisms must be robust to ensure that users cannot unlock tokens prematurely. Use time-based logic carefully to prevent manipulation of unlock times.

- **Informational: Event Emissions**  
  It’s good practice to emit events for critical actions such as locking and unlocking tokens, and this contract handles these events well.

---

### veSTARRewards.sol

- **Major Issue: Secure Liquidity and Staking Operations**  
  The contract interacts with the `IBeraPool` for liquidity and staking operations. Ensure these interactions are secure and that rewards are calculated accurately to avoid any potential exploits.

- **Minor Issue: Token Transfer Handling**  
  Ensure that `SafeERC20` is used consistently, and all return values from token transfers are properly checked.

---

## 5. Security Analysis

### Reentrancy Vulnerabilities
- **AstraRewardMerkle.sol** and **AstraRewardsNativeMerkle.sol** should use the `nonReentrant` modifier to protect reward distribution functions.

### Access Control
- Several contracts like **Bribe.sol** and **ResourceSynthesis.sol** should enforce stricter access control to ensure that only authorized entities can modify critical settings.

### Token and Asset Management
- ERC-20 token transfers should always use `SafeERC20`, and the return values of `transferFrom` and `transfer` must be checked to prevent transfer failures from being ignored.

### Cross-contract Interactions
- Contracts such as **Bribe.sol** and **StarLpStaking.sol** interact with external contracts. These interactions must be carefully audited to ensure safe and secure integration.

### Cryptographic Functions
- **AstraRewards.sol** and **AstraRewardsNative.sol** must implement mechanisms to prevent replay attacks when using cryptographic signatures.

### Gas Efficiency
- Several contracts, including **NFTquery.sol**, **ResourceSynthesis.sol**, and **StarLpStaking.sol**, could benefit from gas optimization by implementing batch processes and reducing unnecessary iterations.

---

## 6. Conclusion

The contracts reviewed are generally well-written and adhere to standard best practices, but there are several areas where improvements are necessary. By addressing the identified issues—particularly around reentrancy protection, gas efficiency, and access control—the contracts can become more robust and secure.

### Recommendations:
- Implement nonce systems to prevent signature replay attacks.
- Apply `nonReentrant` modifiers to all functions dealing with token transfers and reward distribution.
- Optimize gas usage by adopting batch processing and improving iteration logic.
- Ensure critical functions are well-protected through strict access control.
- Use `SafeERC20` consistently and check return values for all token transfers.

---

**Audit conducked by 0xChainDuck**