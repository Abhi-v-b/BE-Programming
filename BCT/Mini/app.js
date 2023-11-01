const contractAddress = '0xDDE642eB1a264c52CF0FdAC6A61ebB8e6D4b022A'; // Replace with your contract address
const contractABI = []; // Add your contract's ABI here

const web3 = new Web3('0x005E40785790B08F57bb4a0bfd1741f7Fb02B933'); // Replace with your Infura project ID

const contract = new web3.eth.Contract(contractABI, contractAddress);

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display candidate list
    const candidateList = await contract.methods.getCandidateList().call();
    const candidateSelect = document.getElementById('candidateSelect');
    const voteButton = document.getElementById('voteButton');

    candidateList.forEach(candidate => {
        const option = document.createElement('option');
        option.text = candidate;
        option.value = candidate;
        candidateSelect.appendChild(option);
    });

    // Handle vote button click
    voteButton.addEventListener('click', async () => {
        const selectedCandidate = candidateSelect.value;
        if (selectedCandidate) {
            await contract.methods.vote(selectedCandidate).send({ from: '0x9A8Bd7E4D2208f07f55365cEF8E5c7Ca0908E2d8' }); // Replace with your wallet address
            alert('Vote submitted successfully!');
        }
    });

    // Display results
    const resultsList = document.getElementById('resultsList');
    candidateList.forEach(async candidate => {
        const voteCount = await contract.methods.getVotesForCandidate(candidate).call();
        const listItem = document.createElement('li');
        listItem.innerText = `${candidate}: ${voteCount} votes`;
        resultsList.appendChild(listItem);
    });
});
