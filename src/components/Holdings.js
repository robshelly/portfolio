import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Moment from 'react-moment';

import withAuth from './withAuth';
import AuthService from './AuthService';

import request from 'superagent'

class TableHeaders extends Component {
  render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Holding</Table.HeaderCell>
          <Table.HeaderCell>Purchased</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Total Qty</Table.HeaderCell>
          <Table.HeaderCell>Purchase Price</Table.HeaderCell>
          <Table.HeaderCell>Purchase Cost</Table.HeaderCell>
          <Table.HeaderCell>Current Share Price</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Gain/Loss</Table.HeaderCell>
          <Table.HeaderCell>Cumulative Gain/Loss</Table.HeaderCell>
          <Table.HeaderCell>%</Table.HeaderCell>
          <Table.HeaderCell>Sell Cost</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }
}

class Share extends Component {
  render() {
    var positiveNegativeIndicator = (this.props.share.gainLoss < 0 ? "negative" : "positive");
    var purchasePrice = this.props.share.purchasePrice.toFixed(2)
    return (
      <Table.Row>
        <Table.Cell><Moment format="DD/MM/YYYY" unix>{this.props.share.date}</Moment></Table.Cell>
        <Table.Cell>{this.props.share.qty}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{purchasePrice}</Table.Cell>
        <Table.Cell>{this.props.share.purchaseCost}</Table.Cell>
        <Table.Cell>{this.props.share.value}</Table.Cell>
        <Table.Cell className={positiveNegativeIndicator}>{this.props.share.gainLoss}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell className={positiveNegativeIndicator}>{this.props.share.percentageGainLoss}</Table.Cell>
        <Table.Cell>{this.props.share.sellCost}</Table.Cell>
      </Table.Row>
    )
  }
}

class CompanyCommonFields extends Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell verticalAlign='top' rowSpan={this.props.numShares+2}>{this.props.company.nameShort}</Table.Cell>
        {/* Render some blank space in one cell to force equal row heights */}
        <Table.Cell><span>&nbsp;&nbsp;</span></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell verticalAlign='top'rowSpan={this.props.numShares+2}>{this.props.company.currentPrice}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    )
  }
}

class CompanyTotals extends Component {
  render() {
    var positiveNegativeIndicator = (this.props.company.cumulativeGainLoss < 0 ? "negative" : "positive");
    return (
      <Table.Row>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{this.props.company.totalQty}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell className={positiveNegativeIndicator}>{this.props.company.cumulativeGainLoss}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    )
  }
}

class Company extends Component {
  render() {
    var numShares = this.props.company.shares.length
    var shares = this.props.company.shares.map((share) => {
      return <Share key={share._id} share={share} numShares={numShares} />
    })
    return (
      <Table.Body>
        <CompanyCommonFields numShares={numShares} company={this.props.company} />
        {shares}
        <CompanyTotals company={this.props.company}/>
        {/* Blank row to provide space between companies */}
        <Table.Row>
          <Table.Cell colSpan='12'>
            <span>&nbsp;&nbsp;</span>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    )
  }
}


class HoldingsDashboard extends Component {
  render() {
    var companies = this.props.holdings.map((company) => {
      return <Company key={company._id} company={company} />
    })
    return (
      <div>
      <Table color= 'blue' celled >
        <TableHeaders />
        {companies}
      </Table>
      </div>
    )
  }
}

class Holdings extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      cash: 0,
      holdings: []
    }
  }

  componentDidMount() {
    this.fetchHoldings();
  }

  calculateShareData() {
    var holdings = this.state.holdings

    // Iterate over holdings
    holdings.forEach((holding) => {
      // Iterate over share
      holding.shares.forEach((share) => {
        share.purchaseCost = share.purchasePrice * share.qty.toFixed(2)
        share.value = share.qty * holding.currentPrice.toFixed(2)
        share.sellCost = this.calculateSellCost(holding.nameShort, share.date, share.value).toFixed(2)
        share.gainLoss = share.value - share.purchaseCost - share.sellCost
        share.percentageGainLoss = ((share.gainLoss / share.purchaseCost) * 100).toFixed(0)
      });
    });
    this.setState({holding: holdings})
  }

  calculareCompanyTotals() {
    var holdings = this.state.holdings
    holdings.forEach((holding) => {
      holding.totalQty = 0
      holding.cumulativeGainLoss = 0
      holding.grossValue = 0
      holding.shares.forEach((share) => {
        holding.totalQty += share.qty
        holding.cumulativeGainLoss += share.gainLoss
        holding.grossValue += share.value
      
      });
    });
    this.setState({holding: holdings})
  }

  calculateSellCost(name, date, value) {
    if (value <= 25000) return 1.25 + (0.01 * value)
    else return 1.25 + (0.01 * 25000) + (0.005 * (value - 25000))
  } 


  fetchHoldings() {
    request
      .post('http://localhost:5000/api/holdings')
      .set('Content-Type', 'application/json')
      .send({
        token: localStorage.id_token,
        id: this.props.user.id,
      })
      .then((res) => {
        var response = JSON.parse(res.text)
        this.setState({
          cash: response.cash,
          holdings: response.holdings
        })
      })
      .then(() => {
        console.log("do some client side calculations")
        this.calculateShareData()
        this.calculareCompanyTotals()
      })
      .catch((err) => {
        console.log("Error", err)
      });

  }

  render() {
    return (
    <div>
      <HoldingsDashboard holdings={this.state.holdings}/>
    </div>
    )
  }
}

export default withAuth(Holdings);