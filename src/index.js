import React from "react";
import ReactDOM from "react-dom";
import CsvParse from "./csvParse";
import moment from "moment";
import "./index.css";
import Logo from "./Logo.jpg";

class TransactionAnalysis extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
      error: null,
      netAmt: null,
      tCount: null,
      accountId: {
        value: ""
      },
      from: {
        value: ""
      },
      to: {
        value: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handle change for the form elements
  handleChange = ({ target }) => {
    this.setState({ [target.name]: { value: target.value } });
  };

  //handle CSV file data
  handleData = data => {
    this.setState({ data });
  };

  handleError = error => {
    this.setState({ error });
  };

  //handle form submit action and parse all form inputs
  handleSubmit(event) {
    var transaction = JSON.stringify(this.state.data);
    var myObject = JSON.parse(transaction);
    const tempStartDate = moment(this.state.from.value, "DD-MM-YYYY HH:mm:ss");
    const tempEndDate = moment(this.state.to.value, "DD-MM-YYYY HH:mm:ss");
    var netAmt = 0;
    var tCount = 0;
    var rCount = 0;
    if (tempEndDate.isBefore(tempStartDate)) {
      alert("To Date Should Be After From Date");
      return;
    }
    myObject.map((my_item, data_id) => {
      ({ netAmt, tCount, rCount } = this.evalTrans(
        my_item,
        tempStartDate,
        tempEndDate,
        netAmt,
        tCount,
        rCount
      ));
      return netAmt;
    });
    if (tCount === 0 && rCount === 0) {
      alert("AccountID Not Found");
    }

    this.setState({ netAmt: netAmt, tCount: tCount });
    event.preventDefault();
  }

  // evaluate the transaction of the account with form inputs
  evalTrans(my_item, tempStartDate, tempEndDate, netAmt, tCount, rCount) {
    if (my_item.fromAccountid === this.state.accountId.value) {
      if (my_item.transactionType === "PAYMENT") {
        var myTime = moment(my_item.createAt, "DD/MM/YYYY HH:mm:ss");
        if (myTime.isAfter(tempStartDate)) {
          if (myTime.isBefore(tempEndDate)) {
            netAmt = netAmt - my_item.amount;
            tCount = tCount + 1;
          } else {
            rCount = rCount + 1;
          }
        }
      }
    }
    return { netAmt, tCount, rCount };
  }

  render() {
    const keys = [
      "transactionid",
      "fromAccountid",
      "toAccountid",
      "createAt",
      "amount",
      "transactionType",
      "relatedTransaction"
    ];

    return (
      <div className="container">
        <div className="header">
          <img src={Logo} alt="" />
          <h1>Transaction Analysis</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="analysis-form">
          <ul className="form-list">
            <li>
              {" "}
              <CsvParse
                keys={keys}
                onDataUploaded={this.handleData}
                onError={this.handleError}
                render={onChange => <input type="file" onChange={onChange} />}
              />
            </li>
            <li>
              <label>AccountId</label>{" "}
              <input
                type="text"
                name="accountId"
                value={this.state.accountId.value}
                onChange={this.handleChange.bind(this)}
              />
            </li>
            <li>
              <label>From:</label>
              <input
                type="text"
                name="from"
                value={this.state.from.value}
                onChange={this.handleChange.bind(this)}
              />
            </li>
            <li>
              <label>To:</label>{" "}
              <input
                type="text"
                name="to"
                value={this.state.to.value}
                onChange={this.handleChange.bind(this)}
              />
            </li>
            <li>
              {" "}
              <input type="submit" value="Submit" />
            </li>
          </ul>
        </form>

        <div className="analysis-output">
          <div>
            <span>
              Relative balance for the period is:<h4>{this.state.netAmt}</h4>
            </span>
          </div>
          <div>
            <span>
              Number of transactions included is:<h4>{this.state.tCount}</h4>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <TransactionAnalysis />,
  document.querySelector("#root") || document.createElement("div")
);
