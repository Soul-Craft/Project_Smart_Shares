import React from 'react';
import { ref, onValue, push, remove } from 'firebase/database';
import { Contract, Wallet } from 'ethers';
import { db } from '../fire';
import ShareContract from '../sol/Share.json'
import getProvider from '../util/getProvider'

class Shareholders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      title: '',
      email: '',
      sharecount: '',
      investor: false,
      board: false,
      sharePercentage: '',
      shareholders: [],
      totalShares: 0,
      provider: null,
      address: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // One listener for the component's lifetime: Firebase calls it again after every push and remove.
  listenToShareholders() {
    const shareholdersRef = ref(db, 'shareholders');
    return onValue(shareholdersRef, (snapshot) => {
      let shareholders = snapshot.val();
      let newState = [];
      let totalShares = 0;

      for (let shareholder in shareholders) {
        let sharholderShares = Number.parseInt(shareholders[shareholder].sharecount, 10);
        totalShares += sharholderShares;
      }
      this.setState({
        totalShares: totalShares
      });

      for (let shareholder in shareholders) {
        let sharholderShares = Number.parseInt(shareholders[shareholder].sharecount, 10);
        newState.push({
          id: shareholder,
          firstname: shareholders[shareholder].firstname,
          lastname: shareholders[shareholder].lastname,
          title: shareholders[shareholder].title,
          email: shareholders[shareholder].email,
          sharecount: shareholders[shareholder].sharecount,
          investor: (shareholders[shareholder].investor == 'on') ? 'YES' : '',
          board: (shareholders[shareholder].board == 'on') ? 'YES' : '',
          sharePercentage: ((sharholderShares / totalShares) * 100).toFixed(2)
        });
      }
      newState.sort((a, b) => Number(b.sharecount) - Number(a.sharecount));
      this.setState({
        shareholders: newState
      });
    });
  }

  componentDidMount() {
    this.stopListening = this.listenToShareholders();

    getProvider
    .then(provider => {
      this.setState({
        provider: provider
      })
    })
    .catch(() => {
      console.log('Error finding an Ethereum provider.')
    })
  }

  componentWillUnmount() {
    this.stopListening();
  }

  async addNewSharesContract(toAccount, amount) {
    const provider = this.state.provider;
    // truffle migrate records the deployment under the node's network id (net_version), not its chain id.
    const networkId = await provider.send('net_version', []);
    const signer = await provider.getSigner();
    const shareContractInstance = new Contract(ShareContract.networks[networkId].address, ShareContract.abi, signer);

    // Create shares for the newly created account, from the first account the node or wallet holds.
    const tx = await shareContractInstance.create(toAccount, amount, {
      gasLimit: 447678,
      gasPrice: 100000000000
    });
    await tx.wait();
    const result = await shareContractInstance.getBalance(toAccount);
    alert("Address " + toAccount + " received " + result + " new shares");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var account = Wallet.createRandom();
    this.addNewSharesContract(account.address, this.state.sharecount);

    const shareholdersRef = ref(db, 'shareholders');
    const shareholder = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      title: this.state.title,
      email: this.state.email,
      sharecount: this.state.sharecount,
      investor: this.state.investor,
      board: this.state.board,
      account: account.address
    }
    push(shareholdersRef, shareholder);
    this.setState({
      firstname: '',
      lastname: '',
      title: '',
      email: '',
      sharecount: '',
      investor: false,
      board: false,
      account: ''
    });
  }

  removeItem(shareholderId) {
    const shareholderRef = ref(db, `/shareholders/${shareholderId}`);
    remove(shareholderRef);
  }

  render () {
    return (
      <div>
        <div className="col-xs-1 col-md-1">
        </div>
        <div className="col-xs-10 col-md-10">
          <div className='app'>
            <header>
              <div className='wrapper'>
                <h1>Shareholders</h1>
              </div>
              <div>
                Total Shares: {this.state.totalShares}
              </div>
              <div>
                Total Shareholders: {this.state.shareholders.length}
              </div>
            </header>
            <h3>Add a New Shareholder</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" name="firstname" placeholder="What's your firstname?" onChange={this.handleChange} value={this.state.firstname} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" name="lastname" placeholder="What's your lastname?" onChange={this.handleChange} value={this.state.lastname} />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" placeholder="What's your title?" onChange={this.handleChange} value={this.state.title} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" placeholder="What's your email?" onChange={this.handleChange} value={this.state.email} />
              </div>
              <div className="form-group">
                <label>Number of Shares Owned</label>
                <input type="number" className="form-control" name="sharecount" placeholder="How many shares do you own?" onChange={this.handleChange} value={this.state.sharecount} />
              </div>
              <div className="form-group">
                <input type="checkbox" name="investor" checked={this.state.investor} onChange={this.handleChange} /> Investor
              </div>
              <div className="form-group">
                <input type="checkbox" name="board" checked={this.state.board} onChange={this.handleChange} /> Board Member
              </div>
              <button className="btn btn-primary">Add Shareholder</button>
            </form>
            <div className="wrapper">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Email</th>
                    <th>Number of Shares</th>
                    <th>Percentage Owned</th>
                    <th>Investor</th>
                    <th>Board</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.shareholders.map((shareholder) => {
                      return (
                        <tr key={shareholder.id}>
                          <td>{shareholder.firstname} {shareholder.lastname}</td>
                          <td>{shareholder.title}</td>
                          <td>{shareholder.email}</td>
                          <td>{shareholder.sharecount}</td>
                          <td>{shareholder.sharePercentage}%</td>
                          <td>{shareholder.investor}</td>
                          <td>{shareholder.board}</td>
                          <td><button className="btn btn-danger" onClick={() => this.removeItem(shareholder.id)}>Remove</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xs-1 col-md-1">
        </div>
      </div>
    );
  }
}

export default Shareholders;
