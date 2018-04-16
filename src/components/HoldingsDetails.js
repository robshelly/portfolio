import React, { Component } from 'react';
import { Icon, Table, Label } from 'semantic-ui-react';
import Moment from 'react-moment';

class TableHeaders extends Component {
  render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Holding</Table.HeaderCell>
          <Table.HeaderCell>Purchased</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Purchase Price</Table.HeaderCell>
          <Table.HeaderCell>Purchase Cost</Table.HeaderCell>
          <Table.HeaderCell>Current Share Price</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Gain/Loss</Table.HeaderCell>
          <Table.HeaderCell>%</Table.HeaderCell>
          <Table.HeaderCell>Sell Cost</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }
}

class CompanyCommonFields extends Component {
  render() {
    var currentPrice = this.props.company.currentPrice.toFixed(2)
    return (
      <Table.Row>
        <Table.Cell textAlign='left' verticalAlign='top' rowSpan={this.props.numShares+1}>
        {/* <Table.Cell textAlign='left'> */}
          <Label color='blue' ribbon>{this.props.company.nameShort}</Label>
        </Table.Cell>
        {/* Render some blank space in one cell to force equal row heights */}
        <Table.Cell><span>&nbsp;&nbsp;</span></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell verticalAlign='top'rowSpan={this.props.numShares+1} warning>{currentPrice}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    )
  }
}

class Cash extends Component {
  render() {
    var cash = this.props.cash.toFixed(2)
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell textAlign='left' verticalAlign='top' rowSpan={2}>
            <Label color='blue' ribbon>Cash</Label>
          </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>{cash}</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>{cash}</Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell colSpan='12'>
            <span>&nbsp;&nbsp;</span>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    )
  }
}

class Share extends Component {
  render() {
    var positiveNegativeIndicator = (this.props.share.gainLoss < 0 ? "negative" : "positive");
    // Calculable data meay not be completed yet!
    var purchaseCost = (this.props.share.purchaseCost) ? 
      this.props.share.purchaseCost.toFixed(2) :
      <Icon name='hourglass half'/>
      var value = (this.props.share.value) ? 
      this.props.share.value.toFixed(2) :
      <Icon name='hourglass half'/>
    var gainLoss = (this.props.share.gainLoss) ? 
      this.props.share.gainLoss.toFixed(2) :
      <Icon name='hourglass half'/>
    var percentageGainLoss = (this.props.share.percentageGainLoss) ? 
      this.props.share.percentageGainLoss.toFixed(0) :
      <Icon name='hourglass half'/>
    var sellCost = (this.props.share.sellCost) ? 
      this.props.share.sellCost.toFixed(2) :
      <Icon name='hourglass half'/>
    return (
      <Table.Row>
        <Table.Cell><Moment format="DD/MM/YYYY" unix>{this.props.share.date}</Moment></Table.Cell>
        <Table.Cell>{this.props.share.qty}</Table.Cell>
        <Table.Cell>{this.props.share.purchasePrice.toFixed(2)}</Table.Cell>
        <Table.Cell>{purchaseCost}</Table.Cell>
        <Table.Cell>{value}</Table.Cell>
        <Table.Cell className={positiveNegativeIndicator}>{gainLoss}</Table.Cell>
        <Table.Cell className={positiveNegativeIndicator}>{percentageGainLoss}%</Table.Cell>
        <Table.Cell>{sellCost}</Table.Cell>
      </Table.Row>
    )
  }
}

class CompanyTotals extends Component {
  render() {
    var positiveNegativeIndicator = (this.props.company.cumulativeGainLoss < 0 ? "negative" : "positive");
    var totalCost = (this.props.company.totalCost) ? 
      this.props.company.totalCost.toFixed(2) :
      <Icon name='hourglass half'/>
    var totalValue = (this.props.company.totalValue) ? 
      this.props.company.totalValue.toFixed(2) :
      <Icon name='hourglass half'/>
    var cumulativeGainLoss = (this.props.company.cumulativeGainLoss) ? 
      this.props.company.cumulativeGainLoss.toFixed(2) :
      <Icon name='hourglass half'/>
    var totalSellCost = (this.props.company.totalSellCost) ? 
      this.props.company.totalSellCost.toFixed(2) :
      <Icon name='hourglass half'/>
    return (
      <Table.Row active>
        <Table.Cell>Totals</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{this.props.company.totalQty}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{totalCost}</Table.Cell>
        <Table.Cell>{this.props.company.currentPrice.toFixed(2)}</Table.Cell>
        <Table.Cell>{totalValue}</Table.Cell>
        <Table.Cell className={positiveNegativeIndicator}>{cumulativeGainLoss}</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>{totalSellCost}</Table.Cell>
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


class HoldingsDisplay extends Component {
  render() {
    var companies = this.props.holdings.map((company) => {
      return <Company key={company._id} company={company} />
    })
    return (
      <Table textAlign='right' collapsing color= 'blue' celled >
        <TableHeaders />
        <Cash cash={this.props.cash} />
        {companies}
      </Table>
    )
  }
}

export default HoldingsDisplay;