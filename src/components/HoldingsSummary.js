import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react'

class Summary extends Component {
  render() {
    var positiveNegativeIndicator = (this.props.grossProfitLoss < 0 ? "negative" : "positive");
    const tableContents = (this.props.grossValue) ? 
    (
      <Table.Row>
        <Table.Cell>{this.props.totalPurchase.toFixed(2)}</Table.Cell>
        <Table.Cell>{this.props.grossValue.toFixed(2)}</Table.Cell>
        <Table.Cell>{this.props.totalSellCost.toFixed(2)}</Table.Cell>
        <Table.Cell>{this.props.grossValue-this.props.totalSellCost.toFixed(2)}</Table.Cell>
        <Table.Cell className={positiveNegativeIndicator}>{this.props.grossProfitLoss.toFixed(2)}</Table.Cell>
      </Table.Row>
    ) :
    (
      <Table.Row>
        <Table.Cell colSpan='5' textAlign='center'>
          <Icon name='hourglass half'/>
        </Table.Cell>
      </Table.Row>)
    return (
      <Table textAlign='right' collapsing color= 'blue' celled >  
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Total Purchase Price</Table.HeaderCell>
            <Table.HeaderCell>Gross Value</Table.HeaderCell>
            <Table.HeaderCell>Total Sell Cost</Table.HeaderCell>
            <Table.HeaderCell>Gross Value after Sell Cost</Table.HeaderCell>
            <Table.HeaderCell>Gross Profit/Loss</Table.HeaderCell>
          </Table.Row>
          {tableContents}
        </Table.Header>
      </Table>
    )
  }
}

export default Summary;