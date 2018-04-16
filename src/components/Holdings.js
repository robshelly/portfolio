import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react'
import withAuth from './withAuth';
import AuthService from './AuthService';
import request from 'superagent'
import HoldingsDetails from './HoldingsDetails'
import HoldingsSummary from './HoldingsSummary'

class Holdings extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      cash: 0,
      holdings: [],
      totalPurchase: 0.00,
      grossValue: 0.00,
      totalSellCost: 0.00,
      grossProfitLoss: 0.00,
      chargeLowerBracket: 25000,
      chargeLowerBracketPercentage: 0.01,
      chargeHigherBracketPercentage: 0.005,
      chargeMin: 25,
      chargeFee: 1.25
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
        share.purchaseCost = share.purchasePrice * share.qty
        share.value = share.qty * holding.currentPrice
        share.sellCost = this.calculateSellCost(share.value)
        share.gainLoss = share.value - share.purchaseCost - share.sellCost
        share.percentageGainLoss = ((share.gainLoss / share.purchaseCost) * 100)
      });
    });
    this.setState({holding: holdings})
  }

  calculateTotals() {
    var holdings = this.state.holdings

    var grossValue = this.state.grossValue
    var totalSellCost = this.state.totalSellCost
    var grossProfitLoss  = this.state.grossProfitLoss
    var totalPurchase = this.state.totalPurchase

    holdings.forEach((holding) => {
      holding.totalQty = 0
      holding.totalCost = 0
      holding.totalValue = 0
      holding.cumulativeGainLoss = 0
      holding.totalSellCost = 0

      // Company totals
      holding.shares.forEach((share) => {
        holding.totalQty += share.qty
        holding.totalCost += share.purchaseCost
        holding.totalValue += share.value
        holding.cumulativeGainLoss += share.gainLoss
        holding.totalSellCost += share.sellCost

        // Overall Totals
        grossValue += share.value
        totalSellCost += share.sellCost
        grossProfitLoss += share.gainLoss
        totalPurchase += share.purchaseCost
      });
    });
    totalPurchase += this.state.cash // Seems wrong but in specs
    grossValue += this.state.cash
    
    this.setState({
      holding: holdings,
      totalPurchase: totalPurchase,
      grossValue: grossValue,
      totalSellCost: totalSellCost,
      grossProfitLoss: grossProfitLoss
    })
  }

  calculateSellCost(value) {
    // Transaction cost charged at certain percentage up to lower bracket
    // Balance above bracket charged at different percentage
    var cost =  (value <= this.state.chargeLowerBracket) ? 
      (this.state.chargeLowerBracketPercentage * value) :
      (this.state.chargeLowerBracketPercentage * this.state.chargeLowerBracket)
        + (this.state.chargeHigherBracketPercentage * (value - this.state.chargeLowerBracket))
    
    // There is also a minimum cost plus a fee
    return (cost <= this.state.chargeMin) ?
      this.state.chargeMin + this.state.chargeFee :
      cost + this.state.chargeFee
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
        // After holdinfs are retrieved, calculate all calculable data
        this.calculateShareData()
        this.calculateTotals()
      })
      .catch((err) => {
        console.log("Error", err)
      });

  }

  render() {
    return (
    <Segment basic>
      <Grid centered>
        <Grid.Row>
          <HoldingsSummary 
            totalPurchase = {this.state.totalPurchase}
            grossValue = {this.state.grossValue}
            totalSellCost = {this.state.totalSellCost}
            grossProfitLoss = {this.state.grossProfitLoss}
            />
        </Grid.Row>
        <Grid.Row>
          <HoldingsDetails
            cash = {this.state.cash}
            holdings = {this.state.holdings}/>
        </Grid.Row>
      </Grid>
    </Segment>
    )
  }
}

export default withAuth(Holdings);